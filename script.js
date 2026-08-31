(function () {
  "use strict";

  var smartDownload = document.getElementById("smart-download");
  var telegramBtn = document.getElementById("telegram-btn");
  var iosModal = document.getElementById("ios-modal");
  var iosModalClose = document.getElementById("ios-modal-close");
  var yearEl = document.getElementById("year");

  /**
   * Reads the browser's user agent to decide which download flow to
   * show — the same logic discussed during planning (Android → APK,
   * iOS → PWA / Add to Home Screen, everything else → Web).
   */
  function detectPlatform() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(ua)) return "android";
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return "ios";
    return "desktop";
  }

  /**
   * Pulls the live AppConfig from the backend (Grade 1's /api/app-config)
   * so this page always reflects whatever the Admin Dashboard has set —
   * no need to re-deploy the landing page when the APK or Telegram
   * link changes.
   */
  function fetchLiveConfig() {
    if (!STREAMX_CONFIG.API_BASE_URL) return Promise.resolve(null);
    return fetch(STREAMX_CONFIG.API_BASE_URL + "/app-config", { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) return null;
        return res.json();
      })
      .then(function (body) {
        return body && body.data ? body.data : null;
      })
      .catch(function (err) {
        console.warn("StreamX: could not reach the backend for live config, using fallbacks.", err);
        return null;
      });
  }

  function renderDownloadCard(platform, config) {
    var apkUrl = (config && config.apkDownloadUrl) || STREAMX_CONFIG.APK_FALLBACK_URL;
    var webUrl = STREAMX_CONFIG.WEB_APP_URL;

    if (platform === "android") {
      smartDownload.innerHTML = apkUrl
        ? '<a class="btn btn-primary" href="' +
          apkUrl +
          '">⬇ Download APK for Android</a>' +
          '<p class="hint">You may need to allow "Install from unknown sources" the first time.</p>'
        : '<p class="hint">The Android download isn\'t live yet — check back soon.</p>';
      return;
    }

    if (platform === "ios") {
      smartDownload.innerHTML =
        '<button class="btn btn-primary" id="ios-instructions-btn" type="button">Add StreamX to Home Screen</button>' +
        '<p class="hint">Works right in Safari — no App Store needed.</p>';
      var iosBtn = document.getElementById("ios-instructions-btn");
      if (iosBtn) {
        iosBtn.addEventListener("click", function () {
          iosModal.classList.remove("hidden");
        });
      }
      return;
    }

    // Desktop / anything else
    smartDownload.innerHTML = webUrl
      ? '<a class="btn btn-primary" href="' + webUrl + '" target="_blank" rel="noopener">Open StreamX Web App</a>'
      : '<p class="hint">The web app isn\'t live yet — open this page on your phone to install StreamX there.</p>';
  }

  function init() {
    var platform = detectPlatform();

    fetchLiveConfig().then(function (liveConfig) {
      renderDownloadCard(platform, liveConfig);

      var telegramUrl = (liveConfig && liveConfig.telegramChannelUrl) || STREAMX_CONFIG.TELEGRAM_FALLBACK_URL;
      if (telegramUrl) telegramBtn.setAttribute("href", telegramUrl);
    });

    if (iosModalClose) {
      iosModalClose.addEventListener("click", function () {
        iosModal.classList.add("hidden");
      });
    }
    if (iosModal) {
      iosModal.addEventListener("click", function (e) {
        if (e.target === iosModal) iosModal.classList.add("hidden");
      });
    }

    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
