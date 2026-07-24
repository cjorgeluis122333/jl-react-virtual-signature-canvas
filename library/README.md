# jl-react-virtual-signature-canvas ✍️

[![npm version](https://badge.fury.io/js/jl-react-virtual-signature-canvas.svg)](https://badge.fury.io/js/jl-react-virtual-signature-canvas)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**The best electronic signature component for React (React Signature Component / Signature Pad).**

A lightweight, modern, and highly customizable React library for capturing virtual signatures (e-signatures), ideal for forms, contracts, invoices, or any workflow that requires drawing a digital signature. Includes native support for touch devices (mobiles and tablets) and mouse, advanced stroke stabilization, auto-cropping, and responsive design.

If you are looking for how to implement an **electronic signature in React**, a **React signature pad**, or a **React signature canvas**, this is the simplest and most complete solution.

## 📦 Installation

Install the package using your favorite package manager:

```bash
npm install jl-react-virtual-signature-canvas
# or
yarn add jl-react-virtual-signature-canvas
```

## ✨ Key Features (React Signature Pad Features)

- 📱 **Touch & Mouse Support**: Smooth and optimized drawing events for mobile, tablet, and desktop (`touchstart`, `touchmove`, `mousedown`, etc.).
- 🎨 **Highly Customizable**: Freely configure ink color, stroke width, size, and CSS styles or Tailwind classes to match your application's design.
- ✨ **Stroke Stabilization (Smooth Draw)**: Integrated smart algorithm to smooth drawing, giving a natural and professional look to the digital signature.
- ✂️ **Auto-Cropping (Auto-Crop)**: Automatically extracts only the signature without annoying white margins, ideal for saving lightweight, optimized images.
- ⏪ **Undo & Clear**: Built-in methods to easily undo the last stroke or clear the entire canvas.
- 🛡️ **TypeScript Ready**: Written entirely in TypeScript, providing full autocompletion and strict typing for your React component.

## 🚀 Real Example: How to implement an electronic signature in React (Contract Form)

Below is a real-world practical example: a contract agreement form where the user enters their name and signature before submitting.

```tsx
import React, { useRef, useState } from 'react';
import { SignatureCanvas, SignatureCanvasRef } from 'jl-react-virtual-signature-canvas';

export default function ContractForm() {
  const signatureRef = useRef<SignatureCanvasRef>(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (signatureRef.current?.isEmpty()) {
      setError("Please provide your signature in the box.");
      return;
    }

    // Get automatically cropped signature in Base64 format (transparent PNG)
    const signatureImage = signatureRef.current?.toDataURL('image/png');
    
    // Here you would typically send 'name' and 'signatureImage' to your backend / API
    console.log("Name:", name);
    console.log("Base64 Signature:", signatureImage);
    
    alert("Contract successfully signed and submitted!");
  };

  const handleClear = () => {
    signatureRef.current?.clear();
    setError('');
  };

  const handleUndo = () => {
    signatureRef.current?.undo();
    setError('');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h2>Contract Signature</h2>
      <p>Please review the contract and sign below to accept the terms.</p>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name:</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }}
            placeholder="e.g. John Doe"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Signature:</label>
          {/* Canvas Container */}
          <div style={{ border: '2px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f8fafc' }}>
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
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={handleUndo} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f1f5f9', cursor: 'pointer' }}>Undo last stroke</button>
            <button type="button" onClick={handleClear} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #fecaca', backgroundColor: '#fef2f2', color: '#ef4444', cursor: 'pointer' }}>Clear all</button>
          </div>
        </div>

        {error && <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '15px', fontWeight: '500' }}>{error}</p>}

        <button 
          type="submit" 
          style={{ width: '100%', padding: '12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Sign and Submit
        </button>
      </form>
    </div>
  );
}
```

## API Reference (Props)

The `<SignatureCanvas />` component accepts the following properties for full customization:

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `width` | `number \| string` | `'100%'` | Main container width (e.g., `500` or `'100%'`). |
| `height` | `number \| string` | `'100%'` | Main container height (e.g., `300` or `'100%'`). |
| `strokeColor` | `string` | `'#000000'` | Ink stroke color (hex, rgb, etc.). |
| `strokeWidth` | `number` | `3` | Pen stroke thickness. |
| `stabilization`| `boolean` | `true` | Enables curve stabilization for smoother strokes. |
| `autoCrop` | `boolean` | `false` | If `true`, `toDataURL` will automatically crop empty margins. |
| `style` | `React.CSSProperties` | `{...}` | Styles to apply to the main `div` container. |
| `className` | `string` | `''` | Additional CSS classes for the main container. Useful when using Tailwind CSS. |
| `canvasStyle` | `React.CSSProperties` | `undefined` | Styles to apply directly to the HTML `<canvas>` element. |
| `canvasClassName`| `string` | `''` | Additional CSS classes for the `<canvas>` element. |
| `onDrawStart` | `() => void` | `undefined` | Callback executed when drawing begins (touch/mouse down). |
| `onDrawEnd` | `() => void` | `undefined` | Callback executed when a stroke ends (touch/mouse up). |
| `onUndoStateChange`| `(canUndo: boolean) => void`| `undefined` | Useful to enable/disable your "Undo" button depending on whether strokes exist. |

## Methods (Ref)

Through the `ref` attribute passed to the component, you can access the following imperative methods:

- **`clear()`**: Clears the entire canvas and resets the stroke history.
- **`undo()`**: Undoes the last drawn stroke.
- **`isEmpty()`**: Returns `true` if the canvas is completely empty (nothing drawn).
- **`toDataURL(type?: string, quality?: any)`**: Returns the signature in Base64 format (Data URI). If `autoCrop={true}`, the image will be automatically cropped without white margins. Example: `toDataURL('image/png')`.
- **`getTrimmedCanvas()`**: Returns the native `HTMLCanvasElement` of the cropped signature. Useful if you need to process the canvas yourself (e.g., to create a Blob and upload to Storage).

## License

MIT
