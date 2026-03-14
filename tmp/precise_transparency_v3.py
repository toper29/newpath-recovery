from PIL import Image, ImageDraw

def precise_transparency():
    try:
        input_path = r"C:\Users\Repot\Downloads\Rehab\nptanpabg.png"
        output_path = r"C:\Users\Repot\Downloads\Rehab\public\logo.png"
        
        # Open and resize
        img = Image.open(input_path).convert("RGBA")
        img = img.resize((512, 512), Image.Resampling.LANCZOS)
        
        W, H = img.size
        
        # Use a higher threshold with floodfill to get all off-white pixels
        seeds = [(0, 0), (W-1, 0), (0, H-1), (W-1, H-1), (W//2, 0), (0, H//2), (W-1, H//2), (W//2, H-1)]
        
        for seed in seeds:
            ImageDraw.floodfill(img, seed, (0, 0, 0, 0), thresh=80)
            
        img.save(output_path, "PNG")
        
        # Favicon update
        img.save(r"C:\Users\Repot\Downloads\Rehab\public\favicon.ico", format="ICO", sizes=[(32, 32), (16, 16)])
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    precise_transparency()
