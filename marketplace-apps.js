/**
 * Premium Apps Marketplace System - SIMPLIFIED
 * Jual apps premium: Netflix, YouTube, Spotify, CapCut, Canva, ChatGPT
 * 1 harga per app, stok dari supplier
 */

const PremiumAppsMarketplace = {
    version: '1.1.0',
    lastModified: new Date().toISOString(),
    currency: 'MYR',
    
    // Suppliers/Providers
    suppliers: {
        supplier_official: {
            id: 'supplier_official',
            name: 'Official Provider',
            country: 'Malaysia',
            verified: true,
            rating: 4.9,
            reviews: 2450
        },
        
        supplier_reseller_a: {
            id: 'supplier_reseller_a',
            name: 'Premium Reseller Asia',
            country: 'Singapore',
            verified: true,
            rating: 4.7,
            reviews: 1230
        },
        
        supplier_reseller_b: {
            id: 'supplier_reseller_b',
            name: 'Digital Codes Hub',
            country: 'Thailand',
            verified: true,
            rating: 4.6,
            reviews: 890
        },
        
        supplier_local: {
            id: 'supplier_local',
            name: 'Local Digital Store',
            country: 'Malaysia',
            verified: true,
            rating: 4.8,
            reviews: 1560
        }
    },
    
    // Premium Applications (SIMPLIFIED - 6 main apps)
    apps: {
        netflix_1month: {
            id: 'netflix_1month',
            appName: 'Netflix',
            category: 'streaming',
            plan: '1 Month Premium',
            region: 'Global',
            icon: 'netflix',
            color: '#E50914',
            description: 'Netflix premium streaming - Ultra HD, offline download, 4 devices',
            features: [
                'Unlimited streaming',
                'Ultra HD (4K)',
                'Download to watch offline',
                'Watch on 4 devices',
                'No ads'
            ],
            price: 24.99,
            supplier: 'supplier_official',
            stock: 450,
            deliveryType: 'instant_code',
            deliveryTime: 'Within 5 minutes',
            popularity: 9.5,
            reviews: 4820,
            rating: 4.8,
            active: true
        },
        
        youtube_premium_1month: {
            id: 'youtube_premium_1month',
            appName: 'YouTube Premium',
            category: 'streaming',
            plan: '1 Month',
            region: 'Global',
            icon: 'youtube',
            color: '#FF0000',
            description: 'YouTube Premium with no ads and offline playback',
            features: [
                'Ad-free watching',
                'Offline playback',
                'Background play',
                'YouTube Original content',
                'Music uploads'
            ],
            pricing: {
                standard: { price: 14.99, originalPrice: 17.99, supplier: 'supplier_official', stock: 680 },
                budget: { price: 13.99, originalPrice: 17.99, supplier: 'supplier_local', stock: 520 },
                cheapest: { price: 12.99, originalPrice: 17.99, supplier: 'supplier_reseller_b', stock: 350 }
            },
            deliveryType: 'instant_code',
            deliveryTime: 'Within 5 minutes',
            popularity: 9.2,
            reviews: 5670,
            rating: 4.9,
            active: true
        },
        
        spotify_premium_1month: {
            id: 'spotify_premium_1month',
            appName: 'Spotify Premium',
            category: 'music',
            plan: '1 Month',
            region: 'Global',
            icon: 'spotify',
            color: '#1DB954',
            description: 'Spotify Premium - unlimited music streaming',
            features: [- Ad-free watching, offline playback, background play',
            features: [
                'Ad-free watching',
                'Offline playback',
                'Background play',
                'YouTube Original content',
                'Music uploads'
            ],
            price: 13.99,
            supplier: 'supplier_official',
            stock: 680,
            deliveryType: 'instant_code',
            deliveryTime: 'Within 5 minutes',
            popularity: 9.2,
            reviews: 5670,
            rating: 4.9,
            active: true
        },
        
        spotify_premium_1month: {
            id: 'spotify_premium_1month',
            appName: 'Spotify Premium',
            category: 'music',
            plan: '1 Month',
            region: 'Global',
            icon: 'spotify',
            color: '#1DB954',
            description: 'Spotify Premium - Ad-free music, offline listening, unlimited skips',
            features: [
                'Ad-free music',
                'Offline listening',
                'Skip unlimited',
                'High quality audio',
                'Listen with friends'
            ],
            price: 11.99,
            supplier: 'supplier_official',
            stock: 750,
            deliveryType: 'instant_code',
            deliveryTime: 'Within 5 minutes',
            popularity: 9.4,
            reviews: 7890,
            rating: 4.9,
            active: true
        },
        
        capcut_premium_1month: {
            id: 'capcut_premium_1month',
            appName: 'CapCut Premium',
            category: 'video_editing',
            plan: '1 Month',
            region: 'Global',
            icon: 'capcut',
            color: '#000000',
            description: 'CapCut Premium - Remove watermark, premium effects, unlimited exports',
            features: [
                'Remove watermark',
                'Unlimited exports',
                'Premium effects',
                'Exclusive templates',
                'Advanced filters',
                'Cloud storage'
            ],
            price: 3.99,
            supplier: 'supplier_official',
            stock: 1200,
            deliveryType: 'instant_code',
            deliveryTime: 'Within 5 minutes',
            popularity: 8.4,
            reviews: 3450,
            rating: 4.6,
            active: true
        },
        
        canva_pro_1month: {
            id: 'canva_pro_1month',
            appName: 'Canva Pro',
            category: 'design',
            plan: '1 Month',
            region: 'Global',
            icon: 'canva',
            color: '#00D9FF',
            description: 'Canva Pro - Unlimited templates, premium elements, background remover',
            features: [
                'Unlimited templates',
                'Premium elements',
                'Unlimited uploads',
                'Brand kit',
                'Magic resize',
                'Background remover'
            ],
            price: 8.99,
            supplier: 'supplier_official',
            stock: 890,
            deliveryType: 'instant_code',
            deliveryTime: 'Within 5 minutes',
            popularity: 8.6,
            reviews: 4320,
            rating: 4.7,
            active: true
        },
        
        chatgpt_plus_1month: {
            id: 'chatgpt_plus_1month',
            appName: 'ChatGPT Plus',
            category: 'ai',
            plan: '1 Month',
            region: 'Global',
            icon: 'chatgpt',
            color: '#00A67E',
            description: 'ChatGPT Plus - Faster responses, priority access, GPT-4 usage',
            features: [
                'GPT-4 access',
                'Faster responses',
                'Priority access',
                'Higher usage limits',
                'Early feature access',
                'Mobile app support'
            ],
            price: 14.99,
            supplier: 'supplier_official',
            stock: 560,
            deliveryType: 'instant_code',
            deliveryTime: 'Within 5 minutes',
            popularity: 8.8,
            reviews: 245diting',
            name: 'Video Editing',
            icon: 'video',
            color: '#000000',
            description: 'Video editing applications'
        },
        messaging: {
            id: 'messaging',
            name: 'Messaging',
            icon: 'chat',
            color: '#0088cc',
            description: 'Communication apps'
        },
        productivity: {
            id: 'productivity',
            name: 'Productivity',
            icon: 'briefcase',
            color: '#00A4EF',
            description: 'Office and productivity tools'
        },
        vpn: {
            id: 'vpn',
            name: 'VPN & Security',
            icon: 'shield',
            color: '#418FFF',
            description: 'VPN and security applications'
        }
    },
    
    /**
     * Get app by ID
     */
    getApp: function(appId) {
        return this.apps[appId] || null;
    },
    
    /**
     * List all active apps
     */
    listApps: function() {
        return Object.entries(this.apps)
            .filter(([_, app]) => app.active)
            .map(([key, app]) => ({
                id: key,
                appName: app.appName,
                plan: app.plan,
                category: app.category,
                startPrice: Math.min(...Object.values(app.pricing).map(p => p.price)),
                originalPrice: Object.values(app.pricing)[0].originalPrice,
                rating: app.rating,
                popularity: app.popularity,
                reviews: app.reviews,
                totalStock: Object.values(app.pricing).reduce((sum, p) => sum + p.stock, 0)
            }));
    },
    
    /**
     * Get apps by category
     */
    getAppsByCategory: function(categoryId) {
        return Object.entries(this.apps)
            .filter(([_, app]) => app.category === categoryId && app.active)
            .map(([key, app]) => ({
                id: key,
                appName: app.appName,
                plan: app.plan,
                rating: app.rating,
                reviews: app.reviews,
                startPrice: Math.min(...Object.values(app.pricing).map(p => p.price))
            }));
    },
    
    /**
     * Get cheapest price for app
     */
    getCheapestPrice: function(appId) {
        const app = this.getApp(appId);
        if (!app) return null;
        
        let cheapest = null;
        let lowestPrice = Infinity;
        
        Object.entries(app.pricing).forEach(([option, data]) => {
            if (data.price < lowestPrice) {
                lowestPrice = data.price;
                cheapest = {
                    option: option,
                    price: data.price,
                    originalPrice: data.originalPrice,
                    discount: Math.round(((data.originalPrice - data.price) / data.originalPrice) * 100),
                    supplier: data.supplier,
                    stock: data.stock
                };
            }
        });
        
        return cheapest;
    },
    
    /**
     * Get all price options for app
     */
    getPriceOptions: function(appId) {
        const app = this.getApp(appId);
        if (!app) return null;
        
        return {
            appName: app.appName,
            plan: app.plan,
            options: Object.entries(app.pricing).map(([option, data]) => ({
                option: option,
                price: data.price,
                originalPrice: data.originalPrice,
                discount: Math.round(((data.originalPrice - data.price) / data.originalPrice) * 100),
                supplier: data.supplier,
                supplierName: this.suppliers[data.supplier].name,
                stock: data.stock,
                available: data.stock > 0
            }))
        };
    },
    
    /**
     * Search apps by name or category
     */
    searchApps: function(query) {
        const lowerQuery = query.toLowerCase();
        
        return Object.entries(this.apps)
            .filter(([_, app]) => 
                app.active &&
                (app.appName.toLowerCase().includes(lowerQuery) ||
                 app.plan.toLowerCase().includes(lowerQuery) ||
                 app.category.toLowerCase().includes(lowerQuery))
            )
            .map(([key, app]) => ({
                id: key,
                appName: app.appName,
                plan: app.plan,
                category: app.category,
                startPrice: Math.min(...Object.values(app.pricing).map(p => p.price))
            }));
    },
    
    /**
     * Get popular apps (sorted by popularity)
     */
    getPopularApps: function(limit = 10) {
        return Object.entries(this.apps)
            .filter(([_, app]) => app.active)
            .sort((a, b) => b[1].popularity - a[1].popularity)
            .slice(0, limit)
            .map(([key, app]) => ({
                id: key,
                appName: app.appName,
                plan: app.plan,
                popularity: app.popularity,
                rating: app.rating,
                reviews: app.reviews,
                startPrice: Math.min(...Object.values(app.pricing).map(p => p.price))
            }));
    },
    
    /**
     * Get top rated apps
     */
    getTopRatedApps: function(limit = 10) {
        return Object.entries(this.apps)
            .filter(([_, app]) => app.active)
            .sort((a, b) => {
                if (b[1].rating !== a[1].rating) return b[1].rating - a[1].rating;
                return b[1].reviews - a[1].reviews;
            })
            .slice(0, limit)
            .map(([key, app]) => ({
                id: key,
                appName: app.appName,
                plan: app.plan,
                rating: app.rating,
                reviews: app.reviews,
                startPrice: Math.min(...Object.values(app.pricing).map(p => p.price))
            }));
    },
    
    /**
     * Get apps with stock available
     */
    getAppsWithStock: function() {
        return Object.entries(this.apps)
            .filter(([_, app]) => {
                const totalStock = Object.values(app.pricing).reduce((sum, p) => sum + p.stock, 0);
                return app.active && totalStock > 0;
            })
            .map(([key, app]) => ({
                id: key,
                appName: app.appName,
                totalStock: Object.values(app.pricing).reduce((sum, p) => sum + p.stock, 0)
            }));
    },
    
    /**
     * Get supplier info
     */
    getSupplier: function(supplierId) {
        return this.suppliers[supplierId] || null;
    },
    
    /**
     * List all suppliers
     */
    listSuppliers: function() {
        return Object.entries(this.suppliers).map(([key, supplier]) => ({
            id: key,
            name: supplier.name,
            country: supplier.country,
            verified: supplier.verified,
            rating: supplier.rating,
            reviews: supplier.reviews
        }));
    },
    
    /**
     * Get apps from specific supplier
     */
    getAppsBySupplier: function(supplierId) {
        const apps = [];
        
        Object.entries(this.apps).forEach(([appId, app]) => {
            if (!app.active) return;
            
            Object.entries(app.pricing).forEach(([option, data]) => {
                if (data.supplier === supplierId) {
                    apps.push({
                        id: appId,
                        appName: app.appName,
                        plan: app.plan,
                        price: data.price,
                        stock: data.stock,
                        option: option
                    });
                }
            });
        });
        
        return apps;
    },
    
    /**
     * Calculate discount percentage
     */
    getDiscount: function(appId, pricingOption) {
        const app = this.getApp(appId);
        if (!app || !app.pricing[pricingOption]) return 0;
        
        const data = app.pricing[pricingOption];
        return Math.round(((data.originalPrice - data.price) / data.originalPrice) * 100);
    },
    
    /**
     * Get category info
     */
    getCategory: function(categoryId) {
        return this.categories[categoryId] || null;
    },
    
    /**
     * List all categories
     */
    listCategories: function() {
        return Object.entries(this.categories).map(([key, cat]) => ({
            id: key,
            name: cat.name,
            appCount: this.getAppsByCategory(key).length
        }));
    },
    
    /**
     * Get system summary
     */
    getSummary: function() {
        const activeApps = Object.values(this.apps).filter(app => app.active).length;
        const totalStock = Object.values(this.apps).reduce((sum, app) => {
            return sum + Object.values(app.pricing).reduce((s, p) => s + p.stock, 0);
        }, 0);
        
        return {
            version: this.version,
            lastModified: this.lastModified,
            totalApps: activeApps,
            totalSuppliers: Object.keys(this.suppliers).length,
            totalCategories: Object.keys(this.categories).length,
            totalStock: totalStock,
            priceRange: {
                min: 2.99,
                max: 39.99
            },
            avgRating: (Object.values(this.apps)
                .filter(app => app.active)
                .reduce((sum, app) => sum + app.rating, 0) / activeApps).toFixed(2)
        };
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PremiumAppsMarketplace;
}
