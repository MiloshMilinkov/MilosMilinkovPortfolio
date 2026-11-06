# Extracts the largest embedded image from page 1 of the CV PDF (the portrait)
# and writes it unchanged as <out_dir>/portrait-source.<ext>.
# Usage: python -I scripts/assets/extract-portrait.py <cv.pdf> <out_dir>
# Requires PyMuPDF (pip install pymupdf) — run it from a throwaway venv.
import pathlib
import sys

import pymupdf


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit("usage: extract-portrait.py <cv.pdf> <out_dir>")
    pdf_path, out_dir = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
    out_dir.mkdir(parents=True, exist_ok=True)

    doc = pymupdf.open(pdf_path)
    images = doc[0].get_images(full=True)
    if not images:
        sys.exit("no images on page 1")

    best = max(images, key=lambda img: img[2] * img[3])  # width * height
    data = doc.extract_image(best[0])
    target = out_dir / f"portrait-source.{data['ext']}"
    target.write_bytes(data["image"])
    print(f"{target} ({data['width']}x{data['height']})")


if __name__ == "__main__":
    main()
