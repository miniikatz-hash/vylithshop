# Hero Video Required

The hero video files are missing:
- vylith-hero.mp4
- vylith-hero.webm
- vylith-hero-poster.jpg

Original source: vylith.mp4 (lost during directory recreation)

To regenerate:
```bash
ffmpeg -i vylith.mp4 -movflags faststart -vcodec libx264 -crf 18 -g 1 -pix_fmt yuv420p public/vylith-hero.mp4
ffmpeg -i public/vylith-hero.mp4 -vframes 1 public/vylith-hero-poster.jpg
ffmpeg -i public/vylith-hero.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -g 1 public/vylith-hero.webm
```
