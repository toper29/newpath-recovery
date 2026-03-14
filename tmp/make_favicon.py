from PIL import Image

def make_favicon():
    img = Image.open(r"C:\Users\Repot\Downloads\Rehab\public\logo.png")
    # Resize for favicon
    img.save(r"C:\Users\Repot\Downloads\Rehab\public\favicon.ico", format="ICO", sizes=[(32, 32), (16, 16)])
    print("Favicon created.")

if __name__ == "__main__":
    make_favicon()
