/**
 * Generate a secure random secret for CRON_SECRET
 * Run with: node scripts/generate-cron-secret.js
 */

const crypto = require('crypto');

// Generate a 32-byte (256-bit) random hex string
const secret = crypto.randomBytes(32).toString('hex');

console.log('\n🔐 Generated CRON_SECRET:');
console.log(secret);
console.log('\n📋 Copy this value and add it to Vercel Environment Variables:');
console.log('   1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables');
console.log('   2. Add new variable:');
console.log('      Key: CRON_SECRET');
console.log(`      Value: ${secret}`);
console.log('   3. Select all environments (Production, Preview, Development)');
console.log('   4. Save and redeploy\n');
