from PIL import Image

def fix_user_logo():
    # Use the user's new file as source
    img = Image.open(r"C:\Users\Repot\Downloads\Rehab\nptanpabg.png").convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    # threshold for white
    for item in datas:
        # If it's white or very close to white
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0)) # Fully transparent
        else:
            new_data.append(item)
    
    img.putdata(new_data)
    img.save(r"C:\Users\Repot\Downloads\Rehab\public\logo.png")
    # Favicon update
    img.save(r"C:\Users\Repot\Downloads\Rehab\public\favicon.ico", format="ICO", sizes=[(32, 32), (16, 16)])
    print("Logo and Favicon fixed and updated.")

if __name__ == "__main__":
    fix_user_logo()
