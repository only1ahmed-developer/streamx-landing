# StreamX — Smart Landing Page

A single static site (no build step, no framework) that:

- Detects **Android / iOS / Desktop** and shows the right call to action
  for each (APK download, "Add to Home Screen" instructions, or a Web App
  link).
- Calls the backend's `GET /api/app-config` live, so the APK link and
  Telegram link always match whatever's set in the Admin Dashboard —
  you never have to re-deploy this page when those change.
- Shows a features overview, pricing tiers, and illustrative app previews
  (CSS-built phone mockups — swap in real screenshots once you have a
  built app, see below).

## Files

```
streamx-landing/
├── index.html
├── style.css
├── config.js     # ← edit this before deploying
└── script.js
```

## Before deploying: edit `config.js`

```js
const STREAMX_CONFIG = {
  API_BASE_URL: "https://your-backend.onrender.com/api",
  APK_FALLBACK_URL: "",              // used only if the API call fails
  TELEGRAM_FALLBACK_URL: "https://t.me/your_channel",
  WEB_APP_URL: "",                   // fill in after `flutter build web`
};
```

## Deploying (Vercel or Netlify — both are literally drag-and-drop)

**Vercel:**
1. New Project → Import this folder (or connect the GitHub repo).
2. Framework preset: **Other** (no build command needed — it's static).
3. Deploy.

**Netlify Drop:**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the `streamx-landing` folder in.
3. Done — you get a live URL immediately.

Either way, once deployed you'll have a URL like `streamx.vercel.app` —
that's the one link you share everywhere (WhatsApp, Telegram, Instagram
bio) per the distribution strategy discussed during planning.

## Swapping in real screenshots

The three "preview" phones on the page are illustrative CSS mockups, not
real screenshots (the app hasn't been compiled in this environment). Once
you've run the app yourself:

1. Take 3–4 real screenshots (Home, Details, Player, My Account).
2. Add them to an `assets/` folder next to `index.html`.
3. In `index.html`, replace the `<div class="phone-screen mockup-...">`
   elements with `<img src="assets/your-screenshot.png">`.
