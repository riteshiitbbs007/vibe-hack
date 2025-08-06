# 🎥 **Demo Recording Setup Guide**
## Technical Configuration for Professional Demo Recording

---

## 🛠️ **Pre-Recording Setup**

### **1. Environment Preparation**
```bash
# Ensure all services are running
cd /Users/ritesh.kumar2/Documents/vibe2hack

# Start the development server
npm run dev

# Verify Figma MCP is ready
# - Open Figma
# - Select the Badge Success component (Node: 12537_109385)
# - Ensure Cursor is connected to Figma MCP

# Verify SLDS2 Metadata API is accessible
curl -s https://design-systems-metadata-28384bb587d8.herokuapp.com/ | head -n 10
```

### **2. Browser Setup**
- **Clean Chrome/Safari session**: No extra tabs or extensions visible
- **Window size**: 1920x1080 or higher for crisp recording
- **Zoom level**: 100% (no browser zoom)
- **DevTools**: Prepared but closed initially
- **URL**: `http://localhost:3001/` bookmarked and ready

### **3. Figma Preparation**
- **Component Selected**: ⚡ Badge - Success (Node: 12537_109385)
- **Figma Desktop App**: Open and ready
- **Design Panel**: Component properties visible
- **MCP Connection**: Verified in Cursor

### **4. Cursor Setup**
- **Chat Panel**: Open and ready
- **Command Ready**: `@figma Generate SLDS2 compliant Badge Success component from selected design`
- **File Explorer**: Collapsed for clean view
- **Terminal**: Available but hidden initially

---

## 🎬 **Recording Configuration**

### **Screen Recording Settings**
- **Resolution**: 1920x1080 minimum (4K preferred)
- **Frame Rate**: 30 FPS minimum (60 FPS for smooth transitions)
- **Audio**: High-quality microphone for voiceover
- **Format**: MP4 H.264 for compatibility

### **Recording Software Options**
1. **Loom**: For quick, shareable demos
2. **OBS Studio**: For professional multi-source recording
3. **QuickTime Player**: For Mac users, simple and effective
4. **Screen Studio**: For polished, professional demos with automatic zoom

### **Window Management**
- **Full Screen**: Dedicate entire screen to browser
- **No Distractions**: Hide dock, menu bar, notifications
- **Clean Desktop**: Minimal background, professional appearance

---

## 🎯 **Demo Flow Checklist**

### **Scene 1: Opening (5 seconds)**
- [ ] Navigate to `http://localhost:3001/`
- [ ] Show status badges (all green checkmarks)
- [ ] Highlight the professional interface
- [ ] Point out "Figma MCP Ready" and "SLDS2 Metadata API" status

### **Scene 2: Figma Integration Demo (10 seconds)**
- [ ] Switch to Figma (or picture-in-picture)
- [ ] Show selected Badge Success component
- [ ] Highlight design properties (colors, spacing, typography)
- [ ] Switch to Cursor chat panel
- [ ] Execute: `@figma Generate SLDS2 compliant Badge Success component from selected design`
- [ ] Show real-time code generation

### **Scene 3: SLDS2 Generator (15 seconds)**
- [ ] Click "SLDS2 Component Generator" tab
- [ ] Show metadata status: "✅ SLDS2 metadata ready"
- [ ] Highlight "Official SLDS2 Metadata API" link
- [ ] Click "Quick: Success Badge" button
- [ ] Show instant component generation
- [ ] Demonstrate live preview updating

### **Scene 4: Component Preview (15 seconds)**
- [ ] Navigate to Component Preview
- [ ] Show "Preview" tab with live components
- [ ] Demonstrate different variants (Default, Strong, Subtle)
- [ ] Show interactive features (click badges)
- [ ] Click "Code" tab to show implementation
- [ ] Highlight SLDS2 styling hooks and Figma integration
- [ ] Click "SLDS2 Compliance" tab
- [ ] Show compliance validation and metadata details

### **Scene 5: Validation (10 seconds)**
- [ ] Click "SLDS Linter Integration" tab
- [ ] Show real compliance data (not simulated)
- [ ] Highlight SARIF reports and validation results
- [ ] Show styling hooks validation

### **Scene 6: Playwright Testing (10 seconds)**
- [ ] Click "Playwright MCP Testing" tab
- [ ] Show browser automation controls
- [ ] Execute navigation to demo
- [ ] Take screenshot for comparison
- [ ] Show visual validation tools

