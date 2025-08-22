#!/usr/bin/env node

// Security issues verification and fix script
const fs = require('fs');
const path = require('path');

console.log('🔐 Checking for security issues...\n');

let hasIssues = false;

// Check for mixed content issues
const checkMixedContent = () => {
  console.log('📡 Checking for mixed content issues...');
  
  const srcDir = path.join(process.cwd(), 'src');
  const files = [];
  
  const scanDirectory = (dir) => {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.name.match(/\.(ts|tsx|js|jsx)$/)) {
        files.push(fullPath);
      }
    }
  };
  
  scanDirectory(srcDir);
  
  const httpReferences = [];
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      // Check for http:// references (excluding data URLs and localhost)
      if (line.match(/http:\/\/(?!localhost|127\.0\.0\.1)/) && !line.includes('xmlns=')) {
        httpReferences.push({
          file: file.replace(process.cwd() + '/', ''),
          line: index + 1,
          content: line.trim()
        });
      }
    });
  });
  
  if (httpReferences.length > 0) {
    console.error('❌ Found HTTP references that should be HTTPS:');
    httpReferences.forEach(ref => {
      console.error(`   ${ref.file}:${ref.line} - ${ref.content}`);
    });
    hasIssues = true;
  } else {
    console.log('✅ No HTTP mixed content issues found');
  }
};

// Check domain consistency
const checkDomainConsistency = () => {
  console.log('\n🌐 Checking domain consistency...');
  
  const srcFiles = [];
  const srcDir = path.join(process.cwd(), 'src');
  
  const scanDirectory = (dir) => {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.name.match(/\.(ts|tsx|js|jsx)$/)) {
        srcFiles.push(fullPath);
      }
    }
  };
  
  scanDirectory(srcDir);
  
  const domains = new Set();
  
  srcFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/https:\/\/timerwithmusics?\.com/g);
    if (matches) {
      matches.forEach(match => domains.add(match));
    }
  });
  
  console.log('Found domains:', Array.from(domains));
  
  if (domains.size > 1) {
    console.error('❌ Inconsistent domain usage found:');
    Array.from(domains).forEach(domain => {
      console.error(`   ${domain}`);
    });
    hasIssues = true;
  } else if (domains.size === 1) {
    console.log('✅ Domain consistency verified');
  } else {
    console.log('⚠️  No domain references found');
  }
};

// Check HTTPS enforcement
const checkHTTPSEnforcement = () => {
  console.log('\n🔒 Checking HTTPS enforcement...');
  
  const nextConfigPath = path.join(process.cwd(), 'next.config.ts');
  
  if (fs.existsSync(nextConfigPath)) {
    const content = fs.readFileSync(nextConfigPath, 'utf8');
    
    if (content.includes('upgrade-insecure-requests')) {
      console.log('✅ HTTPS upgrade directive found');
    } else {
      console.error('❌ Missing upgrade-insecure-requests in CSP');
      hasIssues = true;
    }
    
    if (content.includes('Strict-Transport-Security')) {
      console.log('✅ HSTS header configured');
    } else {
      console.error('❌ Missing HSTS header');
      hasIssues = true;
    }
  } else {
    console.error('❌ next.config.ts not found');
    hasIssues = true;
  }
};

// Check external resource security
const checkExternalResources = () => {
  console.log('\n🌍 Checking external resource security...');
  
  const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
  
  if (fs.existsSync(layoutPath)) {
    const content = fs.readFileSync(layoutPath, 'utf8');
    
    if (content.includes('preconnect') && content.includes('fonts.googleapis.com')) {
      console.log('✅ Google Fonts preconnect found');
    }
    
    if (content.includes('fonts.gstatic.com')) {
      console.log('✅ Google Fonts static resources configured');
    }
  }
};

// Run all checks
const runSecurityChecks = () => {
  checkMixedContent();
  checkDomainConsistency();
  checkHTTPSEnforcement();
  checkExternalResources();
  
  console.log('\n📋 Security Check Summary:');
  if (hasIssues) {
    console.error('❌ Security issues found. Please fix the issues above.');
    console.log('\n💡 Recommendations:');
    console.log('1. Use only HTTPS URLs for all external resources');
    console.log('2. Ensure domain consistency across all files');
    console.log('3. Verify SSL certificate matches your domain');
    console.log('4. Enable HSTS and CSP upgrade-insecure-requests');
    process.exit(1);
  } else {
    console.log('✅ All security checks passed!');
    console.log('\n🛡️  Security measures in place:');
    console.log('- HTTPS enforcement');
    console.log('- Domain consistency');
    console.log('- No mixed content');
    console.log('- External resource security');
  }
};

// Execute security checks
runSecurityChecks();