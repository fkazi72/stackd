import cv2
import numpy as np
import subprocess
import os

def process_and_combine_clips(video_paths, output_webm, output_gif):
    print("Combining clips:", video_paths)
    
    # Create temp concat list
    temp_dir = "scratch/temp_chroma"
    os.makedirs(temp_dir, exist_ok=True)
    
    processed_clips = []
    for idx, path in enumerate(video_paths):
        out_clip = f"{temp_dir}/clip_{idx}.webm"
        # Chromakey green background to transparent alpha
        cmd = [
            'ffmpeg', '-y', '-i', path,
            '-vf', 'colorkey=0x18E22B:0.35:0.1,format=yuva420p,scale=320:-1',
            '-c:v', 'libvpx-vp9', '-auto-alt-ref', '0',
            out_clip
        ]
        print(f"Converting clip {idx} to transparent WebM...")
        subprocess.run(cmd, check=True)
        processed_clips.append(out_clip)
        
    # Write concat list file
    concat_list = f"{temp_dir}/concat_list.txt"
    with open(concat_list, "w") as f:
        for p in processed_clips:
            abs_p = os.path.abspath(p).replace('\\', '/')
            f.write(f"file '{abs_p}'\n")
            
    # Concatenate all into single unified WebM
    print("Concatenating into unified master WebM...")
    cmd_concat = [
        'ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', concat_list,
        '-c:v', 'libvpx-vp9', '-auto-alt-ref', '0',
        output_webm
    ]
    subprocess.run(cmd_concat, check=True)
    print("Unified WebM generated:", output_webm)
    
    # Generate high quality transparent GIF
    print("Generating transparent GIF...")
    cmd_gif = [
        'ffmpeg', '-y', '-i', output_webm,
        '-filter_complex', '[0:v] fps=16,scale=240:-1,split [a][b];[a] palettegen=reserve_transparent=on:transparency_color=ffffff00 [p];[b][p] paletteuse=alpha_threshold=128',
        output_gif
    ]
    subprocess.run(cmd_gif, check=True)
    print("Unified transparent GIF generated:", output_gif)

if __name__ == '__main__':
    downloads_dir = r"C:\Users\Mohammad Maaz\.gemini\antigravity\brain\cbba2371-3661-4604-a6ff-b056b755075c\browser_sandbox\downloads"
    blob_video = os.path.join(downloads_dir, "Blue_blob_mascot_waving_hello_450eae46.mp4")
    mint_video = os.path.join(downloads_dir, "Mascot_holding_gift_box_86d65cf7.mp4")
    
    existing = [v for v in [blob_video, mint_video] if os.path.exists(v)]
    if existing:
        process_and_combine_clips(existing, "public/mascots/navbar-mascots-flow.webm", "public/mascots/navbar-mascots-flow.gif")
