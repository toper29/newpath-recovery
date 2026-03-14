from PIL import Image
import sys

def fix_logo():
    try:
        input_path = r"C:\Users\Repot\Downloads\Rehab\nptanpabg.png"
        output_path = r"C:\Users\Repot\Downloads\Rehab\public\logo.png"
        
        # Open and resize with compatibility
        img = Image.open(input_path).convert("RGBA")
        
        # Determine resampling filter
        resample = getattr(Image, 'Resampling', Image).LANCZOS
        img = img.resize((512, 512), resample)
        
        data = img.getdata()
        new_data = []
        
        for item in data:
            # If color is white or near-white, make it transparent
            # (R, G, B, A)
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
        
        img.putdata(new_data)
        img.save(output_path, "PNG")
        
        # Favicon
        img.save(r"C:\Users\Repot\Downloads\Rehab\public\favicon.ico", format="ICO", sizes=[(32, 32), (16, 16)])
        print("Success")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    fix_logo()
