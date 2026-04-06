import os
from PIL import Image

def compress_image(path, target_width=1200):
    try:
        img = Image.open(path)
        # Convert RGBA to RGB for JPEG compatibility
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        
        # Resize if huge
        if img.width > target_width:
            ratio = target_width / float(img.width)
            new_height = int(float(img.height) * float(ratio))
            img = img.resize((target_width, new_height), Image.Resampling.LANCZOS)
            
        new_path = path.replace('.png', '.jpg')
        img.save(new_path, "JPEG", quality=85, optimize=True)
        print(f"Compressed {path} -> {new_path}")
        return True
    except Exception as e:
        print(f"Error compressing {path}: {e}")
        return False

def main():
    img_dir = "images"
    for filename in os.listdir(img_dir):
        if filename.endswith(".png"):
            path = os.path.join(img_dir, filename)
            compress_image(path)

            # optionally delete the original png to avoid confusion
            os.remove(path)

if __name__ == "__main__":
    main()
