JOSHUA REED PORTFOLIO - SETUP GUIDE

FOLDERS
  index.html, styles.css, script.js   (the site)
  assets/audio/       your MP3s
  assets/images/      share.jpg (1200x630 link preview), any photos
  assets/thumbnails/  TikTok thumbnails (optional)

1. AUDIO - add these exact file names to assets/audio/ (MP3):
   introduction.mp3  fiction.mp3  romance.mp3  thriller.mp3
   nonfiction.mp3  memoir.mp3  character-dialogue.mp3
   Tip: 30-90 seconds per sample, 128 kbps, so pages stay fast on mobile.
   Until a file exists, its card shows "Audio file not added yet".

2. VIDEOS - your two clips are in assets/video/ (add more by copying a <figure class="vid"> block in index.html).
   TIKTOK_PROFILE = your profile URL; paste each video URL into TIKTOK_VIDEOS.
   Copy it from TikTok: Share > Copy link (use the full ".../video/123..." form;
   if you get a short vm.tiktok.com link, open it in a browser and copy the final URL).
   Optional thumb: "assets/thumbnails/clip1.jpg" (9:16 image).
   Add or delete lines to change how many tiles show.

3. EMAIL + SOCIALS - script.js: EMAIL. Footer social links: index.html (.social).

4. CONTACT FORM - it does NOT send until connected.
   Create a free form at formspree.io, copy its ID, and in index.html replace
   YOUR_FORM_ID in the <form action="..."> line. Test it once after publishing.

5. GENRE COVERS - the covers are CSS-drawn (no copyrighted art). To use images:
   put files in assets/images/ and in styles.css add, e.g.
   .c1{background:url(assets/images/romance.jpg) center/cover}  (repeat for c2-c6).
   Use your own images or licensed/free-license ones, compressed (WebP/JPG, under 150 KB).

6. PUBLISH - drag the whole folder (keep the structure) into Netlify Drop
   (app.netlify.com/drop), or use Cloudflare Pages / GitHub Pages / Vercel.
   Then connect a custom domain such as joshuareed.com and put that URL in your TikTok bio.
