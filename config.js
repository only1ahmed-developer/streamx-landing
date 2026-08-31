// StreamX Landing Page — configuration
// Edit these four values before deploying. No build step needed —
// this is a plain static site (Vercel, Netlify, or GitHub Pages all work).
const STREAMX_CONFIG = {
  // Your deployed backend's API base URL (Grade 1–2). The page calls
  // `${API_BASE_URL}/app-config` to show the *live* APK link and
  // Telegram link — the same ones you manage from the Admin Dashboard.
  API_BASE_URL: "https://your-backend.onrender.com/api",

  // Used only if the API above is unreachable.
  APK_FALLBACK_URL: "",

  // Used only if the API above is unreachable.
  TELEGRAM_FALLBACK_URL: "https://t.me/your_channel",

  // Fill this in once you've deployed a web build of the Flutter app
  // (`flutter build web`, hosted on Vercel/Netlify like this page).
  WEB_APP_URL: "",
};
