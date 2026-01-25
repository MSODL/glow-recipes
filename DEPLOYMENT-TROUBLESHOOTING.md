# GlowRecipes Deployment Troubleshooting Guide

## Common Deployment Issues & Fixes

### Issue 1: ❌ "Secret Key Missing" or "GITHUB_TOKEN" Errors

**Cause**: GitHub Pages deployment requires proper permissions.

**Fix**: The workflow now uses built-in `GITHUB_TOKEN` with correct permissions. No manual secrets needed!

**In `deploy.yml`**:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

✅ **Status**: **FIXED** in the new workflow

---

### Issue 2: ❌ "404 Not Found" After Deployment

**Cause**: Missing `index.html` or incorrect build path.

**Fix**: The workflow now:
1. Explicitly checks for `index.html` existence
2. Copies all necessary files to `_site` directory
3. Verifies structure before uploading

**Verification step in workflow**:
```yaml
- name: Verify deployment structure
  run: |
    if [ ! -f "_site/index.html" ]; then
      echo "❌ ERROR: index.html not found!"
      exit 1
    fi
```

✅ **Status**: **FIXED** with comprehensive file copying and verification

---

### Issue 3: ❌ "Module Not Found" or JavaScript Errors

**Cause**: ES6 modules require proper relative paths when deployed.

**Fix Options**:

**Option A** (Recommended): Use the modular version
- Deploy `index-modular.html` as the main entry point
- Rename it to `index.html` before deployment

**Option B**: Use the portable version
- Deploy `GlowRecipes_Portable.html` (no modules)
- Rename to `index.html`

**Current workflow**: Deploys both versions. GitHub Pages will use `index.html`.

---

### Issue 4: ❌ "GitHub Pages Not Enabled"

**How to Enable**:
1. Go to your repo on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **GitHub Actions**
4. Save

✅ **Action Required**: Enable GitHub Pages in repo settings

---

### Issue 5: ❌ Build Path Errors

**Common errors**:
- `Error: No such file or directory`
- `cp: cannot stat`

**Fix**: The new workflow uses robust file copying:
```yaml
cp *.png _site/ || echo "No PNG files to copy"
```

The `|| echo` prevents the workflow from failing if optional files are missing.

✅ **Status**: **FIXED** with error-tolerant copying

---

## Deployment Checklist

Before pushing to trigger deployment:

- [ ] Ensure `index.html` exists in the root
- [ ] Verify all component files are committed
- [ ] Check that `data/recipes.js` is present
- [ ] Confirm styles directory exists
- [ ] Enable GitHub Pages in repo settings (Source: GitHub Actions)
- [ ] Push to `main` or `master` branch

---

## Manual Deployment Steps

If you want to deploy manually:

1. **Build the site** (already static, no build needed)
2. **Test locally** with a web server:
   ```bash
   python -m http.server 8000
   # or
   npx http-server -p 8000
   ```
3. **Verify files**:
   - index.html
   - components/
   - data/recipes.js
   - styles/
   - app.js
4. **Push to GitHub**
5. **Workflow auto-runs** within 1-2 minutes

---

## Debugging Failed Workflows

### Where to Look:
1. Go to **Actions** tab in GitHub repository
2. Click on the failed workflow run
3. Check each step for errors

### Common fixes:

**Error: "Resource not accessible by integration"**
- Fix: Check permissions in workflow file (already fixed)

**Error: "The process 'git' failed with exit code 128"**
- Fix: Ensure you have write access to the repository

**Error: "Error: No location provided"**
- Fix: Ensure `index.html` exists in `_site` directory (already verified in workflow)

---

## Testing the Deployment

After successful deployment:

1. Visit: `https://[your-username].github.io/[repo-name]/`
2. Check browser console for errors (F12)
3. Verify:
   - Recipes load correctly
   - Search works
   - Filters function
   - Modular components load (if using modular version)

---

## Emergency Rollback

If deployment breaks the site:

1. Go to **Actions** tab
2. Find last successful deployment
3. Click **Re-run jobs**

Or revert the commit:
```bash
git revert HEAD
git push
```

---

## File Structure for Deployment

The workflow deploys this structure:

```
_site/
├── index.html           ← Entry point
├── index-modular.html   ← Alternative entry
├── app.js
├── components/
│   ├── Header.js
│   ├── SearchBar.js
│   ├── FilterBar.js
│   ├── RecipeCard.js
│   └── RecipeGrid.js
├── data/
│   └── recipes.js
├── styles/
│   ├── main.css
│   ├── searchbar.css
│   └── filterbar.css
└── *.png (icons)
```

---

## Next Steps

1. ✅ Workflow created and configured
2. ⏳ Enable GitHub Pages in repository settings
3. ⏳ Push changes to GitHub
4. ⏳ Monitor first deployment in Actions tab
5. ⏳ Test deployed site

---

## Support

If issues persist:
- Check GitHub Actions logs
- Verify all files are committed
- Ensure repository visibility is set correctly (Public for free GitHub Pages)
- Check that Pages is enabled with "GitHub Actions" as source
