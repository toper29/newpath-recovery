from PIL import Image
try:
    img = Image.open(r"c:\Users\Repot\Downloads\Rehab\Logonp.png")
    img.save(r"c:\Users\Repot\Downloads\Rehab\public\logo.png")
    print("Success")
except Exception as e:
    print(f"Error: {e}")
