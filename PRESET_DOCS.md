# Preset System Documentation

## Overview
Sistem preset ini memungkinkan Anda untuk:
- **Simpan konfigurasi berbeda** dalam presets
- **Bundle files** sesuai kebutuhan  
- **Tambah files kemudian** tanpa struktur yang kaku
- **Export/Import** presets untuk sharing

---

## 🚀 Quick Start

### Load the System
```javascript
// Browser
<script src="presets.js"></script>

// Node.js
const PresetSystem = require('./presets.js');
```

### Basic Operations

#### 1. View Semua Presets
```javascript
PresetSystem.listPresets();
// Output:
// [
//   { id: 'payment_stripe_standard', name: 'Stripe Standard Payment', ... },
//   { id: 'website_basic', name: 'Basic Website Bundle', ... }
// ]
```

#### 2. Get Specific Preset
```javascript
const preset = PresetSystem.getPreset('payment_stripe_standard');
console.log(preset);
```

#### 3. Get Files dari Preset
```javascript
const preset = PresetSystem.getPreset('website_full');
console.log(preset.files); 
// ['index.html', 'styles.css', 'script.js', 'api/pay.js', 'package.json']
```

#### 4. Create Preset Baru
```javascript
PresetSystem.createPreset('payment_custom_fees', {
    name: 'Custom Fee Structure',
    type: 'payment',
    config: {
        provider: 'stripe',
        fees: {
            fixed: 2.00,
            percentage: 0.04,
            serviceCharge: 0.05
        }
    },
    files: ['api/pay.js', 'script.js', 'index.html'],
    tags: ['payment', 'custom']
});
```

#### 5. Update Preset
```javascript
PresetSystem.updatePreset('payment_stripe_standard', {
    config: {
        fees: {
            percentage: 0.025  // Change to 2.5%
        }
    }
});
```

#### 6. Delete Preset (jika tidak perlu)
```javascript
PresetSystem.deletePreset('payment_stripe_standard');
```

---

## 📦 Bundle System

### View Bundles
```javascript
PresetSystem.listBundles();
// [
//   { id: 'development', name: 'Development Bundle', files: [...] },
//   { id: 'production', name: 'Production Bundle', files: [...] }
// ]
```

### Get Specific Bundle
```javascript
const bundle = PresetSystem.getBundle('production');
console.log(bundle.files);
```

### Create Custom Bundle
```javascript
PresetSystem.createBundle('testing_bundle', {
    name: 'Testing Bundle',
    description: 'Files needed for testing',
    files: ['index.html', 'script.js', 'styles.css', 'api/pay.js']
});
```

### Update Bundle
```javascript
PresetSystem.updateBundle('production', {
    files: ['index.html', 'styles.css', 'script.js', 'api/pay.js', 'package.json', 'CNAME']
});
```

---

## 🔍 Filtering & Search

### Get Presets by Type
```javascript
const paymentPresets = PresetSystem.getPresetsByType('payment');
const websitePresets = PresetSystem.getPresetsByType('website');
```

### View All Available Types
```javascript
PresetSystem.listPresets().forEach(p => {
    console.log(`${p.name} - Type: ${p.type}`);
});
```

---

## 💾 Export/Import

### Export Preset to JSON
```javascript
const json = PresetSystem.exportPreset('payment_stripe_standard');
console.log(json);
// Dapat disimpan ke file atau dikirim ke tempat lain
```

### Export Bundle to JSON
```javascript
const bundleJson = PresetSystem.exportBundle('production');
console.log(bundleJson);
```

### Get Complete Summary
```javascript
const summary = PresetSystem.getSummary();
console.log(summary);
// {
//   version: '1.0.0',
//   lastModified: '2025-05-10T...',
//   totalPresets: 4,
//   totalBundles: 3,
//   presets: [...],
//   bundles: [...]
// }
```

---

## 📋 Available Presets

### Payment Presets
- **payment_stripe_standard** - RM1 + 3% Stripe fee + 6% service charge

### Website Presets  
- **website_basic** - HTML, CSS, JS only
- **website_full** - Complete website with payment

### Checkout Flow
- **checkout_flow** - Cart → Payment → Confirmation

---

## 📋 Available Bundles

### development
- Complete project untuk development
- Includes: semua files

### production
- Optimized untuk production
- Excludes: cancel/success pages sementara (bisa ditambah)

### backup
- Full backup dari semua files

---

## 🎯 Use Cases

