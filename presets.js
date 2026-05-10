/**
 * Presets System - Flexible bundling and configuration management
 * Supports editing, bundling, and including files as needed
 */

// Core preset structure
const PresetSystem = {
    version: '1.0.0',
    lastModified: new Date().toISOString(),
    
    // Available presets
    presets: {
        payment_stripe_standard: {
            name: 'Stripe Standard Payment',
            type: 'payment',
            config: {
                provider: 'stripe',
                fees: {
                    fixed: 1.00,
                    percentage: 0.03,
                    serviceCharge: 0.06
                },
                currency: 'myr',
                description: 'RM1 + 3% Stripe fee + 6% service charge'
            },
            files: ['api/pay.js', 'script.js'],
            tags: ['payment', 'stripe', 'fees']
        },
        
        website_basic: {
            name: 'Basic Website Bundle',
            type: 'website',
            config: {
                includeStyles: true,
                includeScripts: true,
                responsive: true
            },
            files: ['index.html', 'styles.css', 'script.js'],
            tags: ['website', 'frontend', 'core']
        },
        
        website_full: {
            name: 'Full Website Bundle',
            type: 'website',
            config: {
                includeStyles: true,
                includeScripts: true,
                includePayment: true,
                responsive: true,
                seo: true
            },
            files: ['index.html', 'styles.css', 'script.js', 'api/pay.js', 'package.json'],
            tags: ['website', 'frontend', 'complete']
        },
        
        checkout_flow: {
            name: 'Checkout Flow Bundle',
            type: 'checkout',
            config: {
                steps: ['cart', 'payment', 'confirmation'],
                paymentMethods: ['stripe'],
                successPage: 'success.html',
                cancelPage: 'cancel.html'
            },
            files: ['script.js', 'styles.css', 'success.html', 'cancel.html', 'api/pay.js'],
            tags: ['checkout', 'payment', 'flow']
        }
    },
    
    // Bundle definitions
    bundles: {
        development: {
            name: 'Development Bundle',
            description: 'All files for local development',
            files: ['index.html', 'styles.css', 'script.js', 'package.json', 'api/pay.js', 'cancel.html', 'success.html', 'README.md'],
            createdAt: new Date().toISOString()
        },
        
        production: {
            name: 'Production Bundle',
            description: 'Optimized files for production',
            files: ['index.html', 'styles.css', 'script.js', 'api/pay.js', 'package.json'],
            createdAt: new Date().toISOString()
        },
        
        backup: {
            name: 'Full Backup Bundle',
            description: 'Complete project backup',
            files: ['index.html', 'styles.css', 'script.js', 'api/pay.js', 'package.json', 'cancel.html', 'success.html', 'README.md', 'CNAME'],
            createdAt: new Date().toISOString()
        }
    },
    
    /**
     * Get a specific preset
     * @param {string} presetName - Name of preset
     * @returns {object} Preset configuration
     */
    getPreset: function(presetName) {
        return this.presets[presetName] || null;
    },
    
    /**
     * List all available presets
     * @returns {array} Array of preset names and metadata
     */
    listPresets: function() {
        return Object.entries(this.presets).map(([key, preset]) => ({
            id: key,
            name: preset.name,
            type: preset.type,
            files: preset.files,
            tags: preset.tags
        }));
    },
    
    /**
     * Create new preset
     * @param {string} presetId - Unique preset ID
     * @param {object} presetData - Preset configuration
     * @returns {boolean} Success status
     */
    createPreset: function(presetId, presetData) {
        if (this.presets[presetId]) {
            console.warn(`Preset "${presetId}" already exists`);
            return false;
        }
        
        this.presets[presetId] = {
            ...presetData,
            createdAt: new Date().toISOString()
        };
        
        this.lastModified = new Date().toISOString();
        return true;
    },
    
    /**
     * Update existing preset
     * @param {string} presetId - Preset ID to update
     * @param {object} updates - Fields to update
     * @returns {boolean} Success status
     */
    updatePreset: function(presetId, updates) {
        if (!this.presets[presetId]) {
            console.warn(`Preset "${presetId}" not found`);
            return false;
        }
        
        this.presets[presetId] = {
            ...this.presets[presetId],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        
        this.lastModified = new Date().toISOString();
        return true;
    },
    
    /**
     * Delete preset
     * @param {string} presetId - Preset to delete
     * @returns {boolean} Success status
     */
    deletePreset: function(presetId) {
        if (!this.presets[presetId]) {
            console.warn(`Preset "${presetId}" not found`);
            return false;
        }
        
        delete this.presets[presetId];
        this.lastModified = new Date().toISOString();
        return true;
    },
    
    /**
     * Get bundle
     * @param {string} bundleName - Name of bundle
     * @returns {object} Bundle configuration
     */
    getBundle: function(bundleName) {
        return this.bundles[bundleName] || null;
    },
    
    /**
     * List all bundles
     * @returns {array} Array of bundle names and metadata
     */
    listBundles: function() {
        return Object.entries(this.bundles).map(([key, bundle]) => ({
            id: key,
            name: bundle.name,
            description: bundle.description,
            fileCount: bundle.files.length,
            files: bundle.files
        }));
    },
    
    /**
     * Create custom bundle
     * @param {string} bundleId - Unique bundle ID
     * @param {object} bundleData - Bundle configuration
     * @returns {boolean} Success status
     */
    createBundle: function(bundleId, bundleData) {
        if (this.bundles[bundleId]) {
            console.warn(`Bundle "${bundleId}" already exists`);
            return false;
        }
        
        this.bundles[bundleId] = {
            ...bundleData,
            createdAt: new Date().toISOString()
        };
        
        this.lastModified = new Date().toISOString();
        return true;
    },
    
    /**
     * Update bundle
     * @param {string} bundleId - Bundle to update
     * @param {object} updates - Fields to update
     * @returns {boolean} Success status
     */
    updateBundle: function(bundleId, updates) {
        if (!this.bundles[bundleId]) {
            console.warn(`Bundle "${bundleId}" not found`);
            return false;
        }
        
        this.bundles[bundleId] = {
            ...this.bundles[bundleId],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        
        this.lastModified = new Date().toISOString();
        return true;
    },
    
    /**
     * Export preset as JSON
     * @param {string} presetId - Preset to export
     * @returns {string} JSON string
     */
    exportPreset: function(presetId) {
        const preset = this.getPreset(presetId);
        if (!preset) return null;
        
        return JSON.stringify({
            id: presetId,
            ...preset,
            exportedAt: new Date().toISOString()
        }, null, 2);
    },
    
    /**
     * Export bundle as JSON
     * @param {string} bundleId - Bundle to export
     * @returns {string} JSON string
     */
    exportBundle: function(bundleId) {
        const bundle = this.getBundle(bundleId);
        if (!bundle) return null;
        
        return JSON.stringify({
            id: bundleId,
            ...bundle,
            exportedAt: new Date().toISOString()
        }, null, 2);
    },
    
    /**
     * Get all presets for a specific type
     * @param {string} type - Preset type filter
     * @returns {array} Array of matching presets
     */
    getPresetsByType: function(type) {
        return Object.entries(this.presets)
            .filter(([_, preset]) => preset.type === type)
            .map(([key, preset]) => ({ id: key, ...preset }));
    },
    
    /**
     * Get export summary
     * @returns {object} Summary of presets and bundles
     */
    getSummary: function() {
        return {
            version: this.version,
            lastModified: this.lastModified,
            totalPresets: Object.keys(this.presets).length,
            totalBundles: Object.keys(this.bundles).length,
            presets: this.listPresets(),
            bundles: this.listBundles()
        };
    }
};

// Export for Node.js and browsers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PresetSystem;
}
