from PIL import Image

def fix_user_logo():
    try:
        input_path = r"C:\Users\Repot\Downloads\Rehab\nptanpabg.png"
        output_path = r"C:\Users\Repot\Downloads\Rehab\public\logo.png"
        
        # Open and resize to a reasonable size
        img = Image.open(input_path).convert("RGBA")
        img = img.resize((512, 512), Image.Resampling.LANCZOS)
        
        datas = img.getdata()
        new_data = []
        
        for item in datas:
            # If it's white or very close to white
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(output_path, "PNG")
        
        # Favicon update
        img.save(r"C:\Users\Repot\Downloads\Rehab\public\favicon.ico", format="ICO", sizes=[(32, 32), (16, 16)])
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fix_user_logo()
