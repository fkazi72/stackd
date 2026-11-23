import cv2
import numpy as np
import subprocess
import os

def process_and_combine_all():
    downloads_dir = r"C:\Users\Mohammad Maaz\.gemini\antigravity\brain\cbba2371-3661-4604-a6ff-b056b755075c\browser_sandbox\downloads"
    
    clips = [
        ("Scene 1: Blobby Blue Wave", os.path.join(downloads_dir, "Blue_blob_mascot_waving_hello_450eae46.mp4")),
        ("Scene 2: Minty Pop Gift Box", os.path.join(downloads_dir, "Mascot_holding_gift_box_86d65cf7.mp4")),
        ("Scene 3: Pip Pink Leap", os.path.join(downloads_dir, "Pink_bunny_mascot_leaping_65b985e7.mp4")),
        ("Scene 4: Sunny Cloud Spin", os.path.join(downloads_dir, "Yellow_cloud_mascot_animating_44bf2567.mp4")),
        ("Scene 5: Stacking Tower Finale", os.path.join(downloads_dir, "Mascots_stacking_into_vertical_t__226c302f.mp4")),
    ]
    
    temp_dir = "scratch/temp_chroma_all"
    os.makedirs(temp_dir, exist_ok=True)
    
    processed_clips = []
    
    for idx, (label, clip_path) in enumerate(clips):
        if not os.path.exists(clip_path):
            print(f"Warning: {clip_path} does not exist!")
            continue
            
        out_clip = f"{temp_dir}/clip_{idx}.webm"
        print(f"Processing {label} -> {out_clip}...")
        
        # Trim slightly to keep each action snappy (~2.0 seconds) and chromakey green to alpha
        cmd = [
            'ffmpeg', '-y', '-i', clip_path,
            '-t', '2.5',
            '-vf', 'colorkey=0x18E22B:0.35:0.1,format=yuva420p,scale=320:-1',
            '-c:v', 'libvpx-vp9', '-auto-alt-ref', '0',
            out_clip
        ]
        subprocess.run(cmd, check=True)
        processed_clips.append(out_clip)
        
    concat_list = f"{temp_dir}/concat_list.txt"
    with open(concat_list, "w") as f:
        for p in processed_clips:
            abs_p = os.path.abspath(p).replace('\\', '/')
            f.write(f"file '{abs_p}'\n")
            
    output_webm = "public/mascots/navbar-mascots-flow.webm"
    output_gif = "public/mascots/navbar-mascots-flow.gif"
    
    print("Concatenating all 5 scenes into master flow WebM...")
    cmd_concat = [
        'ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', concat_list,
        '-c:v', 'libvpx-vp9', '-auto-alt-ref', '0',
        output_webm
    ]
    subprocess.run(cmd_concat, check=True)
    print("Master WebM created:", output_webm)
    
    print("Generating transparent animated GIF (paletteuse with alpha)...")
    cmd_gif = [
        'ffmpeg', '-y', '-i', output_webm,
        '-filter_complex', '[0:v] fps=14,scale=240:-1,split [a][b];[a] palettegen=reserve_transparent=on:transparency_color=ffffff00 [p];[b][p] paletteuse=alpha_threshold=128',
        output_gif
    ]
    subprocess.run(cmd_gif, check=True)
    print("Master transparent GIF created:", output_gif)

if __name__ == '__main__':
    process_and_combine_all()
