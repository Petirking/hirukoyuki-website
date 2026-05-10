/**
 * Preset Configuration Manager
 * Simple interface untuk manage presets dan bundles
 */

const PresetConfig = {
    /**
     * QUICK START - Contoh penggunaan
     */
    examples: {
        // Get preset
        getPreset: `const preset = PresetSystem.getPreset('payment_stripe_standard');`,
        
        // List semua presets
        listAll: `PresetSystem.listPresets();`,
        
        // Create preset baru
        createNew: `
PresetSystem.createPreset('payment_custom', {
    name: 'Custom Payment Preset',
    type: 'payment',
    config: { /* your config */ },
    files: ['api/pay.js', 'script.js'],
    tags: ['payment', 'custom']
});`,
        
        // Update preset
        update: `
PresetSystem.updatePreset('payment_stripe_standard', {
    config: {
        percentage: 0.05  // Change from 3% to 5%
    }
});`,
        
        // Get bundle
        getBundle: `const bundle = PresetSystem.getBundle('production');`,
        
        // Export as JSON
        export: `
const json = PresetSystem.exportPreset('payment_stripe_standard');
console.log(json);`
    },
    
    /**
     * Template untuk preset baru
     */
    templates: {
        payment: {
            name: 'Your Preset Name',
            type: 'payment',
            config: {
                provider: 'stripe',
                fees: {
                    fixed: 0,
                    percentage: 0,
                    serviceCharge: 0
                },
                currency: 'myr'
            },
            files: ['api/pay.js', 'script.js'],
            tags: ['payment']
        },
        
        website: {
            name: 'Your Website Preset',
            type: 'website',
            config: {
                includeStyles: true,
                includeScripts: true,
                responsive: true
            },
            files: ['index.html', 'styles.css', 'script.js'],
            tags: ['website']
        },
        
        checkout: {
            name: 'Your Checkout Preset',
            type: 'checkout',
            config: {
                steps: [],
                paymentMethods: [],
                successPage: 'success.html',
                cancelPage: 'cancel.html'
            },
            files: [],
            tags: ['checkout']
        },
        
        bundle: {
            name: 'Your Bundle Name',
            description: 'Bundle description',
            files: [],
            createdAt: new Date().toISOString()
        }
    },
    
    /**
     * Current available files dalam project
     */
    availableFiles: {
        pages: ['index.html', 'success.html', 'cancel.html'],
        scripts: ['script.js'],
        styles: ['styles.css'],
        api: ['api/pay.js'],
        config: ['package.json', '.env'],
        docs: ['README.md', 'CNAME']
    },
    
    /**
     * Kategori untuk file grouping
     */
    categories: {
        frontend: ['index.html', 'styles.css', 'script.js'],
        payment: ['api/pay.js', 'script.js'],
        fullstack: ['index.html', 'styles.css', 'script.js', 'api/pay.js', 'package.json'],
        checkout: ['success.html', 'cancel.html', 'script.js'],
        documentation: ['README.md', 'package.json']
    },
    
    /**
     * Suggestion untuk files yang sering diminta
     */
    commonRequests: {
        'payment_setup': {
            description: 'Setup payment processing',
            recommendedFiles: ['api/pay.js', 'script.js', 'package.json'],
            relatedPreset: 'payment_stripe_standard'
        },
        
        'website_update': {
            description: 'Update website content/styles',
            recommendedFiles: ['index.html', 'styles.css', 'script.js'],
            relatedPreset: 'website_basic'
        },
        
        'deployment': {
            description: 'Prepare for deployment',
            recommendedFiles: ['index.html', 'styles.css', 'script.js', 'api/pay.js', 'package.json', 'CNAME'],
            relatedPreset: 'production'
        },
        
        'backup': {
            description: 'Full project backup',
            recommendedFiles: ['index.html', 'styles.css', 'script.js', 'api/pay.js', 'package.json', 'success.html', 'cancel.html', 'README.md', 'CNAME'],
            relatedPreset: 'backup'
        }
    }
};

// Export untuk Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PresetConfig;
}
