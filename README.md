# 🧾 WinCo Auto Coupon Clipper Chrome Extension

This is a **Chrome extension** that automatically clips all available **digital coupons** on the [WinCo Foods](https://www.wincofoods.com/coupons) website. It’s designed to make coupon clipping faster and easier, saving you time and effort before you shop.

---

## 🚀 Features

- ✅ Detects when you're on the WinCo **/coupons** page
- ✅ Checks that you are **signed in**
- ✅ Asks if you'd like to clip all coupons
- ✅ Automatically:
  - Changes the page size to show **80 coupons**
  - Clicks all visible **"Clip Coupon"** buttons
  - Advances through pages until all coupons are clipped
- ✅ Skips if:
  - You’re not signed in
  - All coupons are already clipped

---

## 🔒 Privacy & Security

- 🔐 This extension **does not collect or transmit** any personal data.
- 🧠 All logic runs **entirely in your browser**.
- 📂 Your account info is never accessed or stored.
- 💬 The code is **fully open source** and easy to audit.

Note: This extension injects a local script (./injected.js) into the WinCo coupons page. No third-party scripts are injected, and no personal data is accessed or stored.

---

## 🛠️ How to Install (Unpacked Extension)

To use this extension locally in Chrome:

1. **Download or clone** this repository:
   ```
   git clone https://github.com/YOUR_USERNAME/winco-auto-coupon-clipper.git
   ```

2. Open Chrome and go to `chrome://extensions`.

3. Toggle the **Developer mode** switch in the top-right corner.

4. Click the **"Load unpacked"** button.

5. Select the folder where you downloaded or cloned this repository.

6. Navigate to [https://www.wincofoods.com/coupons](https://www.wincofoods.com/coupons), **sign in**, and you'll be prompted to clip all available coupons!

---

## 📁 Project Files

- `manifest.json` – Defines extension metadata and permissions
- `content.js` – Injects the script into the page safely
- `injected.js` – Core logic that clips coupons and handles pagination
- `icons/` – Extension icons for display in Chrome toolbar and extension manager

---

## 📌 Disclaimer

This project is **unofficial** and **not affiliated with WinCo Foods**. It is offered as-is and intended for personal use only.

---

## 👩‍💻 Author

Built by ChatGPT and Brielle Adsitt.  
Contributions and forks are welcome!

---

## 🪪 License

MIT License. See [LICENSE](./LICENSE) for more info.
