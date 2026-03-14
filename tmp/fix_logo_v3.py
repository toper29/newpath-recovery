from PIL import Image

def fix():
    img = Image.open(r"C:\Users\Repot\Downloads\Rehab\Logonp.png").convert("RGBA")
    
    def transform(pixel):
        # pixel is a tuple (R, G, B, A)
        # If it's pure white, make it transparent
        if pixel[0] > 250 and pixel[1] > 250 and pixel[2] > 250:
            return (255, 255, 255, 0)
        return pixel

    # Actually img.point doesn't work well for RGBA tuples.
    # We'll use getdata/putdata.
    
    print("Getting data...")
    datas = img.getdata()
    new_data = []
    
    for item in datas:
        if item[0] > 250 and item[1] > 250 and item[2] > 250:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
    
    print("Putting data...")
    img.putdata(new_data)
    img.save(r"C:\Users\Repot\Downloads\Rehab\public\logo.png")
    print("Done")

if __name__ == "__main__":
    fix()
