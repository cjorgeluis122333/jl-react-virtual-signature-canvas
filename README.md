# jl-react-virtual-signature-canvas ✍️

[![npm version](https://badge.fury.io/js/jl-react-virtual-signature-canvas.svg)](https://badge.fury.io/js/jl-react-virtual-signature-canvas)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**A modern, lightweight, and responsive electronic signature component for React applications.**

This repository is organized as a monorepo containing the main `jl-react-virtual-signature-canvas` library, an interactive documentation web application, and a real-time playground for testing signature configurations.

---

## 📁 Repository Structure

```text
jl-react-virtual-signature-canvas/
├── library/            # Core npm package (jl-react-virtual-signature-canvas)
├── documentation/      # Interactive documentation web application (ES / EN)
├── playground/         # Interactive signature testing playground
├── package.json        # Root workspace configuration
└── README.md           # Repository overview (this file)
```

| Directory | Description |
| :--- | :--- |
| **`library/`** | The published npm package source code (`jl-react-virtual-signature-canvas`). |
| **`documentation/`** | Full documentation app featuring live interactive examples, API guides, and language selection. |
| **`playground/`** | A sandbox environment to test pen color, stroke width, stabilization, and exports in real time. |

---

## ⚡ Quick Package Usage

To use `jl-react-virtual-signature-canvas` in your own React project, install it directly from npm:

```bash
npm install jl-react-virtual-signature-canvas
# or
yarn add jl-react-virtual-signature-canvas
```

### Basic Example

```tsx
import React, { useRef } from 'react';
import { SignatureCanvas, SignatureCanvasRef } from 'jl-react-virtual-signature-canvas';

export default function SignatureComponent() {
  const signatureRef = useRef<SignatureCanvasRef>(null);

  const handleClear = () => {
    signatureRef.current?.clear();
  };

  const handleSave = () => {
    if (signatureRef.current?.isEmpty()) {
      alert("Please provide a signature first!");
      return;
    }
    // Returns cropped Base64 image PNG
    const dataUrl = signatureRef.current?.toDataURL('image/png');
    console.log("Signature PNG Data:", dataUrl);
  };

  return (
    <div>
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
        <SignatureCanvas
          ref={signatureRef}
          width="100%"
          height={200}
          strokeColor="#0f172a"
          strokeWidth={3}
          stabilization={true}
          autoCrop={true}
        />
      </div>
      <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSave}>Save Signature</button>
      </div>
    </div>
  );
}
```

For complete API documentation, props, and advanced methods, refer to [`library/README.md`](./library/README.md) or open the interactive documentation app.

---

## 🛠️ Local Development & Monorepo Setup

If you want to contribute to the package or run the documentation/playground locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cjorgeluis122333/jl-react-virtual-signature-canvas.git
   cd jl-react-virtual-signature-canvas
   ```

2. **Install workspace dependencies:**
   ```bash
   npm install
   ```

3. **Start the local dev server:**
   ```bash
   npm run dev
   ```

---

## ✨ Features

- 📱 **Universal Device Support**: Native touch (`touchstart`, `touchmove`) and mouse drawing support.
- 🎨 **Full Styling Control**: Custom colors, stroke thickness, container width/height, and CSS/Tailwind classes.
- ✨ **Curve Stabilization**: Smart smoothing algorithm for clean digital signatures.
- ✂️ **Auto-Cropping**: Automatically trims whitespace margins on `toDataURL` export.
- ⏪ **Undo & Clear History**: Imperative methods (`clear()`, `undo()`, `isEmpty()`) accessible via React refs.
- 🛡️ **TypeScript Support**: Written natively in TypeScript with exported interfaces.

---

## 📄 License

[MIT](./library/README.md#license) © [jlcpabonisquierdo](https://github.com/cjorgeluis122333)
