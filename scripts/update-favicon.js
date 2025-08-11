#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// This script helps you update the favicon and logo files
// It converts your logo to proper favicon formats

const sourceLogo = path.join(__dirname, "../public/logo.png");
const faviconPath = path.join(__dirname, "../src/app/favicon.ico");
const publicFaviconPath = path.join(__dirname, "../public/favicon.ico");

console.log("🔄 Updating favicon and logo files...");

// Check if source logo exists
if (!fs.existsSync(sourceLogo)) {
  console.error("❌ Source logo not found:", sourceLogo);
  console.log("📝 Please place your logo file at:", sourceLogo);
  process.exit(1);
}

async function updateFavicon() {
  try {
    // Create a 32x32 favicon (standard size)
    const faviconBuffer = await sharp(sourceLogo)
      .resize(32, 32, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .png()
      .toBuffer();

    // For Next.js app directory, we'll use PNG format instead of ICO
    // as it's more modern and better supported
    fs.writeFileSync(faviconPath.replace(".ico", ".png"), faviconBuffer);

    // Also create a copy in public directory for broader compatibility
    fs.writeFileSync(publicFaviconPath.replace(".ico", ".png"), faviconBuffer);

    // Create additional sizes for better browser support
    const sizes = [16, 32, 48, 64, 128, 256];

    for (const size of sizes) {
      const iconBuffer = await sharp(sourceLogo)
        .resize(size, size, {
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .png()
        .toBuffer();

      fs.writeFileSync(
        path.join(__dirname, `../public/favicon-${size}x${size}.png`),
        iconBuffer
      );
    }

    console.log("✅ Favicon updated successfully!");
    console.log("📁 Files created:");
    console.log("   - src/app/favicon.png");
    console.log("   - public/favicon.png");
    console.log("   - public/favicon-16x16.png");
    console.log("   - public/favicon-32x32.png");
    console.log("   - public/favicon-48x48.png");
    console.log("   - public/favicon-64x64.png");
    console.log("   - public/favicon-128x128.png");
    console.log("   - public/favicon-256x256.png");
  } catch (error) {
    console.error("❌ Error updating favicon:", error.message);
    process.exit(1);
  }
}

updateFavicon().then(() => {
  console.log("\n🎉 Favicon update complete!");
  console.log("💡 Your logo will now appear in:");
  console.log("   - Browser tabs");
  console.log("   - Bookmarks");
  console.log("   - Social media shares");
  console.log("   - Mobile home screen shortcuts");
});
