# Shikaku

Shikaku in two forms, in one page with no build step and no dependencies.

- **2D:** split a grid into rectangles. Each rectangle holds one number, equal to its area. A daily puzzle (same grid for everyone on a given date, 5×5 to 13×13 through the week), streaks, and practice sizes.
- **3D:** fill a cube with boxes. Each box holds one number, equal to its volume. Rotatable glass cube at 3×3×3, 4×4×4 and 5×5×5.
- **Settings:** sound effects, vibration, and swipe speed, saved on the device.

Every puzzle is generated in the browser and checked by a solver, so each has exactly one solution.

## Run it

Open `index.html` in a browser. Nothing to install.

## Publish it with GitHub Pages

1. Push `index.html` to the repository root.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then save.
4. The game appears at `https://<your-user>.github.io/<repository>/` after about a minute.

## Notes

- Progress, streaks and settings are stored in the browser's `localStorage`, so they stay on one device and one browser.
- The page loads three fonts from Google Fonts and falls back to system fonts if they are unavailable.
- Vibration works only in browsers that support it (mostly Chrome on Android).
