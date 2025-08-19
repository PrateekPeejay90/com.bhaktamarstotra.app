const fs = require('fs');
const path = require('path');

// Asset conversion helper for Bhaktamar Stotra App
console.log('🕉️ Converting SVG assets to required PNG formats...\n');

// Check if we have the SVG icon
const svgPath = path.join(__dirname, 'assets', 'icon.svg');
if (!fs.existsSync(svgPath)) {
  console.error('❌ icon.svg not found in assets directory');
  process.exit(1);
}

console.log('✅ Found icon.svg');
console.log('\n📋 Asset Conversion Requirements:');
console.log('1. App Icon: 1024x1024px PNG (from SVG)');
console.log('2. Adaptive Icon: 1024x1024px PNG (from SVG)');
console.log('3. Splash Screen: 1242x2436px PNG (custom)');
console.log('4. Favicon: 48x48px PNG (from SVG)');

console.log('\n🛠️ Conversion Options:');
console.log('\nOption 1: Online SVG to PNG Converter');
console.log('- Visit: https://svgtopng.com/');
console.log('- Upload: assets/icon.svg');
console.log('- Convert to: 1024x1024px PNG');
console.log('- Save as: assets/icon.png and assets/adaptive-icon.png');

console.log('\nOption 2: Command Line (if you have ImageMagick)');
console.log('- Install: brew install imagemagick (Mac) or apt-get install imagemagick (Linux)');
console.log('- Convert: magick assets/icon.svg -resize 1024x1024 assets/icon.png');
console.log('- Copy: cp assets/icon.png assets/adaptive-icon.png');

console.log('\nOption 3: Design Tools');
console.log('- Open SVG in Figma/Canva/Illustrator');
console.log('- Export as PNG at required sizes');

console.log('\n🎨 Creating Splash Screen Template...');

// Create splash screen SVG template
const splashSVG = `<svg width="1242" height="2436" viewBox="0 0 1242 2436" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1242" height="2436" fill="#f8f6f0"/>
  
  <!-- Gradient background -->
  <defs>
    <radialGradient id="splashGradient" cx="50%" cy="40%" r="60%">
      <stop offset="0%" style="stop-color:#F5DEB3;stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:#f8f6f0;stop-opacity:1" />
    </radialGradient>
    <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="2" dy="2" stdDeviation="4" flood-color="#00000020"/>
    </filter>
  </defs>
  
  <rect width="1242" height="2436" fill="url(#splashGradient)"/>
  
  <!-- App Icon (smaller version) -->
  <g transform="translate(621, 800)">
    <circle cx="0" cy="0" r="120" fill="#F5DEB3" stroke="#8B4513" stroke-width="4"/>
    
    <!-- Om Symbol -->
    <g transform="scale(0.8)" filter="url(#textShadow)">
      <path d="M-40,-30 C-60,-30 -70,-20 -70,0 C-70,20 -60,30 -40,30 L-20,30 C-10,30 0,20 0,10 L0,-10 C0,-20 -10,-30 -20,-30 L-30,-30 C-35,-30 -40,-25 -40,-20 C-40,-15 -35,-10 -30,-10 L-20,-10 C-15,-10 -10,-15 -10,-20 C-10,-25 -15,-30 -20,-30" 
            fill="#8B4513"/>
      <path d="M10,-20 C30,-20 40,-10 40,10 C40,30 30,40 10,40 C-10,40 -20,30 -20,10 L-20,0 C-20,-10 -10,-20 10,-20 Z" 
            fill="#8B4513"/>
      <circle cx="0" cy="-40" r="6" fill="#8B4513"/>
      <path d="M-15,-35 C-5,-45 5,-45 15,-35 C20,-30 20,-25 15,-20 C5,-15 -5,-15 -15,-20 C-20,-25 -20,-30 -15,-35 Z" 
            fill="#8B4513"/>
    </g>
  </g>
  
  <!-- App Title -->
  <text x="621" y="1050" font-family="serif" font-size="72" font-weight="bold" text-anchor="middle" fill="#8B4513" filter="url(#textShadow)">
    भक्तामर स्तोत्र
  </text>
  
  <!-- Subtitle -->
  <text x="621" y="1120" font-family="serif" font-size="48" text-anchor="middle" fill="#8B4513" opacity="0.8" filter="url(#textShadow)">
    Bhaktamar Stotra
  </text>
  
  <!-- Tagline -->
  <text x="621" y="1180" font-family="sans-serif" font-size="32" text-anchor="middle" fill="#8B4513" opacity="0.6">
    Sacred Jain Prayer
  </text>
  
  <!-- Decorative elements -->
  <g opacity="0.4">
    <path d="M400,1250 Q500,1220 600,1250 Q700,1220 800,1250" stroke="#8B4513" stroke-width="3" fill="none"/>
    <circle cx="450" cy="1260" r="3" fill="#8B4513"/>
    <circle cx="621" cy="1240" r="4" fill="#8B4513"/>
    <circle cx="792" cy="1260" r="3" fill="#8B4513"/>
  </g>
  
  <!-- Bottom text -->
  <text x="621" y="1900" font-family="sans-serif" font-size="28" text-anchor="middle" fill="#8B4513" opacity="0.5">
    Complete with Sanskrit, Hindi & English
  </text>
  
  <text x="621" y="1940" font-family="sans-serif" font-size="28" text-anchor="middle" fill="#8B4513" opacity="0.5">
    Font Controls • Samputt Reading
  </text>
</svg>`;

