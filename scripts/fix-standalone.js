#!/usr/bin/env node

// Fix Next.js standalone build by copying static files
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing standalone build static files...');

const sourceStatic = path.join(process.cwd(), '.next/static');
const targetStatic = path.join(process.cwd(), '.next/standalone/.next/static');
const targetPublic = path.join(process.cwd(), '.next/standalone/public');
const sourcePublic = path.join(process.cwd(), 'public');

// Function to copy directory recursively
function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️  Source directory ${src} does not exist`);
    return;
  }
  
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  // Copy static files
  if (fs.existsSync(sourceStatic)) {
    console.log('📁 Copying static files...');
    copyDirSync(sourceStatic, targetStatic);
    console.log('✅ Static files copied to standalone build');
  } else {
    console.log('❌ Static files directory not found');
  }

  // Copy public files 
  if (fs.existsSync(sourcePublic)) {
    console.log('📁 Copying public files...');
    copyDirSync(sourcePublic, targetPublic);
    console.log('✅ Public files copied to standalone build');
  } else {
    console.log('❌ Public files directory not found');
  }

  console.log('🎉 Standalone build fixed successfully!');
} catch (error) {
  console.error('❌ Error fixing standalone build:', error);
  process.exit(1);
}