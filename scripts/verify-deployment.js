#!/usr/bin/env node

// Verify deployment static files and configuration
const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying deployment configuration...\n');

const buildDir = path.join(process.cwd(), '.next');
const standaloneDir = path.join(buildDir, 'standalone');
const staticDir = path.join(standaloneDir, '.next', 'static');
const publicDir = path.join(standaloneDir, 'public');

let hasErrors = false;

// Check if standalone build exists
if (!fs.existsSync(standaloneDir)) {
  console.error('❌ Standalone directory not found. Run: npm run build');
  hasErrors = true;
} else {
  console.log('✅ Standalone directory exists');
}

// Check if server.js exists
const serverJs = path.join(standaloneDir, 'server.js');
if (!fs.existsSync(serverJs)) {
  console.error('❌ server.js not found in standalone build');
  hasErrors = true;
} else {
  console.log('✅ server.js exists');
}

// Check if static files are copied
if (!fs.existsSync(staticDir)) {
  console.error('❌ Static files not copied to standalone build');
  hasErrors = true;
} else {
  console.log('✅ Static files directory exists');
  
  // Check for specific static assets
  const chunks = fs.readdirSync(path.join(staticDir, 'chunks'), { withFileTypes: true })
    .filter(dirent => dirent.isFile() && dirent.name.endsWith('.js'))
    .map(dirent => dirent.name);
  
  console.log(`📁 Found ${chunks.length} JavaScript chunks`);
  
  // Check for turbopack files (should not exist in production)
  const turbopackFiles = chunks.filter(file => file.includes('turbopack'));
  if (turbopackFiles.length > 0) {
    console.error(`❌ Found ${turbopackFiles.length} Turbopack files in production build:`);
    turbopackFiles.forEach(file => console.error(`   - ${file}`));
    hasErrors = true;
  } else {
    console.log('✅ No Turbopack files found (good)');
  }
}

// Check if public files are copied
if (!fs.existsSync(publicDir)) {
  console.error('❌ Public files not copied to standalone build');
  hasErrors = true;
} else {
  console.log('✅ Public files directory exists');
}

// Check next.config.ts for production settings
const nextConfigPath = path.join(process.cwd(), 'next.config.ts');
if (fs.existsSync(nextConfigPath)) {
  const configContent = fs.readFileSync(nextConfigPath, 'utf8');
  
  if (configContent.includes("output: 'standalone'")) {
    console.log('✅ Standalone output configured');
  } else {
    console.error('❌ Standalone output not configured');
    hasErrors = true;
  }
  
  if (configContent.includes('Content-Type')) {
    console.log('✅ MIME type headers configured');
  } else {
    console.error('❌ MIME type headers not configured');
    hasErrors = true;
  }
} else {
  console.error('❌ next.config.ts not found');
  hasErrors = true;
}

// Check package.json build script
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const buildScript = packageJson.scripts?.build;
  
  if (buildScript && buildScript.includes('fix-standalone.js')) {
    console.log('✅ Build script includes standalone fix');
  } else {
    console.error('❌ Build script missing standalone fix');
    hasErrors = true;
  }
  
  if (buildScript && !buildScript.includes('--turbopack')) {
    console.log('✅ Build script does not use Turbopack (good for production)');
  } else if (buildScript && buildScript.includes('--turbopack')) {
    console.error('❌ Build script uses Turbopack (should not be used in production)');
    hasErrors = true;
  }
} else {
  console.error('❌ package.json not found');
  hasErrors = true;
}

console.log('\n📋 Deployment Verification Summary:');
if (hasErrors) {
  console.error('❌ Deployment verification failed. Please fix the issues above.');
  console.log('\n💡 Quick fixes:');
  console.log('1. Run: npm run build (not npm run build:turbo)');
  console.log('2. Ensure fix-standalone.js runs after build');
  console.log('3. Deploy using the standalone directory');
  process.exit(1);
} else {
  console.log('✅ All deployment checks passed!');
  console.log('\n🚀 Ready for deployment:');
  console.log('- Use: npm run build');
  console.log('- Deploy: .next/standalone/ directory');
  console.log('- Start: npm start or node .next/standalone/server.js');
}