const splashPath = path.join(__dirname, 'assets', 'splash.svg');
fs.writeFileSync(splashPath, splashSVG);
console.log('✅ Created splash.svg template');

// Create favicon SVG (simplified version)
const faviconSVG = `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="faviconBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#F5DEB3;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#DEB887;stop-opacity:1" />
    </radialGradient>
  </defs>
  
  <circle cx="24" cy="24" r="22" fill="url(#faviconBg)" stroke="#8B4513" stroke-width="2"/>
  
  <!-- Simplified Om -->
  <g transform="translate(24, 20)">
    <path d="M-8,-6 C-12,-6 -14,-4 -14,0 C-14,4 -12,6 -8,6 L-4,6 C-2,6 0,4 0,2 L0,-2 C0,-4 -2,-6 -4,-6 L-6,-6 C-7,-6 -8,-5 -8,-4 C-8,-3 -7,-2 -6,-2 L-4,-2 C-3,-2 -2,-3 -2,-4 C-2,-5 -3,-6 -4,-6" 
          fill="#8B4513"/>
    <path d="M2,-4 C6,-4 8,-2 8,2 C8,6 6,8 2,8 C-2,8 -4,6 -4,2 L-4,0 C-4,-2 -2,-4 2,-4 Z" 
          fill="#8B4513"/>
    <circle cx="0" cy="-8" r="1.5" fill="#8B4513"/>
  </g>
  
  <text x="24" y="38" font-family="serif" font-size="8" text-anchor="middle" fill="#8B4513" font-weight="bold">भक्तामर</text>
</svg>`;

const faviconPath = path.join(__dirname, 'assets', 'favicon.svg');
fs.writeFileSync(faviconPath, faviconSVG);
console.log('✅ Created favicon.svg template');

console.log('\n📋 Next Steps:');
console.log('1. Convert SVG files to PNG using one of the methods above');
console.log('2. Required PNG files:');
console.log('   - assets/icon.png (1024x1024px)');
console.log('   - assets/adaptive-icon.png (1024x1024px)');
console.log('   - assets/splash.png (1242x2436px)');
console.log('   - assets/favicon.png (48x48px)');

console.log('\n🚀 Once PNG files are ready, run:');
console.log('   npx expo install --fix');
console.log('   eas build:configure');

console.log('\n✨ All SVG templates created successfully!');
