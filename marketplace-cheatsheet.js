/**
 * Marketplace Apps - Quick Reference Cheat Sheet
 * Instant lookup untuk apps, prices, stock, dan operations
 */

const MarketplaceCheatSheet = {
    /**
     * COMPLETE APP LISTING WITH PRICES
     */
    quickLookup: {
        'Netflix 1M': { min: 22.99, max: 25.99, rating: 4.8, reviews: 4820, stock: 950 },
        'Netflix 3M': { min: 68.99, max: 70.99, rating: 4.7, reviews: 2340, stock: 500 },
        'YouTube Premium': { min: 12.99, max: 14.99, rating: 4.9, reviews: 5670, stock: 1550 },
        'Spotify Premium': { min: 10.99, max: 12.99, rating: 4.9, reviews: 7890, stock: 1750 },
        'Spotify Family': { min: 26.99, max: 28.99, rating: 4.8, reviews: 3210, stock: 570 },
        'Canva Pro': { min: 7.99, max: 9.99, rating: 4.7, reviews: 4320, stock: 2010 },
        'CapCut Premium': { min: 2.99, max: 4.99, rating: 4.6, reviews: 3450, stock: 2930 },
        'Telegram Premium': { min: 6.99, max: 8.99, rating: 4.5, reviews: 2890, stock: 5100 },
        'Adobe CC': { min: 27.99, max: 29.99, rating: 4.8, reviews: 2120, stock: 470 },
        'Microsoft 365': { min: 10.99, max: 11.99, rating: 4.6, reviews: 1890, stock: 900 },
        'Grammarly': { min: 5.99, max: 7.99, rating: 4.4, reviews: 1650, stock: 1440 },
        'NordVPN': { min: 4.99, max: 5.99, rating: 4.7, reviews: 2340, stock: 1340 }
    },
    
    /**
     * CHEAPEST PRICES (Updated)
     */
    cheapestPrices: {
        'CapCut Premium': 'RM2.99 🔥',
        'NordVPN': 'RM4.99',
        'Grammarly': 'RM5.99',
        'Telegram Premium': 'RM6.99',
        'Canva Pro': 'RM7.99',
        'Spotify Premium': 'RM10.99',
        'YouTube Premium': 'RM12.99',
        'Microsoft 365': 'RM10.99',
        'Netflix 1M': 'RM22.99',
        'Spotify Family': 'RM26.99',
        'Adobe CC': 'RM27.99',
        'Netflix 3M': 'RM68.99'
    },
    
    /**
     * BIGGEST DISCOUNTS
     */
    discounts: {
        'CapCut Premium': { discount: 57, from: 6.99, to: 2.99 },
        'NordVPN': { discount: 45, from: 10.99, to: 4.99 },
        'Canva Pro': { discount: 46, from: 14.99, to: 7.99 },
        'Grammarly': { discount: 50, from: 11.99, to: 5.99 },
        'Spotify Premium': { discount: 31, from: 15.99, to: 10.99 },
        'YouTube Premium': { discount: 27, from: 17.99, to: 12.99 }
    },
    
    /**
     * BEST STOCK LEVELS
     */
    highestStock: {
        'Telegram Premium': 5100,
        'CapCut Premium': 2930,
        'Canva Pro': 2010,
        'Spotify Premium': 1750,
        'YouTube Premium': 1550,
        'Grammarly': 1440,
        'NordVPN': 1340,
        'Microsoft 365': 900,
        'Netflix 1M': 950,
        'Spotify Family': 570,
        'Netflix 3M': 500,
        'Adobe CC': 470
    },
    
    /**
     * TOP RATED APPS
     */
    topRated: [
        { rank: 1, app: 'Spotify Premium', rating: 4.9, reviews: 7890 },
        { rank: 2, app: 'YouTube Premium', rating: 4.9, reviews: 5670 },
        { rank: 3, app: 'Netflix 1M', rating: 4.8, reviews: 4820 },
        { rank: 4, app: 'Spotify Family', rating: 4.8, reviews: 3210 },
        { rank: 5, app: 'Adobe CC', rating: 4.8, reviews: 2120 }
    ],
    
    /**
     * BY CATEGORY
     */
    byCategory: {
        'Streaming': ['Netflix 1M', 'Netflix 3M', 'YouTube Premium'],
        'Music': ['Spotify Premium', 'Spotify Family'],
        'Design': ['Canva Pro', 'Adobe CC'],
        'Video': ['CapCut Premium'],
        'Messaging': ['Telegram Premium'],
        'Productivity': ['Microsoft 365', 'Grammarly'],
        'VPN': ['NordVPN']
    },
    
    /**
     * POPULAR BUNDLES
     */
    bundles: {
        'Personal Streaming': {
            apps: ['Netflix 1M', 'YouTube Premium', 'Spotify Premium'],
            cheapestTotal: 48.97,
            savings: 'Save RM4-8',
            why: 'Complete entertainment setup'
        },
        
        'Family Pack': {
            apps: ['Netflix 3M', 'Spotify Family', 'YouTube Premium'],
            cheapestTotal: 109.97,
            savings: 'Save RM15-20',
            why: 'Perfect for family of 4-6'
        },
        
        'Creative Pro': {
            apps: ['Canva Pro', 'Adobe CC', 'CapCut Premium'],
            cheapestTotal: 39.97,
            savings: 'Save RM10-15',
            why: 'Complete design & video toolkit'
        },
        
        'Student Essentials': {
            apps: ['Spotify Premium', 'Microsoft 365', 'Grammarly'],
            cheapestTotal: 29.97,
            savings: 'Save RM6-10',
            why: 'Study + entertainment combo'
        },
        
        'Business Tools': {
            apps: ['Microsoft 365', 'Adobe CC', 'NordVPN'],
            cheapestTotal: 47.97,
            savings: 'Save RM10-15',
            why: 'Professional productivity suite'
        }
    },
    
    /**
     * DELIVERY DETAILS
     */
    delivery: {
        'All apps': {
            type: 'Instant code',
            time: '5-10 minutes max',
            method: 'Email redemption code',
            activation: 'Immediate after redemption',
            guarantee: '100% code validity'
        }
    },
    
    /**
     * CATEGORY PRICING RANGES
     */
    categoryPricing: {
        'Streaming & Entertainment': { min: 12.99, max: 70.99, avg: 37.99 },
        'Music': { min: 10.99, max: 28.99, avg: 19.99 },
        'Design & Graphics': { min: 7.99, max: 29.99, avg: 18.99 },
        'Video Editing': { min: 2.99, max: 4.99, avg: 3.99 },
        'Messaging': { min: 6.99, max: 8.99, avg: 7.99 },
        'Productivity': { min: 5.99, max: 11.99, avg: 8.99 },
        'VPN & Security': { min: 4.99, max: 5.99, avg: 5.49 }
    },
    
    /**
     * SUPPLIER RATINGS
     */
    suppliers: {
        'Official Provider': { rating: 4.9, reviews: 2450, country: 'Malaysia' },
        'Local Digital Store': { rating: 4.8, reviews: 1560, country: 'Malaysia' },
        'Premium Reseller Asia': { rating: 4.7, reviews: 1230, country: 'Singapore' },
        'Digital Codes Hub': { rating: 4.6, reviews: 890, country: 'Thailand' }
    },
    
    /**
     * COMMON QUESTIONS
     */
    faq: {
        'How long to receive code': '5-10 minutes via email',
        'Can I refund': 'Yes, 7-day money-back guarantee',
        'Are codes legit': 'Yes, 100% verified from official sources',
        'Can I share account': 'Check app terms, some allow family sharing',
        'How to redeem': 'Go to app website, login, paste code in account settings',
        'What if code doesn\'t work': 'Contact support within 30 days for replacement',
        'Any region restrictions': 'Most global, some may have region limits',
        'Do I need VPN': 'Usually not needed, some apps offer VPN option'
    },
    
    /**
     * VOLUME DISCOUNTS (For Resellers)
     */
    volumeDiscounts: {
        '5-10 units': 'Contact for bulk pricing',
        '10-50 units': '5% discount',
        '50-100 units': '10% discount',
        '100+ units': 'Custom pricing available'
    },
    
    /**
     * QUICK METRICS
     */
    metrics: {
        'Total Apps': 12,
        'Total Categories': 7,
        'Suppliers': 4,
        'Average Rating': 4.68,
        'Total Stock': 26680,
        'Price Range': 'RM2.99 - RM29.99',
        'Cheapest App': 'CapCut Premium (RM2.99)',
        'Most Stock': 'Telegram Premium (5100 units)',
        'Most Popular': 'Spotify Premium (9.4/10)',
        'Best Discount': 'CapCut Premium (57% off)'
    },
    
    /**
     * TRENDING THIS MONTH
     */
    trending: {
        'Most Searches': ['Netflix', 'Spotify', 'YouTube Premium'],
        'Most Purchases': ['Spotify Premium', 'CapCut Premium', 'YouTube Premium'],
        'Growing Interest': ['Adobe Creative Cloud', 'Canva Pro', 'Microsoft 365'],
        'New Additions': 'Check back weekly for updates'
    },
    
    /**
     * UTILITY CALCULATOR
     */
    calculator: {
        'Annual Netflix': '1M × 12 = RM275.88 (approx)',
        'Annual Spotify': '1M × 12 = RM131.88 (approx)',
        'Yearly Streaming Bundle': 'Netflix + Spotify + YouTube ≈ RM587.64',
        'Monthly vs Annual': 'Buy annual plans = 14-17% savings',
        'Team Plan': 'Spotify Family = 5x cheaper per person'
    },
    
    /**
     * FEATURES COMPARISON
     */
    features: {
        'Netflix': ['Ultra 4K', 'Offline download', '4 devices', 'No ads'],
        'Spotify': ['Ad-free', 'Offline', 'High quality', 'Skip unlimited'],
        'YouTube': ['No ads', 'Offline', 'Background play', 'YouTube Original'],
        'Canva': ['Templates unlimited', 'Premium elements', 'Background remover'],
        'CapCut': ['No watermark', 'Premium effects', 'Cloud storage'],
        'Adobe': ['All apps', '100GB storage', 'Fonts library', 'Priority support'],
        'Microsoft 365': ['Office apps', '1TB OneDrive', 'Family sharing']
    },
    
    /**
     * PAYMENT INFO
     */
    payment: {
        'Methods': ['Credit Card', 'Debit Card', 'Bank Transfer', 'E-Wallet', 'PayPal', 'Crypto'],
        'Processing': '5-30 seconds',
        'Fee': 'No extra fees',
        'Currency': 'MYR (Malaysian Ringgit)',
        'Minimum': 'No minimum order'
    },
    
    /**
     * QUICK COPY PRICES
     */
    copyPrices: `
CapCut Premium:    RM2.99
NordVPN:           RM4.99
Grammarly:         RM5.99
Telegram:          RM6.99
Canva Pro:         RM7.99
Microsoft 365:     RM10.99
Spotify Premium:   RM10.99
YouTube Premium:   RM12.99
Netflix (1M):      RM22.99
Spotify Family:    RM26.99
Adobe CC:          RM27.99
Netflix (3M):      RM68.99
    `,
    
    /**
     * UTILITY FUNCTIONS
     */
    utils: {
        'getRandomApp': () => {
            const apps = Object.keys(this.quickLookup);
            return apps[Math.floor(Math.random() * apps.length)];
        },
        
        'getTotalValue': (appNames) => {
            let total = 0;
            appNames.forEach(name => {
                if (this.cheapestPrices[name]) {
                    const price = parseFloat(this.cheapestPrices[name].replace('RM', '').replace('🔥', ''));
                    total += price;
                }
            });
            return total.toFixed(2);
        },
        
        'isCheapest': (price) => {
            return price <= 5.00;
        },
        
        'getBestDeal': () => {
            return 'CapCut Premium - RM2.99 (57% discount)';
        }
    },
    
    /**
     * EXPORT SUMMARY
     */
    getSummary: function() {
        return {
            'Total Premium Apps': 12,
            'Active Categories': 7,
            'Verified Suppliers': 4,
            'Average Rating': '4.68 ⭐',
            'Total Stock': '26,680 units',
            'Price Range': 'RM2.99 - RM29.99',
            'Delivery Time': '5-10 minutes',
            'Money-back Guarantee': '7 days',
            'Customer Support': '24/7'
        };
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MarketplaceCheatSheet;
}
