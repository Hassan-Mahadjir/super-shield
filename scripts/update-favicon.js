#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// This script helps you update the favicon and logo files
// You can run this script to copy your logo to different favicon formats

const sourceLogo = path.join(__dirname, "../public/super.png");
const faviconPath = path.join(__dirname, "../src/app/favicon.ico");

console.log("🔄 Updating favicon and logo files...");

// Check if source logo exists
if (!fs.existsSync(sourceLogo)) {
  console.error("❌ Source logo not found:", sourceLogo);
  console.log("📝 Please place your logo file at:", sourceLogo);
  process.exit(1);
}

// Copy logo to favicon location
try {
  fs.copyFileSync(sourceLogo, faviconPath);
  console.log("✅ Favicon updated successfully!");
  console.log("📁 Files updated:");
  console.log("   - src/app/favicon.ico");
  console.log("   - public/super.png (used as favicon)");
} catch (error) {
  console.error("❌ Error updating favicon:", error.message);
  process.exit(1);
}

console.log("\n🎉 Favicon update complete!");
console.log("💡 Your logo will now appear in:");
console.log("   - Browser tabs");
console.log("   - Bookmarks");
console.log("   - Social media shares");
