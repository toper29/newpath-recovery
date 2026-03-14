from PIL import Image
try:
    img = Image.open(r"c:\Users\Repot\Downloads\Rehab\Logonp.png").convert("RGBA")
    pixdata = img.load()
    width, height = img.size
    
    # Simple strategy: make pixels transparent if they are pure white
    # and located in the margins (outer edges)
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixdata[x, y]
            # If the pixel is white or almost white
            if r > 240 and g > 240 and b > 240:
                # Basic check: is it in the outer margin? 
                # (NP text is internal, so we avoid the center)
                if x < 100 or x > width - 100 or y < 50 or y > height - 100:
                    pixdata[x, y] = (255, 255, 255, 0)
                else:
                    # For internal pixels, we'll be more careful or just leave them
                    # If we really want to be sure, we could use floodfill, 
                    # but let's try this first.
                    pass
            
    img.save(r"c:\Users\Repot\Downloads\Rehab\public\logo.png")
    print("Success")
except Exception as e:
    print(f"Error: {e}")
