/**
 * Marketplace Apps Configuration & Reference
 * Quick lookup, templates, dan examples untuk marketplace
 */

const MarketplaceAppsConfig = {
    /**
     * QUICK PRICING REFERENCE
     */
    pricingReference: {
        allApps: {
            'Netflix (1M)': 'RM22.99 - RM25.99',
            'Netflix (3M)': 'RM68.99 - RM70.99',
            'YouTube Premium': 'RM12.99 - RM14.99',
            'Spotify Premium': 'RM10.99 - RM12.99',
            'Spotify Family': 'RM26.99 - RM28.99',
            'Canva Pro': 'RM7.99 - RM9.99',
            'CapCut Premium': 'RM2.99 - RM4.99',
            'Telegram Premium': 'RM6.99 - RM8.99',
            'Adobe Creative Cloud': 'RM27.99 - RM29.99',
            'Microsoft 365': 'RM10.99 - RM11.99',
            'Grammarly Premium': 'RM5.99 - RM7.99',
            'NordVPN': 'RM4.99 - RM5.99'
        },
        
        cheapest: {
            'CapCut Premium': 'RM2.99',
            'NordVPN': 'RM4.99',
            'Grammarly Premium': 'RM5.99',
            'Telegram Premium': 'RM6.99',
            'Canva Pro': 'RM7.99',
            'Spotify Premium': 'RM10.99'
        },
        
        mostExpensive: {
            'Adobe Creative Cloud': 'RM29.99',
            'Netflix (3M)': 'RM70.99',
            'Netflix (1M)': 'RM25.99',
            'YouTube Premium': 'RM14.99',
            'Spotify Family': 'RM28.99'
        }
    },
    
    /**
     * Apps by Category
     */
    appsByCategory: {
        'streaming_entertainment': {
            apps: ['Netflix (1 Month)', 'Netflix (3 Months)', 'YouTube Premium'],
            avgPrice: 'RM21.99',
            count: 3
        },
        'music': {
            apps: ['Spotify Premium', 'Spotify Family'],
            avgPrice: 'RM20.99',
            count: 2
        },
        'design_graphics': {
            apps: ['Canva Pro', 'Adobe Creative Cloud'],
            avgPrice: 'RM19.99',
            count: 2
        },
        'video_editing': {
            apps: ['CapCut Premium'],
            avgPrice: 'RM3.99',
            count: 1
        },
        'messaging': {
            apps: ['Telegram Premium'],
            avgPrice: 'RM7.99',
            count: 1
        },
        'productivity': {
            apps: ['Microsoft 365', 'Grammarly Premium'],
            avgPrice: 'RM9.49',
            count: 2
        },
        'vpn_security': {
            apps: ['NordVPN'],
            avgPrice: 'RM4.99',
            count: 1
        }
    },
    
    /**
     * Stock Levels (Real-time)
     */
    stockLevels: {
        netflix_1month: { total: 950, available: 950, lowStock: false },
        netflix_3months: { total: 500, available: 500, lowStock: false },
        youtube_premium_1month: { total: 1550, available: 1550, lowStock: false },
        spotify_premium_1month: { total: 1750, available: 1750, lowStock: false },
        spotify_family_1month: { total: 570, available: 570, lowStock: false },
        canva_pro_1month: { total: 2010, available: 2010, lowStock: false },
        capcut_premium_1month: { total: 2930, available: 2930, lowStock: false },
        telegram_premium: { total: 5100, available: 5100, lowStock: false },
        adobe_creative_cloud_1month: { total: 470, available: 470, lowStock: false },
        microsoft_365_1month: { total: 900, available: 900, lowStock: false },
        grammarly_premium_1month: { total: 1440, available: 1440, lowStock: false },
        nordvpn_1month: { total: 1340, available: 1340, lowStock: false }
    },
    
    /**
     * Popular Apps (Top 5)
     */
    topApps: {
        'By Popularity': [
            { rank: 1, app: 'Spotify Premium', score: 9.4, users: '7890 reviews' },
            { rank: 2, app: 'YouTube Premium', score: 9.2, users: '5670 reviews' },
            { rank: 3, app: 'Netflix (1M)', score: 9.5, users: '4820 reviews' },
            { rank: 4, app: 'Adobe Creative Cloud', score: 8.7, users: '2120 reviews' },
            { rank: 5, app: 'Spotify Family', score: 8.9, users: '3210 reviews' }
        ],
        
        'By Rating': [
            { rank: 1, app: 'Netflix (1M)', rating: 4.8, reviews: '4820' },
            { rank: 2, app: 'Spotify Premium', rating: 4.9, reviews: '7890' },
            { rank: 3, app: 'YouTube Premium', rating: 4.9, reviews: '5670' },
            { rank: 4, app: 'Canva Pro', rating: 4.7, reviews: '4320' },
            { rank: 5, app: 'Grammarly Premium', rating: 4.4, reviews: '1650' }
        ],
        
        'By Stock Level': [
            { rank: 1, app: 'Telegram Premium', stock: 5100 },
            { rank: 2, app: 'CapCut Premium', stock: 2930 },
            { rank: 3, app: 'Canva Pro', stock: 2010 },
            { rank: 4, app: 'Spotify Premium', stock: 1750 },
            { rank: 5, app: 'YouTube Premium', stock: 1550 }
        ]
    },
    
    /**
     * Supplier Comparison
     */
    suppliers: {
        'Official Provider': {
            country: 'Malaysia',
            verified: true,
            rating: 4.9,
            reviews: 2450,
            avgApps: 10,
            reliability: 'Highest'
        },
        'Premium Reseller Asia': {
            country: 'Singapore',
            verified: true,
            rating: 4.7,
            reviews: 1230,
            avgApps: 8,
            reliability: 'High'
        },
        'Digital Codes Hub': {
            country: 'Thailand',
            verified: true,
            rating: 4.6,
            reviews: 890,
            avgApps: 7,
            reliability: 'Medium'
        },
        'Local Digital Store': {
            country: 'Malaysia',
            verified: true,
            rating: 4.8,
            reviews: 1560,
            avgApps: 9,
            reliability: 'Very High'
        }
    },
    
    /**
     * Common Use Cases
     */
    useCases: {
        'Personal Streaming': {
            apps: ['Netflix (1M)', 'YouTube Premium', 'Spotify Premium'],
            totalCost: 'RM48.97 - RM52.97',
            savings: 'RM4-8'
        },
        
        'Family Entertainment': {
            apps: ['Netflix (3M)', 'Spotify Family', 'YouTube Premium'],
            totalCost: 'RM109.97 - RM113.97',
            savings: 'RM15-20'
        },
        
        'Creative Professional': {
            apps: ['Canva Pro', 'Adobe Creative Cloud', 'CapCut Premium'],
            totalCost: 'RM39.97 - RM43.97',
            savings: 'RM10-15'
        },
        
        'Student Bundle': {
            apps: ['Spotify Premium', 'Microsoft 365', 'Grammarly Premium'],
            totalCost: 'RM29.97 - RM31.97',
            savings: 'RM6-10'
        },
        
        'Business Bundle': {
            apps: ['Microsoft 365', 'Adobe Creative Cloud', 'NordVPN'],
            totalCost: 'RM47.97 - RM50.97',
            savings: 'RM10-15'
        }
    },
    
    /**
     * Discounts & Deals
     */
    discounts: {
        'Netflix 1M': { discount: 30, original: 32.99, current: 22.99 },
        'YouTube Premium': { discount: 27, original: 17.99, current: 12.99 },
        'Spotify Premium': { discount: 31, original: 15.99, current: 10.99 },
        'Canva Pro': { discount: 46, original: 14.99, current: 7.99 },
        'CapCut Premium': { discount: 57, original: 6.99, current: 2.99 },
        'NordVPN': { discount: 45, original: 10.99, current: 4.99 }
    },
    
    /**
     * What's Trending
     */
    trending: {
        'This Week': [
            'Netflix (3 Months)',
            'Spotify Family',
            'Adobe Creative Cloud'
        ],
        'This Month': [
            'YouTube Premium',
            'Spotify Premium',
            'Canva Pro'
        ],
        'All Time': [
            'Spotify Premium',
            'Netflix (1 Month)',
            'YouTube Premium'
        ]
    },
    
    /**
     * Delivery Information
     */
    delivery: {
        'Instant Delivery': {
            apps: 'All apps',
            deliveryTime: '5-10 minutes',
            method: 'Instant redemption code',
            requirement: 'Valid email + payment'
        },
        'Activation Steps': [
            '1. Purchase the app code',
            '2. Receive code within 5 minutes',
            '3. Visit app official website',
            '4. Redeem code in account settings',
            '5. Enjoy premium features'
        ]
    },
    
    /**
     * Quality Assurance
     */
    qualityAssurance: {
        'Code Validity': '100% guaranteed',
        'Refund Policy': '7 days money-back guarantee',
        'Support': '24/7 customer support',
        'Verification': 'All codes verified before delivery',
        'Warranty': '30-day code replacement if unused'
    },
    
    /**
     * Payment Methods
     */
    paymentMethods: [
        'Credit Card (Visa, Mastercard)',
        'Debit Card',
        'Bank Transfer',
        'E-Wallet (GCash, GrabPay)',
        'PayPal',
        'Cryptocurrency'
    ],
    
    /**
     * Usage Examples
     */
    examples: {
        listApps: `
PremiumAppsMarketplace.listApps();
// Returns all active apps with basic info
        `,
        
        getApp: `
const app = PremiumAppsMarketplace.getApp('spotify_premium_1month');
console.log(app.appName);      // "Spotify Premium"
console.log(app.plan);         // "1 Month"
console.log(app.pricing);      // All pricing options
        `,
        
        getCheapestPrice: `
const cheapest = PremiumAppsMarketplace.getCheapestPrice('netflix_1month');
console.log(cheapest.price);   // RM22.99
console.log(cheapest.discount); // 30%
        `,
        
        searchApps: `
const results = PremiumAppsMarketplace.searchApps('spotify');
// Returns all Spotify related apps
        `,
        
        getPopular: `
const popular = PremiumAppsMarketplace.getPopularApps(5);
// Returns top 5 most popular apps
        `,
        
        getByCategory: `
const streaming = PremiumAppsMarketplace.getAppsByCategory('streaming');
// Returns all streaming apps
        `
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MarketplaceAppsConfig;
}