### **Scene 7: Full Showcase (5 seconds)**
- [ ] Click "SLDS2 Badge Success Demo" tab
- [ ] Show complete component library
- [ ] Demonstrate all variants and features
- [ ] Highlight enterprise configuration
- [ ] Show accessibility features

---

## 📊 **Quality Checkpoints**

### **Visual Quality**
- [ ] All text is crisp and readable
- [ ] Colors display accurately
- [ ] No visual glitches or loading states
- [ ] Smooth transitions between tabs
- [ ] Consistent UI responsiveness

### **Functional Verification**
- [ ] SLDS2 metadata loads successfully
- [ ] Component generation works instantly
- [ ] All badge variants render correctly
- [ ] Interactive features respond properly
- [ ] Playwright MCP controls function
- [ ] All tabs contain meaningful content

### **Content Verification**
- [ ] Figma node ID matches: 12537_109385
- [ ] Colors are exact: #acf3e4, #056764
- [ ] Typography shows: SF Pro, 12px, 17px line-height
- [ ] SLDS2 hooks display correctly
- [ ] Code examples are complete and accurate

---

## 🎤 **Voiceover Script (60 seconds)**

### **Opening (8 seconds)**
> "Meet the future of design-to-code workflows. Starting with a Figma design, we'll generate a production-ready SLDS2 component in under 60 seconds, complete with validation and testing."

### **Generation (20 seconds)**
> "With Cursor's Figma MCP, I extract the exact design specifications from our selected Badge component. The generator automatically fetches official SLDS2 metadata from Salesforce's source of truth, mapping every color, font, and spacing to official styling hooks. Watch as the component generates with pixel-perfect fidelity."

### **Validation (20 seconds)**
> "But we don't stop at generation. The component automatically validates against Lightning Design System standards using integrated SLDS linting. Then Playwright MCP tests the result against the original Figma design with automated visual regression testing."

### **Conclusion (12 seconds)**
> "The result? A production-ready component with guaranteed SLDS2 compliance, enterprise features, accessibility, and zero manual coding. This is design-to-code evolution."

---

## 🔧 **Technical Troubleshooting**

### **Common Issues & Solutions**

1. **Figma MCP Not Connected**
   ```bash
   # Restart Cursor
   # Reopen Figma
   # Ensure component is selected
   ```

2. **SLDS2 Metadata Not Loading**
   ```bash
   # Check network connection
   # Verify API endpoint accessibility
   # Clear browser cache if needed
   ```

3. **Component Not Generating**
   ```bash
   # Refresh browser
   # Check console for errors
   # Verify all services running
   ```

4. **Playwright MCP Issues**
   ```bash
   # Ensure browser is installed
   # Check port 3001 accessibility
   # Restart services if needed
   ```

### **Backup Plans**
- Have screenshots ready for each major step
- Pre-record component generation if live demo fails
- Prepare static examples as fallback
- Test entire flow multiple times before recording

---

## 📈 **Success Metrics**

### **Demo Effectiveness**
- [ ] Completes in under 60 seconds
- [ ] Shows real, not simulated, functionality
- [ ] Demonstrates clear business value
- [ ] Highlights technical sophistication
- [ ] Maintains professional appearance throughout

### **Technical Demonstration**
- [ ] Figma integration works seamlessly
- [ ] SLDS2 compliance is evident
- [ ] Generated code is production-ready
- [ ] Testing automation is visible
- [ ] All features function as expected

### **Audience Engagement**
- [ ] Clear narrative progression
- [ ] Impressive "wow" moments
- [ ] Practical business application
- [ ] Technical depth without complexity
- [ ] Memorable and shareable

---

## 🚀 **Post-Recording**

### **Editing Considerations**
- **Smooth Transitions**: Clean cuts between major sections
- **Zoom Effects**: Highlight important details (code, compliance)
- **Text Overlays**: Emphasize key points and benefits
- **Background Music**: Professional, subtle enhancement
- **Captions**: For accessibility and silent viewing

### **Distribution Formats**
- **Full Demo**: 60-second complete workflow
- **Component Clips**: Individual feature highlights
- **GIF Summaries**: Key moments for social sharing
- **Screenshot Collections**: Static presentation materials

---

*Ready to record the future of component generation!* 🎬