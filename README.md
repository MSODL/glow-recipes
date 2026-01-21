# Glow Recipes - Progressive Web App

A modern, installable recipe application for gluten-free, dairy-free, and diabetes-friendly recipes.

## 🌟 Features

- ✅ **Installable** - Add to your phone's home screen like a native app
- ✅ **Offline First** - Works without an internet connection after first load
- ✅ **Interactive Filters** - Vegan, Dairy-Free, Gluten-Free, Type 2 Friendly
- ✅ **AI Search** - Find recipes by ingredient or type
- ✅ **Recipe Generator** - Create custom recipes matching your dietary needs
- ✅ **Shopping List** - Add recipes and get a consolidated grocery list with checkboxes

## 🛒 Shopping List Feature

The integrated shopping list makes grocery shopping effortless:
- Click "🛒 Add to Shopping List" on any recipe
- Floating cart button shows your recipe count
- Open the list to see all ingredients grouped by recipe
- Check off items as you shop
- List persists even when you close the app
- Share your list via clipboard copy

## 📱 How to Install on Your Phone

### On iPhone (iOS)
1. Open the app in **Safari** (Chrome won't work for installation)
2. Tap the **Share** button (square with arrow pointing up)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"** to confirm
5. The app icon will appear on your home screen!

### On Android
1. Open the app in **Chrome**
2. Tap the **menu** (three dots in top right)
3. Tap **"Add to Home screen"** or **"Install app"**
4. Tap **"Add"** or **"Install"** to confirm
5. The app icon will appear on your home screen!

## 🚀 How to Run Locally

To test the PWA features, you need to serve it over HTTP (not `file://`):

### Option 1: Using Python (if installed)
```bash
cd c:/Users/mjsod/.gemini/antigravity/playground/axial-halo
python -m http.server 3000
```

### Option 2: Using Node.js
```bash
cd c:/Users/mjsod/.gemini/antigravity/playground/axial-halo
npx serve -l 3000
```

Then open **http://localhost:3000** in your browser.

## 🌐 How to Share Online

To let others install the PWA, you need to host it online. Here are some free options:

### Option 1: GitHub Pages (Easiest)
1. Create a GitHub account (if you don't have one)
2. Create a new repository
3. Upload all files from the `axial-halo` folder
4. Go to repository Settings → Pages
5. Enable GitHub Pages
6. Your app will be live at: `https://yourusername.github.io/repository-name/`

### Option 2: Netlify (Drag & Drop)
1. Go to [netlify.com](https://netlify.com)
2. Drag the `axial-halo` folder onto the page
3. Get your live URL instantly!

### Option 3: Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project folder
3. Follow the prompts to deploy

## 📂 File Structure

```
axial-halo/
├── index.html              # Main app (all-in-one file)
├── manifest.json           # PWA configuration
├── service-worker.js       # Offline caching
├── icon-192.png           # App icon (small)
├── icon-512.png           # App icon (large)
├── icon-maskable-512.png  # Adaptive icon (Android)
├── recipes.json           # Recipe data (optional, data is embedded)
└── README.md              # This file
```

## 🔧 Technical Details

- **PWA-Compliant**: Meets all Progressive Web App requirements
- **Offline Support**: Service worker caches all assets for offline use
- **Responsive Design**: Works on all screen sizes
- **No Dependencies**: Pure HTML/CSS/JavaScript
- **Self-Contained**: All data embedded in `index.html`

## 💡 Tips

- The app works best when added to your home screen
- Once installed, it will feel like a native app (no browser UI)
- It works offline after the first load
- Updates will be automatic when you reconnect to the internet

Enjoy your recipes! 🍽️✨
