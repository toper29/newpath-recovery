from PIL import Image

def fix():
    img = Image.open(r"C:\Users\Repot\Downloads\Rehab\Logonp.png").convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    # Looser threshold: if R, G, B are all above 240, make it transparent
    for item in datas:
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
    
    img.putdata(new_data)
    img.save(r"C:\Users\Repot\Downloads\Rehab\public\logo.png")
    # Also save as favicon (even if it's just a PNG, Next.js will handle it)
    print("Logo updated with broader transparency threshold.")

if __name__ == "__main__":
    fix()
