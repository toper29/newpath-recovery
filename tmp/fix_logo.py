from PIL import Image, ImageDraw
import sys

def remove_white_background(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        
        # We will iterate through pixels to find white ones and make them transparent
        # However, to avoid 'NP' text, we use floodfill from corners.
        
        # Start floodfilling with a very distinct temporary color
        temp_color = (1, 1, 1, 0) # Almost black but with alpha 0
        
        # Actually, floodfill in Pillow modifies the image in place.
        # Let's use it to mark the background.
        
        seeds = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
        
        for seed in seeds:
            # Fill with total transparency
            ImageDraw.floodfill(img, seed, (0, 0, 0, 0), thresh=30)
            
        img.save(output_path, "PNG")
        print(f"Successfully processed {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    remove_white_background(r"c:\Users\Repot\Downloads\Rehab\Logonp.png", r"c:\Users\Repot\Downloads\Rehab\public\logo.png")
