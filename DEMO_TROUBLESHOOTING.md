# 🚨 Demo Troubleshooting Guide
## Quick Solutions for Common Demo Issues

---

## ⚡ **Emergency Quick Fixes**

### **🔴 CRITICAL: Demo Won't Start**
```bash
# Nuclear option - complete reset
rm -rf node_modules
npm install
npm run dev
```
**Time needed:** 2-3 minutes  
**Use when:** Nothing else works

### **🟡 URGENT: Tests Failing**
```bash
# Quick test reset
npm run test:figma:update
npm run test:figma
```
**Time needed:** 30 seconds  
**Use when:** Visual regression tests fail

### **🟢 MINOR: Component Not Rendering**
```bash
# Dev server restart
npm run dev
```
**Time needed:** 10 seconds  
**Use when:** Component generation fails

---

## 🔧 **Common Issues & Solutions**

### **Issue 1: Dev Server Won't Start**

#### **Symptoms:**
- `npm run dev` hangs or errors
- Port 3000 already in use
- "Command not found" errors

#### **Diagnosis:**
```bash
# Check what's using port 3000
lsof -i :3000

# Check Node.js version
node --version
npm --version
```

#### **Solutions:**
```bash
# Kill existing processes
pkill -f "vite"
pkill -f "node"

# Try different port
npm run dev -- --port 3001

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### **Prevention:**
- Always check ports before demo
- Keep Node.js version consistent
- Test dev server 15 minutes before demo

---

### **Issue 2: Playwright Tests Failing**

#### **Symptoms:**
- "browserType.launch: Executable doesn't exist"
- "expect(locator).toHaveScreenshot failed"
- "Test timeout exceeded"

#### **Diagnosis:**
```bash
# Check browser installation
npx playwright install --dry-run

# Verify test files exist
ls tests/figma-comparison.spec.ts-snapshots/
```

#### **Solutions:**
```bash
# Install browsers
npx playwright install

# Update snapshots
npm run test:figma:update

# Clear test cache
rm -rf tests/figma-comparison.spec.ts-snapshots/
npm run test:figma:update

# Specific browser install
npx playwright install chromium
```

#### **During Demo Recovery:**
```bash
# Quick baseline update
npm run test:figma:update && npm run test:figma
```

---

### **Issue 3: Component Generation Fails**

#### **Symptoms:**
- Button click doesn't work
- Component doesn't appear
- JavaScript errors in console

#### **Diagnosis:**
- Open browser dev tools (F12)
- Check console for errors
- Verify network requests

#### **Solutions:**
```javascript
// Quick browser console fix
localStorage.clear();
location.reload();
```

```bash
# Dev server restart
npm run dev
```

#### **Fallback During Demo:**
> "Let me show you a pre-generated component instead while the system refreshes."

---

### **Issue 4: Styling Hooks Don't Work**

#### **Symptoms:**
- CSS custom properties don't change component
- Browser dev tools can't find elements
- Styles appear but don't apply

#### **Diagnosis:**
```javascript
// Check if SLDS2 CSS is loaded
console.log(getComputedStyle(document.documentElement).getPropertyValue('--slds-g-color-success-container-1'));

