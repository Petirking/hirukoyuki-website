/**
 * Premium Apps System - Quick Reference Cheat Sheet
 * Fast lookup untuk common queries
 */

const PremiumAppsCheatSheet = {
    /**
     * QUICK PRICING LOOKUP
     */
    pricing: {
        tiers: {
            free: 0,
            starter: 29.99,
            professional: 79.99,
            enterprise: 299.99
        },
        
        addons: {
            advanced_analytics: 9.99,
            inventory_tracking: 14.99,
            email_marketing: 19.99,
            discount_management: 12.99,
            api_access: 24.99,
            custom_domain: 4.99,
            customer_support: 19.99,
            subscriptions: 14.99,
            mobile_app: 99.99,
            white_label: 49.99,
            team_collaboration: 29.99,
            advanced_security: 39.99
        }
    },
    
    /**
     * QUICK FEATURE LOOKUP
     */
    features: {
        'by_tier': {
            'free': {
                count: 7,
                list: ['store', 'products', 'profile', 'reviews', 'payment', 'shipping', 'social']
            },
            'starter': {
                count: 10,
                list: ['store', 'products', 'profile', 'basic_analytics', 'orders', 'customers', 'reviews', 'payment', 'shipping', 'social']
            },
            'professional': {
                count: 17,
                list: ['store', 'products', 'profile', 'advanced_analytics', 'orders', 'customers', 'inventory', 'discounts', 'email', 'api', 'domain', 'support', 'subscriptions', 'reviews', 'payment', 'shipping', 'social']
            },
            'enterprise': {
                count: 24,
                list: ['ALL_FEATURES']
            }
        }
    },
    
    /**
     * WHAT'S IN EACH TIER
     */
    tierLimits: {
        free: { products: 5, orders: 10, storage: '1 GB', support: 'Community' },
        starter: { products: 50, orders: 100, storage: '5 GB', support: 'Email 24h' },
        professional: { products: 500, orders: 1000, storage: '50 GB', support: 'Priority 12h' },
        enterprise: { products: 'Unlimited', orders: 'Unlimited', storage: 'Unlimited', support: 'Dedicated 4h' }
    },
    
    /**
     * APP REFERENCE BY CATEGORY
     */
    appsByCategory: {
        'analytics': ['advanced_analytics'],
        'inventory': ['inventory_tracking'],
        'marketing': ['email_marketing', 'discount_management'],
        'integration': ['api_access', 'shipping_integration'],
        'branding': ['custom_domain', 'white_label'],
        'team': ['team_collaboration'],
        'security': ['advanced_security'],
        'support': ['customer_support', 'reviews_ratings'],
        'mobile': ['mobile_app'],
        'products': ['subscriptions'],
        'included': ['payment_integration', 'social_integration', 'shipping_integration', 'reviews_ratings']
    },
    
    /**
     * MINIMUM TIER REQUIRED
     */
    minTierRequired: {
        'advanced_analytics': 'professional',
        'inventory_tracking': 'professional',
        'email_marketing': 'professional',
        'discount_management': 'professional',
        'api_access': 'professional',
        'custom_domain': 'professional',
        'customer_support': 'professional',
        'subscriptions': 'professional',
        'mobile_app': 'professional',
        'white_label': 'enterprise',
        'team_collaboration': 'enterprise',
        'advanced_security': 'enterprise'
    },
    
    /**
     * QUICK COST CALCULATIONS
     */
    quickCalcs: {
        'starter_vs_free': 29.99,
        'professional_vs_starter': 50.00,
        'enterprise_vs_professional': 220.00,
        'all_addons_for_starter': {
            'individual': 144.93,
            'with_starter_boost': 59.98
        },
        'all_addons_for_professional': {
            'individual': 234.91,
            'with_professional_plus': 89.99
        }
    },
    
    /**
     * POPULAR COMBINATIONS
     */
    popularCombos: {
        'starter_essentials': {
            tier: 'starter (29.99)',
            addons: 'starter_boost (29.99)',
            total: 59.98,
            includes: ['advanced_analytics', 'discount_management', 'customer_support']
        },
        
        'professional_complete': {
            tier: 'professional (79.99)',
            addons: 'professional_plus (89.99)',
            total: 169.98,
            includes: ['advanced_analytics', 'inventory_tracking', 'email_marketing', 'api_access', 'customer_support']
        },
        
        'growth_focused': {
            tier: 'professional (79.99)',
            addons: 'marketing_essentials (49.99)',
            total: 129.98,
            includes: ['email_marketing', 'discount_management', 'customer_support']
        },
        
        'operations_focused': {
            tier: 'professional (79.99)',
            addons: 'operations_pro (54.99)',
            total: 134.98,
            includes: ['inventory_tracking', 'advanced_analytics', 'api_access']
        }
    },
    
    /**
     * WHEN TO UPGRADE
     */
    upgradeConditions: {
        'free_to_starter': [
            'Need more than 5 products',
            'Want to track more orders',
            'Need basic analytics',
            'Want customer management'
        ],
        'starter_to_professional': [
            'Revenue > RM5,000/month',
            'Have more than 50 products',
            'Need inventory management',
            'Want marketing automation',
            'Need API integration'
        ],
        'professional_to_enterprise': [
            'Revenue > RM50,000/month',
            'Need team collaboration',
            'Want white label solution',
            'Need enterprise security',
            'Need dedicated support'
        ]
    },
    
    /**
     * COMMON QUESTIONS & ANSWERS
     */
    faq: {
        'What do I get free': 'Basic store, products, profile, reviews, payment, shipping, social',
        'Can I try before buying': 'Free tier allows up to 5 products and 10 orders',
        'Can I switch tiers anytime': 'Yes, pro-rated billing applied',
        'Can I cancel anytime': 'Yes, no long-term contracts required',
        'Is setup fee included': 'No setup fees, you pay based on usage',
        'What payment methods': 'Credit card via Stripe (all tiers)',
        'Do I get support': 'Yes, level depends on tier selected',
        'Can I use multiple stores': 'Contact support for multi-store licensing'
    },
    
    /**
     * RECOMMENDED FOR BUSINESS TYPE
     */
    recommendedForBusiness: {
        'dropshipper': {
            tier: 'starter',
            why: 'Low product costs, order management',
            cost: 'RM29.99'
        },
        'reseller': {
            tier: 'professional',
            addons: ['inventory_tracking', 'discount_management'],
            why: 'Inventory control, discounts, analytics',
            cost: 'RM109.97'
        },
        'brand_owner': {
            tier: 'professional',
            addons: ['email_marketing', 'custom_domain', 'social_integration'],
            why: 'Marketing, branding, customer engagement',
            cost: 'RM109.97'
        },
        'wholesale': {
            tier: 'professional',
            addons: ['api_access', 'inventory_tracking'],
            why: 'API for systems integration, inventory',
            cost: 'RM119.97'
        },
        'marketplace': {
            tier: 'enterprise',
            addons: 'all',
            why: 'Complete feature set, unlimited scale',
            cost: 'RM299.99+'
        }
    },
    
    /**
     * STATUS OF FEATURES
     */
    featureStatus: {
        'available': ['advanced_analytics', 'inventory_tracking', 'email_marketing', 'discount_management', 'api_access', 'custom_domain', 'customer_support', 'subscriptions', 'white_label', 'team_collaboration', 'advanced_security'],
        'coming_soon': ['mobile_app'],
        'beta': []
    },
    
    /**
     * SUPPORT RESPONSE TIMES
     */
    supportResponse: {
        'community': 'N/A (Forum based)',
        'email_24h': '24 hours (Starter)',
        'priority_12h': '12 hours (Professional)',
        'dedicated_4h': '4 hours (Enterprise)'
    },
    
    /**
     * USEFUL FORMULAS
     */
    formulas: {
        'total_monthly_cost': 'tier_price + sum(addon_prices)',
        'yearly_cost': 'monthly_cost * 12',
        'daily_cost': 'monthly_cost / 30',
        'cost_per_order': 'monthly_cost / number_of_orders',
        'ROI_threshold': 'monthly_cost * 2 (break-even)',
        'upgrade_payoff': 'new_monthly_cost / (revenue_increase_per_month)',
        'addon_bundle_savings': 'sum(individual_prices) - bundle_price'
    },
    
    /**
     * INTEGRATION CHECKLIST
     */
    integrationChecklist: {
        'setup_store': ['Payment', 'Shipping', 'Social Media'],
        'launch_with_marketing': ['Email Marketing', 'Discount Management', 'Customer Support'],
        'scale_operations': ['Inventory Tracking', 'Advanced Analytics', 'API Access'],
        'enterprise_ready': ['White Label', 'Team Collaboration', 'Advanced Security']
    },
    
    /**
     * UTILITY FUNCTIONS
     */
    utils: {
        'getMonthlyBudget': (tier) => {
            const tierPrices = { free: 0, starter: 29.99, professional: 79.99, enterprise: 299.99 };
            return tierPrices[tier] || 'Unknown tier';
        },
        
        'getYearlyBudget': (tier) => {
            const tierPrices = { free: 0, starter: 29.99, professional: 79.99, enterprise: 299.99 };
            return (tierPrices[tier] || 0) * 12;
        },
        
        'suggestTier': (estimatedOrders) => {
            if (estimatedOrders <= 10) return 'free';
            if (estimatedOrders <= 100) return 'starter';
            if (estimatedOrders <= 1000) return 'professional';
            return 'enterprise';
        },
        
        'suggestAddons': (tier) => {
            const suggestions = {
                free: [],
                starter: ['advanced_analytics', 'discount_management', 'customer_support'],
                professional: ['customer_support'],
                enterprise: ['mobile_app']
            };
            return suggestions[tier] || [];
        }
    },
    
    /**
     * SUMMARY EXPORT
     */
    getSummary: function() {
        return {
            'total_tiers': 4,
            'total_apps': 18,
            'total_bundles': 4,
            'free_tier_features': 7,
            'max_addon_apps': 12,
            'base_price_range': 'RM0 - RM299.99',
            'addon_price_range': 'RM4.99 - RM99.99',
            'most_popular_tier': 'Professional',
            'most_popular_addon': 'Email Marketing',
            'avg_enterprise_cost': 'RM400-500+/month'
        };
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PremiumAppsCheatSheet;
}
