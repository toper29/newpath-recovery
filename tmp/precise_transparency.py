from PIL import Image, ImageDraw

def precise_transparency():
    # Load user's logo as source
    img = Image.open(r"C:\Users\Repot\Downloads\Rehab\nptanpabg.png").convert("RGBA")
    
    # We'll use floodfill from the corners to remove the background
    # Since the background is white, we fill with (0,0,0,0)
    
    # Start points: corners
    W, H = img.size
    seeds = [(0, 0), (W-1, 0), (0, H-1), (W-1, H-1)]
    
    for seed in seeds:
        # Increase threshold a bit to handle artifacts/noise in the white background
        ImageDraw.floodfill(img, seed, (0, 0, 0, 0), thresh=50)
        
    img.save(r"C:\Users\Repot\Downloads\Rehab\public\logo.png")
    # Favicon update
    img.save(r"C:\Users\Repot\Downloads\Rehab\public\favicon.ico", format="ICO", sizes=[(32, 32), (16, 16)])
    print("Precise transparency applied.")

if __name__ == "__main__":
    precise_transparency()