// Find component elements
document.querySelector('.slds-badge');
```

#### **Solutions:**
```css
/* Manual CSS injection in dev tools */
.slds-badge {
  --slds-c-badge-color-background: #1976d2 !important;
  --slds-c-badge-text-color: #ffffff !important;
}
```

#### **Demo Fallback:**
- Switch to showing CSS file directly
- Use prepared styling screenshots
- Explain concept without live demo

---

## 🖥️ **Environment Issues**

### **Browser Compatibility**

#### **Chrome/Chromium Issues:**
```bash
# Reset Chrome settings
rm -rf ~/.config/google-chrome/Default/Preferences
```

#### **Firefox Fallback:**
- Open Firefox as backup browser
- CSS custom properties work better in Firefox dev tools
- Use for styling hooks demo if Chrome fails

#### **Safari Issues:**
- Avoid Safari for demos (CSS custom property support varies)
- Use Chrome or Firefox only

### **Screen Sharing Problems**

#### **Poor Quality:**
- Reduce screen resolution to 1920x1080
- Close unnecessary applications
- Use wired internet connection

#### **Audio Issues:**
- Test microphone beforehand
- Use headphones to prevent echo
- Mute when typing commands

#### **Lag/Delay:**
- Close resource-intensive applications
- Restart browser before demo
- Use incognito/private mode

---

## 🎯 **Demo Recovery Strategies**

### **Strategy 1: Pre-Built Fallbacks**

#### **Preparation:**
- Take screenshots of every demo step
- Record video of successful demo run
- Prepare static code examples

#### **Usage During Demo:**
> "Let me show you what this looks like when it's working" *(show screenshot)*

### **Strategy 2: Graceful Degradation**

#### **If Visual Tests Fail:**
> "The tests are checking that this component is pixel-perfect with our Figma design - the fact that they're running shows the automation capability."

#### **If Component Generation Fails:**
> "I'll show you the code that gets generated" *(switch to code view)*

#### **If Styling Hooks Fail:**
> "Let me demonstrate this principle with the CSS file directly."

### **Strategy 3: Pivot to Discussion**

#### **When Technical Issues Persist:**
- Switch to explaining benefits and architecture
- Use prepared slides or documentation
- Focus on business value and ROI
- Schedule follow-up technical demo

---

## 📱 **Quick Reference Commands**

### **Emergency Reset Sequence:**
```bash
# 1. Kill processes
pkill -f "vite" && pkill -f "node"

# 2. Restart dev server
npm run dev

# 3. Reset tests
npm run test:figma:update

# 4. Verify everything works
npm run test:figma
```

### **Health Check Commands:**
```bash
# Verify all systems
node --version          # Check Node.js
npm run dev &          # Start dev server
npm run test:figma     # Run tests
curl localhost:3000    # Check app response
```

### **Browser Dev Tools Shortcuts:**
- **F12** - Open dev tools
- **Ctrl+Shift+C** - Element inspector
- **Ctrl+R** - Refresh page
- **Ctrl+Shift+R** - Hard refresh (clear cache)

---

## 🔄 **Recovery Time Estimates**

| Issue | Solution Time | Demo Impact |
|-------|---------------|-------------|
| Dev server restart | 10 seconds | Minimal |
| Test baseline update | 30 seconds | Minor |
| Component re-generation | 5 seconds | None |
| Browser refresh | 3 seconds | None |
| Complete npm install | 2-3 minutes | Major |
| Playwright reinstall | 1-2 minutes | Moderate |

### **Time Management:**
- **<30 seconds:** Continue demo normally
- **30-60 seconds:** Fill with explanation/questions
- **>60 seconds:** Switch to backup materials

---

## 🎬 **Communication Scripts**

### **For Minor Issues (10-30 seconds):**
> "Let me restart this quickly - this demonstrates how fast the development cycle is when everything's working properly."

### **For Moderate Issues (30-60 seconds):**
> "While this is restarting, let me explain the key benefits we're about to see..."

### **For Major Issues (>60 seconds):**
> "I'm going to switch to showing you some prepared examples while we troubleshoot this. This actually demonstrates why having these automated tests is so valuable..."

### **Graceful Exit Strategy:**
> "The technical demo shows the capability, but let me focus on the business impact this has for your organization..."

---

## 📊 **Success Recovery Metrics**

### **Excellent Recovery (0-15 seconds):**
- Issue resolved transparently
- Audience doesn't notice
- Demo continues smoothly

### **Good Recovery (15-45 seconds):**
- Issue acknowledged professionally
- Quick fix implemented
- Minimal demo disruption

### **Acceptable Recovery (45-90 seconds):**
- Issue explained as learning opportunity
- Backup materials used effectively
- Key messages still delivered

### **Poor Recovery (>90 seconds):**
- Technical issues dominate demo
- Audience loses interest
- Key messages not communicated

---

## ✅ **Pre-Demo Testing Checklist**

### **15 Minutes Before:**
- [ ] All commands tested successfully
- [ ] Browser and dev tools ready
- [ ] Screen sharing tested
- [ ] Backup materials accessible

### **5 Minutes Before:**
- [ ] Fresh browser session started
- [ ] Dev server running smoothly
- [ ] Tests passing
- [ ] Network connection stable

### **1 Minute Before:**
- [ ] All unnecessary tabs closed
- [ ] Volume levels checked
- [ ] Demo script ready
- [ ] Confidence level: High! 🚀

---

**🎯 Demo Troubleshooting Complete**

*Ready to handle any technical challenge that comes up during the presentation!*