import cv2
import numpy as np
from PIL import Image
import os
import subprocess

def clean_frame_rgba(frame, target_w=320):
    # Resize keeping aspect ratio
    h, w = frame.shape[:2]
    target_h = int(h * (target_w / w))
    resized = cv2.resize(frame, (target_w, target_h), interpolation=cv2.INTER_AREA)
    
    hsv = cv2.cvtColor(resized, cv2.COLOR_BGR2HSV)
    
    # Chroma green detection
    # Vibrant chroma green in Google Flow is H ~ 50-75, S > 120, V > 80
    lower_green = np.array([42, 120, 80])
    upper_green = np.array([78, 255, 255])
    green_mask = cv2.inRange(hsv, lower_green, upper_green)
    
    # Erode mask slightly to clean any edge spill
    kernel = np.ones((2, 2), np.uint8)
    green_mask = cv2.dilate(green_mask, kernel, iterations=1)
    
    # Alpha channel: 0 where green, 255 where mascot
    alpha = np.where(green_mask > 0, 0, 255).astype(np.uint8)
    
    # Desaturate green spill on border pixels
    # Where alpha is 255, if pixel still has high green ratio (G > 1.3*R and G > 1.3*B)
    b, g, r = cv2.split(resized)
    spill = (g > 1.35 * r) & (g > 1.35 * b) & (alpha == 255)
    # Neutralize spill
    g[spill] = ((r[spill].astype(np.int32) + b[spill].astype(np.int32)) // 2).astype(np.uint8)
    
    rgba = cv2.merge([r, g, b, alpha])
    return rgba

def process_all_videos():
    downloads_dir = r"C:\Users\Mohammad Maaz\.gemini\antigravity\brain\cbba2371-3661-4604-a6ff-b056b755075c\browser_sandbox\downloads"
    
    clips = [
        ("Blobby Blue", os.path.join(downloads_dir, "Blue_blob_mascot_waving_hello_450eae46.mp4"), 48), # ~2.0s
        ("Minty Pop", os.path.join(downloads_dir, "Mascot_holding_gift_box_86d65cf7.mp4"), 48),
        ("Pip Pink", os.path.join(downloads_dir, "Pink_bunny_mascot_leaping_65b985e7.mp4"), 48),
        ("Sunny Cloud", os.path.join(downloads_dir, "Yellow_cloud_mascot_animating_44bf2567.mp4"), 48),
        ("Tower Finale", os.path.join(downloads_dir, "Mascots_stacking_into_vertical_t__226c302f.mp4"), 60), # ~2.5s
    ]
    
    frames_dir = "scratch/transparent_frames"
    os.makedirs(frames_dir, exist_ok=True)
    
    all_rgba_frames = []
    global_idx = 0
    
    for label, path, max_frames in clips:
        if not os.path.exists(path):
            print(f"Skipping {label}: {path} not found")
            continue
            
        print(f"Extracting & cleaning {label} ({path})...")
        cap = cv2.VideoCapture(path)
        frame_idx = 0
        
        while cap.isOpened() and frame_idx < max_frames:
            ret, frame = cap.read()
            if not ret:
                break
            
            # Step every 2 frames for compact 12fps GIF or smooth 24fps
            if frame_idx % 2 == 0:
                rgba = clean_frame_rgba(frame, target_w=280)
                all_rgba_frames.append(rgba)
                
                # Save frame image
                frame_out = f"{frames_dir}/frame_{global_idx:04d}.png"
                Image.fromarray(rgba).save(frame_out)
                global_idx += 1
                
            frame_idx += 1
            
        cap.release()
        
    print(f"Total cleaned transparent frames: {len(all_rgba_frames)}")
    
    # 1. Generate transparent WebM using ffmpeg from transparent PNG sequence
    output_webm = "public/mascots/navbar-mascots-flow.webm"
    print(f"Encoding {output_webm} with libvpx-vp9 yuva420p...")
    cmd_webm = [
        'ffmpeg', '-y', '-framerate', '12',
        '-i', f'{frames_dir}/frame_%04d.png',
        '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p',
        '-auto-alt-ref', '0',
        output_webm
    ]
    subprocess.run(cmd_webm, check=True)
    print("WebM encoding complete!")
    
    # 2. Generate transparent GIF using PIL
    output_gif = "public/mascots/navbar-mascots-flow.gif"
    print(f"Generating {output_gif} with PIL palette transparency...")
    
    pil_frames = []
    for rgba in all_rgba_frames:
        img = Image.fromarray(rgba, 'RGBA')
        
        # Split channels
        r, g, b, a = img.split()
        
        # Convert RGB to 255 colors (saving 1 for transparent)
        rgb_img = Image.merge('RGB', (r, g, b))
        paletted = rgb_img.convert('P', palette=Image.ADAPTIVE, colors=255)
        
        # Transparent pixels get index 255
        mask = Image.eval(a, lambda x: 255 if x < 128 else 0)
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
            disposal=2 # Clear frame to background before next frame
        )
        print("GIF generation complete!")

if __name__ == '__main__':
    process_all_videos()
