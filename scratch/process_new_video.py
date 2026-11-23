import cv2
import numpy as np
from PIL import Image
import os
import subprocess

def process_video():
    video_path = r"C:\Users\Mohammad Maaz\.gemini\antigravity\brain\cbba2371-3661-4604-a6ff-b056b755075c\browser_sandbox\downloads\Smiley_animation_on_green_screen_ceebf1bf.mp4"
    if not os.path.exists(video_path):
        print(f"Error: {video_path} not found")
        return

    cap = cv2.VideoCapture(video_path)
    count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    print(f"Opening {video_path}: {count} frames, {fps} fps")

    temp_frames_dir = "scratch/new_clean_frames"
    os.makedirs(temp_frames_dir, exist_ok=True)

    target_w = 360
    rgba_frames = []
    frame_idx = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Crop to mascot area
        cropped = frame[70:710, 330:1190]
        h, w = cropped.shape[:2]
        target_h = int(h * (target_w / w))
        resized = cv2.resize(cropped, (target_w, target_h), interpolation=cv2.INTER_AREA)

        # HSV green detection
        hsv = cv2.cvtColor(resized, cv2.COLOR_BGR2HSV)
        lower_green = np.array([45, 70, 80])
        upper_green = np.array([82, 255, 255])
        raw_green = cv2.inRange(hsv, lower_green, upper_green)

        # Connected components from outer borders only (so mascot body interiors are NEVER removed)
        rh, rw = raw_green.shape
        num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(raw_green, connectivity=8)

        border_labels = set([
            labels[0, 0], labels[0, rw-1], labels[rh-1, 0], labels[rh-1, rw-1],
            labels[0, rw//2], labels[rh-1, rw//2], labels[rh//2, 0], labels[rh//2, rw-1]
        ])

        bg_mask = np.isin(labels, list(border_labels))

        # Alpha channel: 0 for background, 255 for mascots
        alpha = np.where(bg_mask, 0, 255).astype(np.uint8)

        # Erode alpha slightly to remove green fringe along boundaries
        kernel = np.ones((2, 2), np.uint8)
        alpha = cv2.erode(alpha, kernel, iterations=1)

        # Anti-aliasing blur along the edge
        alpha = cv2.GaussianBlur(alpha, (3, 3), 0)

        # Desaturate green spill on border pixels
        b, g, r = cv2.split(resized)
        spill = (g > 1.3 * r) & (g > 1.3 * b) & (alpha > 30)
        g[spill] = ((r[spill].astype(np.int32) + b[spill].astype(np.int32)) // 2).astype(np.uint8)

        rgba = cv2.merge([r, g, b, alpha])
        rgba_frames.append(rgba)

        out_frame_path = f"{temp_frames_dir}/frame_{frame_idx:04d}.png"
        Image.fromarray(rgba).save(out_frame_path)

        frame_idx += 1

    cap.release()
    print(f"Processed {len(rgba_frames)} frames.")

    # 1. Generate transparent WebM
    output_webm = "public/mascots/navbar-mascots-flow.webm"
    print(f"Encoding {output_webm} with libvpx-vp9 yuva420p...")
    cmd_webm = [
        'ffmpeg', '-y', '-framerate', str(int(fps)),
        '-i', f'{temp_frames_dir}/frame_%04d.png',
        '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p',
        '-auto-alt-ref', '0',
        output_webm
    ]
    subprocess.run(cmd_webm, check=True)
    print("WebM encoding complete!")

    # 2. Generate transparent GIF
    output_gif = "public/mascots/navbar-mascots-flow.gif"
    print(f"Generating {output_gif} with PIL palette transparency...")

    pil_frames = []
    # Step every 2 frames for a lightweight smooth ~12fps looping GIF
    for i in range(0, len(rgba_frames), 2):
        rgba = rgba_frames[i]
        img = Image.fromarray(rgba, 'RGBA')
        r, g, b, a = img.split()

        rgb_img = Image.merge('RGB', (r, g, b))
        paletted = rgb_img.convert('P', palette=Image.ADAPTIVE, colors=255)

        mask = Image.eval(a, lambda x: 255 if x < 120 else 0)
        paletted.paste(255, mask)
        paletted.info['transparency'] = 255

        pil_frames.append(paletted)

    if pil_frames:
        pil_frames[0].save(
            output_gif,
            save_all=True,
            append_images=pil_frames[1:],
            duration=83, # ~12 fps
            loop=0,
            transparency=255,
            disposal=2
        )
        print("GIF generation complete!")

if __name__ == '__main__':
    process_video()
