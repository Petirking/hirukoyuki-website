/**
 * Premium Apps Configuration & Reference
 * Quick lookup, templates, dan contoh penggunaan
 */

const PremiumAppsConfig = {
    /**
     * QUICK REFERENCE - Pricing Overview
     */
    pricingOverview: {
        monthly: {
            free: 'RM0',
            starter: 'RM29.99',
            professional: 'RM79.99',
            enterprise: 'RM299.99'
        },
        comparison: {
            'Max Products': {
                free: 5,
                starter: 50,
                professional: 500,
                enterprise: 'Unlimited'
            },
            'Max Orders': {
                free: 10,
                starter: 100,
                professional: 1000,
                enterprise: 'Unlimited'
            },
            'Storage': {
                free: '1 GB',
                starter: '5 GB',
                professional: '50 GB',
                enterprise: 'Unlimited'
            },
            'Support': {
                free: 'Community',
                starter: 'Email (24h)',
                professional: 'Priority Email (12h)',
                enterprise: 'Dedicated (4h)'
            }
        }
    },
    
    /**
     * Feature Categories Breakdown
     */
    categoryBreakdown: {
        analytics: {
            name: 'Analytics & Reporting',
            apps: ['advanced_analytics'],
            totalApps: 1,
            suggested_for: ['professional', 'enterprise']
        },
        inventory: {
            name: 'Inventory & Stock Management',
            apps: ['inventory_tracking'],
            totalApps: 1,
            suggested_for: ['professional', 'enterprise']
        },
        marketing: {
            name: 'Marketing & Customer Acquisition',
            apps: ['email_marketing', 'discount_management', 'social_integration'],
            totalApps: 3,
            suggested_for: ['starter', 'professional', 'enterprise']
        },
        payment: {
            name: 'Payment & Checkout',
            apps: ['payment_integration'],
            totalApps: 1,
            suggested_for: ['all_tiers']
        },
        integration: {
            name: 'Integrations',
            apps: ['api_access', 'shipping_integration'],
            totalApps: 2,
            suggested_for: ['professional', 'enterprise']
        },
        branding: {
            name: 'Branding & Customization',
            apps: ['custom_domain', 'white_label'],
            totalApps: 2,
            suggested_for: ['professional', 'enterprise']
        },
        team: {
            name: 'Team Management',
            apps: ['team_collaboration'],
            totalApps: 1,
            suggested_for: ['enterprise']
        },
        security: {
            name: 'Security & Compliance',
            apps: ['advanced_security'],
            totalApps: 1,
            suggested_for: ['enterprise']
        },
        support: {
            name: 'Customer Support',
            apps: ['customer_support', 'reviews_ratings'],
            totalApps: 2,
            suggested_for: ['all_tiers']
        }
    },
    
    /**
     * Tier Feature Matrix
     */
    tierMatrix: {
        free: [
            'basic_store_access',
            'view_products',
            'user_profile',
            'reviews_ratings',
            'payment_integration',
            'shipping_integration',
            'social_integration'
        ],
        starter: [
            'basic_store_access',
            'view_products',
            'user_profile',
            'basic_analytics',
            'order_management',
            'customer_list',
            'reviews_ratings',
            'payment_integration',
            'shipping_integration',
            'social_integration'
        ],
        professional: [
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
            'customer_support',
            'subscriptions',
            'reviews_ratings',
            'payment_integration',
            'shipping_integration',
            'social_integration'
        ],
        enterprise: [
            'ALL_PREMIUM_FEATURES',
            'white_label',
            'team_collaboration',
            'advanced_security',
            'mobile_app'
        ]
    },
    
    /**
     * App Details by ID - Quick Reference
     */
    appDetails: {
        advanced_analytics: {
            name: 'Advanced Analytics',
            category: 'analytics',
            minTier: 'professional',
            price: 'RM9.99/month',
            type: 'addon',
            setupTime: '5 minutes',
            ROI: 'High'
        },
        inventory_tracking: {
            name: 'Inventory Tracking',
            category: 'inventory',
            minTier: 'professional',
            price: 'RM14.99/month',
            type: 'addon',
            setupTime: '15 minutes',
            ROI: 'High'
        },
        email_marketing: {
            name: 'Email Marketing',
            category: 'marketing',
            minTier: 'professional',
            price: 'RM19.99/month',
            type: 'addon',
            setupTime: '10 minutes',
            ROI: 'Very High'
        },
        discount_management: {
            name: 'Discount Management',
            category: 'promotions',
            minTier: 'professional',
            price: 'RM12.99/month',
            type: 'addon',
            setupTime: '5 minutes',
            ROI: 'Very High'
        },
        api_access: {
            name: 'API Access',
            category: 'integration',
            minTier: 'professional',
            price: 'RM24.99/month',
            type: 'addon',
            setupTime: 'Variable',
            ROI: 'High'
        },
        custom_domain: {
            name: 'Custom Domain',
            category: 'branding',
            minTier: 'professional',
            price: 'RM4.99/month',
            type: 'addon',
            setupTime: '10 minutes',
            ROI: 'Medium'
        },
        white_label: {
            name: 'White Label',
            category: 'branding',
            minTier: 'enterprise',
            price: 'RM49.99/month',
            type: 'addon',
            setupTime: '1-2 hours',
            ROI: 'High'
        },
        team_collaboration: {
            name: 'Team Collaboration',
            category: 'team',
            minTier: 'enterprise',
            price: 'RM29.99/month',
            type: 'addon',
            setupTime: '30 minutes',
            ROI: 'Medium'
        },
        advanced_security: {
            name: 'Advanced Security',
            category: 'security',
            minTier: 'enterprise',
            price: 'RM39.99/month',
            type: 'addon',
            setupTime: '20 minutes',
            ROI: 'High'
        },
        mobile_app: {
            name: 'Mobile Store App',
            category: 'mobile',
            minTier: 'professional',
            price: 'RM99.99/month',
            type: 'addon',
            status: 'coming_soon',
            setupTime: '2-3 hours',
            ROI: 'Very High'
        }
    },
    
    /**
     * Common Upgrade Paths
     */
    upgradePaths: {
        freeToPro: {
            description: 'From Free to Professional',
            from: 'free',
            to: 'professional',
            cost: 79.99,
            reasons: [
                'Need inventory management',
                'Want to run marketing campaigns',
                'Need API integration',
                'Need advanced analytics'
            ],
            recommendedAddons: ['email_marketing', 'inventory_tracking']
        },
        
        starterToPro: {
            description: 'From Starter to Professional',
            from: 'starter',
            to: 'professional',
            cost: 50.00,
            reasons: [
                'Business is growing',
                'Need advanced analytics',
                'Need inventory control',
                'Want to automate marketing'
            ],
            recommendedAddons: ['advanced_analytics', 'discount_management']
        },
        
        proToEnterprise: {
            description: 'From Professional to Enterprise',
            from: 'professional',
            to: 'enterprise',
            cost: 220.00,
            reasons: [
                'Need team management',
                'Want white label solution',
                'Need advanced security',
                'Need dedicated support'
            ],
            recommendedAddons: ['mobile_app', 'api_access']
        }
    },
    
    /**
     * Recommended Bundles per Business Size
     */
    businessRecommendations: {
        startup: {
            tier: 'starter',
            bundles: ['starter_boost'],
            reasoning: 'Cost-effective with essential marketing tools',
            monthlyBudget: 'RM59.98',
            features: 'Analytics, Discounts, Support'
        },
        
        smallBusiness: {
            tier: 'professional',
            bundles: ['professional_plus'],
            reasoning: 'Complete toolkit for growing business',
            monthlyBudget: 'RM169.98',
            features: 'Analytics, Inventory, Marketing, API, Support'
        },
        
        mediumBusiness: {
            tier: 'professional',
            addons: ['advanced_analytics', 'inventory_tracking', 'email_marketing', 'api_access', 'customer_support'],
            reasoning: 'Comprehensive solution for established business',
            monthlyBudget: 'RM164.95',
            features: 'All professional features + advanced add-ons'
        },
        
        enterprise: {
            tier: 'enterprise',
            bundles: ['all'],
            reasoning: 'Complete enterprise solution',
            monthlyBudget: 'RM299.99+',
            features: 'Everything + unlimited scalability'
        }
    },
    
    /**
     * Usage Examples
     */
    examples: {
        getTierInfo: `
const tier = PremiumAppsSystem.getTier('professional');
console.log(tier.name);      // "Professional Plan"
console.log(tier.price);     // 79.99
console.log(tier.features);  // ['advanced_analytics', 'inventory_tracking', ...]
        `,
        
        listAllApps: `
const allApps = PremiumAppsSystem.listApps();
allApps.forEach(app => {
    console.log(\`\${app.name} - \${app.category}\`);
});
        `,
        
        getAppsByCategory: `
const marketingApps = PremiumAppsSystem.getAppsByCategory('marketing');
console.log(marketingApps);
// Returns all marketing-related apps
        `,
        
        getAvailableAddons: `
const addons = PremiumAppsSystem.getAvailableAddons('starter');
// Shows which add-ons are available for Starter tier members
console.log(addons.map(a => a.name));
        `,
        
        getPricingSummary: `
const pricing = PremiumAppsSystem.getPricingSummary('professional', [
    'advanced_analytics',
    'customer_support'
]);
console.log(pricing.total);  // Total monthly cost
        `,
        
        listBundles: `
const bundles = PremiumAppsSystem.listBundles();
bundles.forEach(bundle => {
    console.log(\`\${bundle.name} - Save RM\${bundle.savings}\`);
});
        `
    },
    
    /**
     * Status Legend
     */
    statusLegend: {
        'available': 'Ready to use now',
        'coming_soon': 'Will be available soon',
        'beta': 'Beta testing phase',
        'deprecated': 'No longer supported',
        'maintenance': 'Currently under maintenance'
    },
    
    /**
     * Support Levels
     */
    supportLevels: {
        community: {
            name: 'Community Support',
            responseTime: 'N/A',
            channels: ['Community Forum', 'Documentation'],
            price: 'Free'
        },
        email: {
            name: 'Email Support',
            responseTime: '24 hours',
            channels: ['Email'],
            price: 'Included in Starter'
        },
        priority_email: {
            name: 'Priority Email Support',
            responseTime: '12 hours',
            channels: ['Email', 'Priority Queue'],
            price: 'Included in Professional'
        },
        dedicated: {
            name: 'Dedicated Support',
            responseTime: '4 hours',
            channels: ['Email', 'Phone', 'Live Chat', 'Dedicated Manager'],
            price: 'Included in Enterprise'
        }
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PremiumAppsConfig;
}
