/**
 * Premium Apps System - Comprehensive Listing Framework
 * Base structure untuk premium features, tiers, dan apps
 * Siap untuk perubahan kemudian
 */

const PremiumAppsSystem = {
    version: '1.0.0',
    lastModified: new Date().toISOString(),
    
    // Premium Tiers/Levels
    tiers: {
        free: {
            id: 'tier_free',
            name: 'Free Tier',
            price: 0,
            currency: 'MYR',
            billingPeriod: 'one-time',
            description: 'Basic access dengan fitur terbatas',
            features: [
                'basic_store_access',
                'view_products',
                'user_profile'
            ],
            limitations: {
                maxProducts: 5,
                maxOrders: 10,
                storageGB: 1,
                supportLevel: 'community'
            },
            active: true
        },
        
        starter: {
            id: 'tier_starter',
            name: 'Starter Plan',
            price: 29.99,
            currency: 'MYR',
            billingPeriod: 'monthly',
            description: 'Sempurna untuk pemula bisnis online',
            features: [
                'basic_store_access',
                'view_products',
                'user_profile',
                'basic_analytics',
                'order_management',
                'customer_list'
            ],
            limitations: {
                maxProducts: 50,
                maxOrders: 100,
                storageGB: 5,
                supportLevel: 'email',
                supportResponseTime: '24 hours'
            },
            stripe_price_id: null, // Akan diisi nanti
            active: true
        },
        
        professional: {
            id: 'tier_professional',
            name: 'Professional Plan',
            price: 79.99,
            currency: 'MYR',
            billingPeriod: 'monthly',
            description: 'Untuk bisnis berkembang dengan fitur lengkap',
            features: [
                'basic_store_access',
                'view_products',
                'user_profile',
                'advanced_analytics',
                'order_management',
                'customer_list',
                'inventory_tracking',
                'discount_management',
                'email_marketing',
                'api_access',
                'custom_domain'
            ],
            limitations: {
                maxProducts: 500,
                maxOrders: 1000,
                storageGB: 50,
                supportLevel: 'priority_email',
                supportResponseTime: '12 hours'
            },
            stripe_price_id: null,
            active: true
        },
        
        enterprise: {
            id: 'tier_enterprise',
            name: 'Enterprise Plan',
            price: 299.99,
            currency: 'MYR',
            billingPeriod: 'monthly',
            description: 'Solusi enterprise dengan customization penuh',
            features: [
                'basic_store_access',
                'view_products',
                'user_profile',
                'advanced_analytics',
                'order_management',
                'customer_list',
                'inventory_tracking',
                'discount_management',
                'email_marketing',
                'api_access',
                'custom_domain',
                'white_label',
                'team_collaboration',
                'advanced_security',
                'dedicated_account_manager',
                'custom_integrations'
            ],
            limitations: {
                maxProducts: 'unlimited',
                maxOrders: 'unlimited',
                storageGB: 'unlimited',
                supportLevel: 'dedicated',
                supportResponseTime: '4 hours'
            },
            stripe_price_id: null,
            active: true
        }
    },
    
    // Premium Features/Apps
    premiumApps: {
        // Analytics & Reporting
        advanced_analytics: {
            id: 'advanced_analytics',
            name: 'Advanced Analytics',
            category: 'analytics',
            description: 'Laporan penjualan dan statistik mendalam',
            minTier: 'professional',
            icon: 'chart-line',
            status: 'available',
            features: [
                'Sales Dashboard',
                'Revenue Charts',
                'Customer Behavior Analysis',
                'Product Performance',
                'Conversion Tracking',
                'Export Reports'
            ],
            pricing: { standalone: 9.99, type: 'addon' }
        },
        
        // Inventory Management
        inventory_tracking: {
            id: 'inventory_tracking',
            name: 'Inventory Tracking',
            category: 'inventory',
            description: 'Sistem manajemen stok real-time',
            minTier: 'professional',
            icon: 'boxes',
            status: 'available',
            features: [
                'Stock Level Monitoring',
                'Low Stock Alerts',
                'Inventory History',
                'Multi-warehouse Support',
                'SKU Management',
                'Barcode Integration'
            ],
            pricing: { standalone: 14.99, type: 'addon' }
        },
        
        // Marketing Tools
        email_marketing: {
            id: 'email_marketing',
            name: 'Email Marketing',
            category: 'marketing',
            description: 'Campaign email dan newsletter automation',
            minTier: 'professional',
            icon: 'envelope',
            status: 'available',
            features: [
                'Email Templates',
                'Automation Workflow',
                'Subscriber Management',
                'A/B Testing',
                'Delivery Reports',
                'Segmentation'
            ],
            pricing: { standalone: 19.99, type: 'addon' }
        },
        
        // Discount & Promotion
        discount_management: {
            id: 'discount_management',
            name: 'Discount Management',
            category: 'promotions',
            description: 'Kelola kupon, diskon, dan promosi',
            minTier: 'professional',
            icon: 'tag',
            status: 'available',
            features: [
                'Coupon Generator',
                'Bulk Discounts',
                'Flash Sales',
                'Seasonal Promotions',
                'Referral Programs',
                'Loyalty Points'
            ],
            pricing: { standalone: 12.99, type: 'addon' }
        },
        
        // API Access
        api_access: {
            id: 'api_access',
            name: 'API Access',
            category: 'integration',
            description: 'Integrasi dengan sistem eksternal via API',
            minTier: 'professional',
            icon: 'plug',
            status: 'available',
            features: [
                'REST API',
                'Webhook Support',
                'Rate Limiting: 1000/hour',
                'API Documentation',
                'Developer Console',
                'API Keys Management'
            ],
            pricing: { standalone: 24.99, type: 'addon' }
        },
        
        // Custom Domain
        custom_domain: {
            id: 'custom_domain',
            name: 'Custom Domain',
            category: 'branding',
            description: 'Domain sendiri untuk toko online',
            minTier: 'professional',
            icon: 'globe',
            status: 'available',
            features: [
                'Custom Domain Setup',
                'SSL Certificate',
                'DNS Management',
                'Domain Forwarding',
                'Email Forwarding',
                'Subdomain Support'
            ],
            pricing: { standalone: 4.99, type: 'addon' }
        },
        
        // White Label
        white_label: {
            id: 'white_label',
            name: 'White Label Solution',
            category: 'branding',
            description: 'Branding penuh dengan logo dan warna sendiri',
            minTier: 'enterprise',
            icon: 'paintbrush',
            status: 'available',
            features: [
                'Custom Branding',
                'Logo Upload',
                'Color Customization',
                'Custom CSS',
                'Remove Platform Branding',
                'Custom Email Templates'
            ],
            pricing: { standalone: 49.99, type: 'addon' }
        },
        
        // Team Collaboration
        team_collaboration: {
            id: 'team_collaboration',
            name: 'Team Collaboration',
            category: 'team',
            description: 'Kelola tim dengan role dan permission',
            minTier: 'enterprise',
            icon: 'users',
            status: 'available',
            features: [
                'Multi-user Access',
                'Role Management',
                'Permission Control',
                'Activity Logs',
                'Team Workspace',
                'Unlimited Team Members'
            ],
            pricing: { standalone: 29.99, type: 'addon' }
        },
        
        // Advanced Security
        advanced_security: {
            id: 'advanced_security',
            name: 'Advanced Security',
            category: 'security',
            description: '2FA, IP Whitelist, dan security monitoring',
            minTier: 'enterprise',
            icon: 'lock',
            status: 'available',
            features: [
                '2-Factor Authentication',
                'IP Whitelist',
                'Security Audits',
                'Data Encryption',
                'Backup Management',
                'Fraud Detection'
            ],
            pricing: { standalone: 39.99, type: 'addon' }
        },
        
        // Payment Gateway Integration
        payment_integration: {
            id: 'payment_integration',
            name: 'Multiple Payment Gateways',
            category: 'payment',
            description: 'Integrasi dengan berbagai payment gateway',
            minTier: 'starter',
            icon: 'credit-card',
            status: 'available',
            features: [
                'Stripe Integration',
                'PayPal Integration',
                'Bank Transfer',
                'E-Wallet (GCash, Grab Pay)',
                'Cryptocurrency',
                'Split Payment'
            ],
            pricing: { standalone: 0, type: 'included' }
        },
        
        // Social Media Integration
        social_integration: {
            id: 'social_integration',
            name: 'Social Media Integration',
            category: 'marketing',
            description: 'Share dan sell di social media',
            minTier: 'starter',
            icon: 'share-nodes',
            status: 'available',
            features: [
                'Facebook Shop Integration',
                'Instagram Shopping',
                'TikTok Shop',
                'Social Media Analytics',
                'Auto Post to Social',
                'Review Integration'
            ],
            pricing: { standalone: 0, type: 'included' }
        },
        
        // Customer Support
        customer_support: {
            id: 'customer_support',
            name: 'Multi-channel Support',
            category: 'support',
            description: 'Live chat, email, WhatsApp support',
            minTier: 'professional',
            icon: 'headset',
            status: 'available',
            features: [
                'Live Chat Widget',
                'WhatsApp Integration',
                'Email Support',
                'Ticket System',
                'Knowledge Base',
                'Chatbot Support'
            ],
            pricing: { standalone: 19.99, type: 'addon' }
        },
        
        // Mobile App
        mobile_app: {
            id: 'mobile_app',
            name: 'Mobile Store App',
            category: 'mobile',
            description: 'App mobile untuk iOS dan Android',
            minTier: 'professional',
            icon: 'mobile',
            status: 'coming_soon',
            features: [
                'iOS App',
                'Android App',
                'Push Notifications',
                'Offline Mode',
                'App Analytics',
                'App Customization'
            ],
            pricing: { standalone: 99.99, type: 'addon' }
        },
        
        // Subscription Management
        subscriptions: {
            id: 'subscriptions',
            name: 'Subscription Products',
            category: 'products',
            description: 'Jual produk dengan subscription recurring',
            minTier: 'professional',
            icon: 'refresh',
            status: 'available',
            features: [
                'Recurring Billing',
                'Subscription Management',
                'Auto-renewal',
                'Payment Retry',
                'Subscription Analytics',
                'Cancellation Management'
            ],
            pricing: { standalone: 14.99, type: 'addon' }
        },
        
        // Shipping Integration
        shipping_integration: {
            id: 'shipping_integration',
            name: 'Shipping Integration',
            category: 'logistics',
            description: 'Integrasi dengan courier dan tracking',
            minTier: 'starter',
            icon: 'truck',
            status: 'available',
            features: [
                'Real-time Rates',
                'Shipping Labels',
                'Package Tracking',
                'Multi-carrier Support',
                'Automatic Shipping Calculation',
                'Return Management'
            ],
            pricing: { standalone: 0, type: 'included' }
        },
        
        // Review & Rating System
        reviews_ratings: {
            id: 'reviews_ratings',
            name: 'Review & Rating System',
            category: 'customer_engagement',
            description: 'Customer reviews, ratings dan testimonial',
            minTier: 'free',
            icon: 'star',
            status: 'available',
            features: [
                'Product Reviews',
                'Star Ratings',
                'Photo Reviews',
                'Review Moderation',
                'Review Analytics',
                'Review Widgets'
            ],
            pricing: { standalone: 0, type: 'included' }
        }
    },
    
    // Add-on Bundles
    addOnBundles: {
        starter_boost: {
            id: 'starter_boost',
            name: 'Starter Boost Bundle',
            description: 'Recommended add-ons untuk tier Starter',
            price: 29.99,
            apps: [
                'advanced_analytics',
                'discount_management',
                'customer_support'
            ],
            savings: 5.98
        },
        
        professional_plus: {
            id: 'professional_plus',
            name: 'Professional Plus Bundle',
            description: 'All advanced features untuk tier Professional',
            price: 89.99,
            apps: [
                'advanced_analytics',
                'inventory_tracking',
                'email_marketing',
                'api_access',
                'customer_support'
            ],
            savings: 19.95
        },
        
        marketing_essentials: {
            id: 'marketing_essentials',
            name: 'Marketing Essentials Bundle',
            description: 'Focus on marketing dan customer acquisition',
            price: 49.99,
            apps: [
                'email_marketing',
                'discount_management',
                'customer_support'
            ],
            savings: 6.97
        },
        
        operations_pro: {
            id: 'operations_pro',
            name: 'Operations Pro Bundle',
            description: 'Untuk efisiensi operasional bisnis',
            price: 54.99,
            apps: [
                'inventory_tracking',
                'advanced_analytics',
                'api_access'
            ],
            savings: 9.97
        }
    },
    
    // Premium App Categories
    categories: {
        analytics: {
            id: 'analytics',
            name: 'Analytics & Reporting',
            icon: 'chart',
            apps: ['advanced_analytics']
        },
        inventory: {
            id: 'inventory',
            name: 'Inventory & Stock',
            icon: 'boxes',
            apps: ['inventory_tracking']
        },
        marketing: {
            id: 'marketing',
            name: 'Marketing & Growth',
            icon: 'megaphone',
            apps: ['email_marketing', 'discount_management', 'social_integration']
        },
        integration: {
            id: 'integration',
            name: 'Integration & API',
            icon: 'plug',
            apps: ['api_access', 'payment_integration', 'shipping_integration', 'social_integration']
        },
        branding: {
            id: 'branding',
            name: 'Branding & Design',
            icon: 'paintbrush',
            apps: ['custom_domain', 'white_label']
        },
        team: {
            id: 'team',
            name: 'Team & Collaboration',
            icon: 'users',
            apps: ['team_collaboration']
        },
        security: {
            id: 'security',
            name: 'Security & Compliance',
            icon: 'lock',
            apps: ['advanced_security']
        },
        support: {
            id: 'support',
            name: 'Customer Support',
            icon: 'headset',
            apps: ['customer_support']
        },
        mobile: {
            id: 'mobile',
            name: 'Mobile & Apps',
            icon: 'mobile',
            apps: ['mobile_app']
        },
        products: {
            id: 'products',
            name: 'Product Management',
            icon: 'package',
            apps: ['subscriptions']
        }
    },
    
    /**
     * Get tier info
     */
    getTier: function(tierId) {
        return this.tiers[tierId] || null;
    },
    
    /**
     * List all tiers
     */
    listTiers: function() {
        return Object.entries(this.tiers)
            .filter(([_, tier]) => tier.active)
            .map(([key, tier]) => ({
                id: key,
                name: tier.name,
                price: tier.price,
                billingPeriod: tier.billingPeriod,
                features: tier.features.length
            }));
    },
    
    /**
     * Get premium app
     */
    getApp: function(appId) {
        return this.premiumApps[appId] || null;
    },
    
    /**
     * List all premium apps
     */
    listApps: function() {
        return Object.entries(this.premiumApps).map(([key, app]) => ({
            id: key,
            name: app.name,
            category: app.category,
            minTier: app.minTier,
            status: app.status,
            pricing: app.pricing
        }));
    },
    
    /**
     * Get apps by category
     */
    getAppsByCategory: function(categoryId) {
        const category = this.categories[categoryId];
        if (!category) return [];
        return category.apps.map(appId => this.getApp(appId));
    },
    
    /**
     * Get apps included in tier
     */
    getAppsInTier: function(tierId) {
        const tier = this.getTier(tierId);
        if (!tier) return [];
        return tier.features.map(featureId => this.getApp(featureId)).filter(Boolean);
    },
    
    /**
     * Get available add-ons for tier
     */
    getAvailableAddons: function(tierId) {
        const tier = this.getTier(tierId);
        if (!tier) return [];
        
        const tierFeatures = tier.features;
        return Object.entries(this.premiumApps)
            .filter(([key, app]) => !tierFeatures.includes(key) && app.pricing.type === 'addon')
            .map(([key, app]) => ({ id: key, ...app }));
    },
    
    /**
     * Get bundle
     */
    getBundle: function(bundleId) {
        return this.addOnBundles[bundleId] || null;
    },
    
    /**
     * List all bundles
     */
    listBundles: function() {
        return Object.entries(this.addOnBundles).map(([key, bundle]) => ({
            id: key,
            name: bundle.name,
            price: bundle.price,
            appCount: bundle.apps.length,
            savings: bundle.savings
        }));
    },
    
    /**
     * Get pricing summary for tier + addons
     */
    getPricingSummary: function(tierId, addonIds = []) {
        const tier = this.getTier(tierId);
        if (!tier) return null;
        
        let totalPrice = tier.price;
        const addons = [];
        
        addonIds.forEach(addonId => {
            const app = this.getApp(addonId);
            if (app && app.pricing.type === 'addon') {
                totalPrice += app.pricing.standalone;
                addons.push(app);
            }
        });
        
        return {
            tier: tier.name,
            tierPrice: tier.price,
            addons: addons,
            addonsTotal: addons.reduce((sum, app) => sum + app.pricing.standalone, 0),
            total: totalPrice,
            billingPeriod: tier.billingPeriod,
            currency: tier.currency
        };
    },
    
    /**
     * Export tier to JSON
     */
    exportTier: function(tierId) {
        const tier = this.getTier(tierId);
        if (!tier) return null;
        return JSON.stringify(tier, null, 2);
    },
    
    /**
     * Export app to JSON
     */
    exportApp: function(appId) {
        const app = this.getApp(appId);
        if (!app) return null;
        return JSON.stringify(app, null, 2);
    },
    
    /**
     * Get complete system summary
     */
    getSummary: function() {
        return {
            version: this.version,
            lastModified: this.lastModified,
            totalTiers: Object.keys(this.tiers).length,
            totalApps: Object.keys(this.premiumApps).length,
            totalBundles: Object.keys(this.addOnBundles).length,
            totalCategories: Object.keys(this.categories).length,
            tiers: this.listTiers(),
            appsByCategory: Object.keys(this.categories).map(catId => ({
                category: this.categories[catId].name,
                apps: this.getAppsByCategory(catId).length
            }))
        };
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PremiumAppsSystem;
}
