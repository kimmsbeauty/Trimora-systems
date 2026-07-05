# Brand assets — master source

`trimora-icon-source.svg` is the master icon file. All favicon/touch-icon
raster sizes in `public/` are generated from it. If the mark is ever
redesigned, only this file (and `public/safari-pinned-tab.svg`, which
must stay monochrome) need to be redrawn — everything else regenerates
from here.

## Colors
Matches the site's "Paper & Ink" design tokens (`src/app/globals.css`):
- Icon fill: `#35507A` / `#253855` gradient (accent-ink)
- Icon foreground: `#F5F3EE` (paper)

If the site's `--color-accent-ink` or `--color-paper` tokens ever change,
this icon should be regenerated to match — it was originally supplied as
a bright blue (`#2563EB`) that didn't match the site at all, which is
what prompted writing this note.

## Regenerating raster sizes
```bash
pip install cairosvg --break-system-packages
python3 -c "
import cairosvg
sizes = {
    'favicon-16x16.png': 16, 'favicon-32x32.png': 32, 'favicon-48x48.png': 48,
    'apple-touch-icon.png': 180, 'android-chrome-192x192.png': 192,
    'android-chrome-512x512.png': 512, 'mstile-150x150.png': 150,
}
for fname, size in sizes.items():
    cairosvg.svg2png(url='brand-assets/trimora-icon-source.svg', write_to=f'public/{fname}',
                      output_width=size, output_height=size)
"
```

Then rebuild the multi-resolution `.ico` (must bundle 16/32/48 together,
not just one size, or high-DPI contexts fall back to a blurry upscale):
```bash
python3 -c "
from PIL import Image
img16 = Image.open('public/favicon-16x16.png')
img32 = Image.open('public/favicon-32x32.png')
img48 = Image.open('public/favicon-48x48.png')
img48.save('src/app/favicon.ico', format='ICO', sizes=[(16,16),(32,32),(48,48)], append_images=[img16, img32])
"
```
