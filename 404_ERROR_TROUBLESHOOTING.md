# 404 Error Troubleshooting Guide

## Quick Fix Steps

### Step 1: Clean Build Cache
```bash
npm run clean
```

### Step 2: Restart Dev Server
```bash
npm run dev
```

### Step 3: Diagnose Issues
```bash
npm run diagnose:404
```

---

## Common 404 Errors and Fixes

### 1. React-Countup Chunk 404

**Error:**
```
Failed to load resource: the server responded with a status of 404 (Not Found)
2452b_react-countup_build_index_7b8d247b.js
```

**Fix:**
```bash
# Clean build cache
npm run clean

# Restart dev server
npm run dev
```

**Cause:**
- Build cache out of sync
- Dynamic import chunk path mismatch
- Hot reload issue

---

### 2. Static Asset 404

**Error:**
```
Failed to load resource: /path/to/file.png
```

**Check:**
1. File exists in `public/` directory?
2. Path is correct (case-sensitive on some systems)?
3. File extension matches?

**Fix:**
- Ensure file is in `public/` directory
- Use correct path (relative to `public/`)
- Check file permissions

---

### 3. Image Optimization 404

**Error:**
```
Failed to load resource: /_next/image?url=...
```

**Fix:**
1. Check `next.config.ts` image configuration
2. Verify image exists in `public/` directory
3. Check image format is supported

**Common Issues:**
- Image path incorrect
- Image format not supported
- Image optimization disabled

---

### 4. API Route 404

**Error:**
```
Failed to load resource: /api/endpoint
```

**Check:**
1. API route file exists in `src/app/api/`
2. Route file is named correctly (`route.ts` or `route.js`)
3. HTTP method matches (GET, POST, etc.)

**Fix:**
- Verify API route structure
- Check route file naming
- Restart dev server

---

## Diagnostic Tools

### Browser DevTools

1. Open DevTools (F12)
2. Go to **Network** tab
3. Filter by **Failed** or **404**
4. Check the failed request:
   - URL
   - Status code
   - Response headers
   - Request headers

### Next.js Logs

Check terminal output for:
- Build errors
- Route compilation errors
- Missing module warnings

### Diagnostic Script

Run the diagnostic script:
```bash
npm run diagnose:404
```

This will check:
- Build directory exists
- Node modules installed
- Common files present
- Configuration issues

---

## Prevention

### 1. Use Correct Paths

**Static Assets:**
```typescript
// ✅ Correct - relative to public/
<Image src="/logo.jpg" />

// ❌ Wrong - absolute path
<Image src="/public/logo.jpg" />
```

### 2. Check File Existence

Before referencing files:
- Verify file exists in `public/`
- Check file name (case-sensitive)
- Verify file extension

### 3. Dynamic Imports

Use proper dynamic import syntax:
```typescript
// ✅ Correct
const Component = dynamic(() => import('./Component'));

// ❌ Wrong - incorrect path
const Component = dynamic(() => import('../Component'));
```

### 4. Build Before Deploy

Always build before deploying:
```bash
npm run build
npm run start
```

---

## Advanced Debugging

### Check Build Output

```bash
# Build and check for errors
npm run build

# Check .next directory
ls .next/static/chunks
```

### Check Network Requests

1. Open DevTools → Network
2. Enable "Preserve log"
3. Reload page
4. Filter by status code
5. Check failed requests

### Check Console Errors

1. Open DevTools → Console
2. Look for:
   - Module not found errors
   - Chunk load errors
   - Network errors

---

## Still Having Issues?

### 1. Clear All Caches

```bash
# Clean Next.js cache
npm run clean

# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules
npm install
```

### 2. Rebuild

```bash
# Full rebuild
npm run clean
npm install
npm run build
npm run dev
```

### 3. Check Configuration

Verify:
- `next.config.ts` is correct
- `package.json` dependencies are installed
- Environment variables are set
- File paths are correct

---

## Common Solutions Summary

| Issue | Solution |
|-------|----------|
| Chunk 404 | `npm run clean` + restart |
| Static file 404 | Check `public/` directory |
| Image 404 | Verify image path and format |
| API 404 | Check route file structure |
| Module 404 | Reinstall dependencies |

---

**Last Updated:** 2025-01-27

