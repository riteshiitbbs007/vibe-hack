# ✅ Demo Pre-Flight Checklist

## 🔧 Technical Setup (15 minutes before demo)

### **Development Environment**
- [ ] **Node.js & npm** - Verify versions are compatible
- [ ] **Cursor IDE** - Latest version with MCP support
- [ ] **Browser** - Chrome/Chromium for Playwright compatibility
- [ ] **Screen resolution** - Set to 1920x1080 for consistent screenshots

### **Project Setup**
- [ ] **Dependencies installed**: `npm install` completed successfully
- [ ] **Dev server working**: `npm run dev` starts without errors
- [ ] **Tests passing**: `npm run test:figma` shows 4/4 ✅ passing
- [ ] **Port availability**: localhost:3000 and 9323 available

### **Demo Application**
- [ ] **App loads** at http://localhost:3000
- [ ] **Component generator** shows "🎯 SLDS2 Badge Success" button
- [ ] **No console errors** in browser dev tools
- [ ] **Styling loaded** - SLDS2 styles and tokens working

---

## 🎯 Demo Flow Verification

### **Scene 1: Component Generation**
- [ ] Click "🎯 SLDS2 Badge Success" button works
- [ ] Component appears in preview area
- [ ] SLDS2 compliance badges show in preview
- [ ] No JavaScript errors during generation

### **Scene 2: Code Inspection**
- [ ] Switch to "💻 Code" tab works smoothly
- [ ] Generated code displays properly formatted
- [ ] SLDS2 features visible in code:
  - [ ] `--slds-c-badge-*` styling hooks
  - [ ] `slds-badge slds-badge_success` classes
  - [ ] `role="status"` accessibility attribute
  - [ ] `span` semantic element (not div)

### **Scene 3: Visual Testing**
- [ ] `npm run test:figma` executes successfully
- [ ] All 4 tests pass in under 3 seconds
- [ ] Test report can be opened with `npx playwright show-report`
- [ ] Screenshots load in test report

### **Scene 4: Live Styling Hooks Demo**
- [ ] Browser dev tools open successfully
- [ ] Can find `.slds-badge` element in inspector
- [ ] CSS custom properties visible in styles panel
- [ ] Live editing of `--slds-c-badge-color-background` works
- [ ] Changes reflect immediately in preview

---

## 🛠️ Backup Plans

### **If Dev Server Fails**
```bash
# Emergency restart sequence
pkill -f "vite"
rm -rf node_modules/.vite
npm run dev
```

### **If Tests Fail**
```bash
# Regenerate baselines if needed
npm run test:figma:update
npm run test:figma
```

### **If Component Doesn't Render**
- Check browser console for errors
- Verify CSS imports in `src/index.css`
- Restart dev server
- Clear browser cache

### **If Styling Hooks Don't Work**
- Verify SLDS2 CSS is loaded
- Check for CSS custom property support
- Use Firefox dev tools as backup

---

## 📱 Demo Environment Settings

### **Browser Setup**
- **Primary tab**: Demo app (localhost:3000)
- **Secondary tab**: Test report (localhost:9323) - ready but not open
- **Dev tools**: Closed initially, ready to open
- **Zoom level**: 100% (not zoomed)

### **Cursor Setup**
- **Terminal**: Ready with project directory
- **Files panel**: Collapsed to focus on demo
- **No unnecessary tabs**: Clean workspace
- **Font size**: Large enough for audience to read

### **Screen Sharing**
- **Full screen**: Not just browser window
- **Audio**: Muted unless needed for narration
- **Cursor visibility**: Enabled for better tracking

---

## 🗣️ Key Messages & Timing

### **Opening (30 seconds)**
> "I'll show you end-to-end SLDS2 component generation and testing with Cursor, Figma MCP, and Playwright."

### **Component Generation (2 minutes)**
> "Watch how Figma designs become SLDS2-compliant React components automatically."

### **Code Review (2 minutes)**
> "Notice the Lightning Design System 2 architecture: styling hooks, semantic structure, and accessibility."

### **Visual Testing (2 minutes)**
> "Playwright ensures pixel-perfect accuracy between Figma designs and rendered components."

### **Styling Hooks Demo (2 minutes)**
> "SLDS2's real power: runtime theming without touching code."

### **Closing (30 seconds)**
> "From design to production-ready component in minutes, not hours."

---

## 📊 Success Metrics

### **Technical Success**
- [ ] All demos work without technical issues
- [ ] Performance is smooth (no lag/delays)
- [ ] Visual quality is high (clear screenshots)
- [ ] No error messages or failures

### **Audience Engagement**
- [ ] Clear demonstration of each capability
- [ ] Benefits are articulated clearly
- [ ] Questions are anticipated and addressed
- [ ] Call-to-action is clear

---

## ⚠️ Common Pitfalls to Avoid

### **Technical Issues**
- ❌ Don't forget to start dev server before demo
- ❌ Don't run tests while dev server is starting
- ❌ Don't skip the pre-demo test run
- ❌ Don't demo with unstable internet connection

### **Presentation Issues**
- ❌ Don't spend too much time on code details
- ❌ Don't skip the business value explanation
- ❌ Don't forget to show the end result first
- ❌ Don't demo features that aren't working

### **Timing Issues**
- ❌ Don't rush through the styling hooks demo
- ❌ Don't spend too long on test output details
- ❌ Don't let technical issues consume demo time
- ❌ Don't go over 15 minutes total

---

## 🎬 Post-Demo Actions

### **Immediate Follow-up**
- [ ] Save any modified styling hook examples
- [ ] Export test report if requested
- [ ] Note any questions for follow-up
- [ ] Share demo repository link

### **Documentation**
- [ ] Update demo script based on experience
- [ ] Document any issues encountered
- [ ] Prepare FAQ based on audience questions
- [ ] Plan improvements for next demo

---

**✅ Demo Ready Status:**
- [ ] **All checklist items completed**
- [ ] **Backup plans prepared**
- [ ] **Timing rehearsed**
- [ ] **Key messages clear**

*Ready to showcase the future of design system component development!* 🚀