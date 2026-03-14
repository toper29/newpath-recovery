from PIL import Image

def make_favicon():
    try:
        img = Image.open(r"C:\Users\Repot\Downloads\Rehab\public\logo.png")
        # Ensure it's square for favicon or just use it as is
        img.save(r"C:\Users\Repot\Downloads\Rehab\public\favicon.ico", format="ICO", sizes=[(32, 32), (16, 16)])
        print("Favicon updated with new logo source.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    make_favicon()
