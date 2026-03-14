from PIL import Image, ImageDraw
import sys

def precise_transparency():
    try:
        input_path = r"C:\Users\Repot\Downloads\Rehab\nptanpabg.png"
        output_path = r"C:\Users\Repot\Downloads\Rehab\public\logo.png"
        
        print(f"Opening {input_path}")
        img = Image.open(input_path).convert("RGBA")
        
        W, H = img.size
        print(f"Image size: {W}x{H}")
        
        # Use corner seeds for floodfill
        seeds = [(0, 0), (W-1, 0), (0, H-1), (W-1, H-1)]
        
        for seed in seeds:
            print(f"Filling from {seed}")
            # Use color (0,0,0,0) for transparency
            ImageDraw.floodfill(img, seed, (0, 0, 0, 0), thresh=50)
            
        print(f"Saving to {output_path}")
        img.save(output_path, "PNG")
        
        # Favicon
        fav_path = r"C:\Users\Repot\Downloads\Rehab\public\favicon.ico"
        print(f"Saving favicon to {fav_path}")
        img.save(fav_path, format="ICO", sizes=[(32, 32), (16, 16)])
        
        print("Success")
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        sys.exit(1)

if __name__ == "__main__":
    precise_transparency()