### Case 1: Edit Payment Fees
```javascript
// Get preset
const preset = PresetSystem.getPreset('payment_stripe_standard');

// Update fees
PresetSystem.updatePreset('payment_stripe_standard', {
    config: {
        fees: {
            fixed: 1.50,
            percentage: 0.035,
            serviceCharge: 0.07
        }
    }
});
```

### Case 2: Create Version Lain dari Payment
```javascript
// Copy existing preset
const original = PresetSystem.getPreset('payment_stripe_standard');

PresetSystem.createPreset('payment_stripe_v2', {
    name: 'Stripe Payment - Version 2',
    type: 'payment',
    config: {
        ...original.config,
        fees: { fixed: 2.00, percentage: 0.04 }
    },
    files: [...original.files, 'package.json'],
    tags: [...original.tags, 'v2']
});
```

### Case 3: Include New File Later
```javascript
// Get current files
const preset = PresetSystem.getPreset('checkout_flow');

// Add new file
PresetSystem.updatePreset('checkout_flow', {
    files: [...preset.files, 'email-notification.js']
});
```

### Case 4: Create Bundle untuk Client Delivery
```javascript
PresetSystem.createBundle('client_delivery_v1', {
    name: 'Client Delivery Package - V1',
    description: 'Production-ready files untuk client',
    files: [
        'index.html',
        'styles.css', 
        'script.js',
        'api/pay.js',
        'success.html',
        'cancel.html',
        'package.json',
        'README.md'
    ]
});
```

---

## 🔧 Advanced Usage

### Dynamically Load Files Based on Preset
```javascript
function loadPresetFiles(presetId) {
    const preset = PresetSystem.getPreset(presetId);
    if (!preset) {
        console.error(`Preset not found: ${presetId}`);
        return;
    }
    
    preset.files.forEach(file => {
        console.log(`Loading: ${file}`);
        // Load file dynamically
    });
}

loadPresetFiles('website_full');
```

### Get Configuration for Backend
```javascript
function getPaymentConfig(presetId = 'payment_stripe_standard') {
    const preset = PresetSystem.getPreset(presetId);
    return preset ? preset.config : null;
}

const config = getPaymentConfig();
console.log(config.fees); // { fixed: 1, percentage: 0.03, serviceCharge: 0.06 }
```

### Create Migration from One Preset to Another
```javascript
function migrateToNewPreset(oldPresetId, newPresetId) {
    const oldPreset = PresetSystem.getPreset(oldPresetId);
    const newPreset = PresetSystem.getPreset(newPresetId);
    
    console.log(`Migrating from ${oldPreset.name} to ${newPreset.name}`);
    console.log(`Old files: ${oldPreset.files}`);
    console.log(`New files: ${newPreset.files}`);
    
    // Handle differences
    return {
        toAdd: newPreset.files.filter(f => !oldPreset.files.includes(f)),
        toRemove: oldPreset.files.filter(f => !newPreset.files.includes(f))
    };
}
```

---

## 💡 Tips & Best Practices

1. **Version Your Presets** - Gunakan suffix seperti `_v1`, `_v2`
2. **Use Descriptive Names** - Nama preset harus jelas tujuannya
3. **Tag Presets** - Gunakan tags untuk easy filtering
4. **Document Changes** - Update `lastModified` automatically
5. **Validate Files** - Check file exists sebelum include dalam preset
6. **Backup Regularly** - Export presets ke JSON untuk safety
7. **Keep Related Files** - Group related files dalam bundle

---

## 📝 File Structure

```
preset-system/
├── presets.js          # Main system (PresetSystem object)
├── preset-config.js    # Configuration & examples (PresetConfig object)
├── PRESET_DOCS.md      # This file
└── Usage examples:
    ├── Create preset
    ├── Update preset
    ├── Bundle files
    └── Export/Import
```

---

## 🆘 Troubleshooting

### Preset tidak ditemukan
```javascript
if (!PresetSystem.getPreset('unknown_preset')) {
    console.log('Available presets:', PresetSystem.listPresets());
}
```

### Check last modified
```javascript
console.log(`Last modified: ${PresetSystem.lastModified}`);
```

### Verify bundle files
```javascript
const bundle = PresetSystem.getBundle('production');
console.log(`Bundle has ${bundle.files.length} files`);
```

---

## 🎓 Next Steps

1. **Add your custom presets** - Create presets sesuai kebutuhan Anda
2. **Test bundling** - Export & validate bundles
3. **Integrate with your workflow** - Use dalam development process
4. **Backup presets** - Export regularly untuk safety

---

**Last Updated**: May 10, 2025  
**System Version**: 1.0.0  
**Status**: Ready for Use ✅
