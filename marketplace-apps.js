/**
 * Premium Apps Marketplace System
 * Sistem jual aplikasi premium (Netflix, Spotify, YouTube Premium, dll)
 * Harga mulai RM2, stok dari berbagai supplier/provider
 */

const PremiumAppsMarketplace = {
    version: '1.0.0',
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
    
    // Premium Applications
    apps: {
        netflix_1month: {
            id: 'netflix_1month',
            appName: 'Netflix',
            category: 'streaming',
            plan: '1 Month Premium',
            region: 'Global',
            icon: 'netflix',
            color: '#E50914',
            description: 'Access to Netflix premium streaming',
            features: [
                'Unlimited streaming',
                'Ultra HD (4K)',
                'Download to watch offline',
                'Watch on 4 devices',
                'No ads'
            ],
            pricing: {
                standard: { price: 25.99, originalPrice: 32.99, supplier: 'supplier_official', stock: 450 },
                budget: { price: 24.99, originalPrice: 32.99, supplier: 'supplier_reseller_a', stock: 320 },
                cheapest: { price: 22.99, originalPrice: 32.99, supplier: 'supplier_reseller_b', stock: 180 }
            },
            deliveryType: 'instant_code',
            deliveryTime: 'Within 5 minutes',
            popularity: 9.5,
            reviews: 4820,
            rating: 4.8,
            active: true
        },
        
        netflix_3months: {
            id: 'netflix_3months',
            appName: 'Netflix',
            category: 'streaming',
            plan: '3 Months Premium',
            region: 'Global',
            icon: 'netflix',
            color: '#E50914',
            description: 'Access to Netflix premium streaming for 3 months',
            features: [
                'Unlimited streaming',
                'Ultra HD (4K)',
                'Download to watch offline',
                'Watch on 4 devices',
                'No ads'
            ],
            pricing: {
                standard: { price: 70.99, originalPrice: 98.97, supplier: 'supplier_official', stock: 300 },
                budget: { price: 68.99, originalPrice: 98.97, supplier: 'supplier_reseller_a', stock: 200 }
            },
            deliveryType: 'instant_code',
            deliveryTime: 'Within 5 minutes',
            popularity: 8.8,
            reviews: 2340,
            rating: 4.7,
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
            features: [
                'Ad-free music',
                'Offline listening',
                'Skip unlimited',
                'High quality audio',
                'Listen with friends'
            ],
            pricing: {
                standard: { price: 12.99, originalPrice: 15.99, supplier: 'supplier_official', stock: 750 },
                budget: { price: 11.99, originalPrice: 15.99, supplier: 'supplier_reseller_a', stock: 600 },
                cheapest: { price: 10.99, originalPrice: 15.99, supplier: 'supplier_reseller_b', stock: 400 }
            },
            deliveryType: 'instant_code',
            deliveryTime: 'Within 5 minutes',
            popularity: 9.4,
            reviews: 7890,
            rating: 4.9,
            active: true
        },
        
        spotify_family_1month: {
            id: 'spotify_family_1month',
            appName: 'Spotify Family',
            category: 'music',
            plan: '1 Month (6 Accounts)',
            region: 'Global',
            icon: 'spotify',
            color: '#1DB954',
            description: 'Spotify Premium for up to 6 family members',
            features: [
                'Up to 6 Premium accounts',
                'Ad-free listening',
                'Offline downloads',
                'Family Mix playlist',
                'Parental controls'
            ],
            pricing: {
                standard: { price: 28.99, originalPrice: 35.99, supplier: 'supplier_official', stock: 320 },
                budget: { price: 26.99, originalPrice: 35.99, supplier: 'supplier_local', stock: 250 }
            },
            deliveryType: 'instant_code',
            deliveryTime: 'Within 5 minutes',
            popularity: 8.9,
            reviews: 3210,
            rating: 4.8,
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
            description: 'Canva Pro - unlimited design templates',
            features: [
                'Unlimited templates',
                'Premium elements',
                'Unlimited uploads',
                'Brand kit',
                'Magic resize',
                'Background remover'
            ],
            pricing: {
                standard: { price: 9.99, originalPrice: 14.99, supplier: 'supplier_official', stock: 890 },
                budget: { price: 8.99, originalPrice: 14.99, supplier: 'supplier_reseller_a', stock: 670 },
                cheapest: { price: 7.99, originalPrice: 14.99, supplier: 'supplier_reseller_b', stock: 450 }
            },
            deliveryType: 'instant_code',
            deliveryTime: 'Within 5 minutes',
            popularity: 8.6,
            reviews: 4320,
            rating: 4.7,
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
            description: 'CapCut Premium - professional video editing',
            features: [
                'Remove watermark',
                'Unlimited exports',
                'Premium effects',
                'Exclusive templates',
                'Advanced filters',
                'Cloud storage'
            ],
            pricing: {
                standard: { price: 4.99, originalPrice: 6.99, supplier: 'supplier_official', stock: 1200 },
                budget: { price: 3.99, originalPrice: 6.99, supplier: 'supplier_local', stock: 950 },
                cheapest: { price: 2.99, originalPrice: 6.99, supplier: 'supplier_reseller_b', stock: 780 }
            },
            deliveryType: 'instant_code',
            deliveryTime: 'Within 5 minutes',
            popularity: 8.4,
            reviews: 3450,
            rating: 4.6,
            active: true
        },
        
        telegram_premium: {
            id: 'telegram_premium',
            appName: 'Telegram Premium',
            category: 'messaging',
            plan: '1 Year',
            region: 'Global',
            icon: 'telegram',
            color: '#0088cc',
            description: 'Telegram Premium - exclusive features',
            features: [
                'Premium stickers & emoji',
                'Advanced search',
                'Larger files upload',
                'Bio links',
                'Folder tags',
                'Message effects'
            ],
            pricing: {
                standard: { price: 8.99, originalPrice: 11.99, supplier: 'supplier_official', stock: 2100 },
                budget: { price: 7.99, originalPrice: 11.99, supplier: 'supplier_local', stock: 1800 },
                cheapest: { price: 6.99, originalPrice: 11.99, supplier: 'supplier_reseller_b', stock: 1200 }
            },
            deliveryType: 'instant_code',
            deliveryTime: 'Within 5 minutes',
            popularity: 7.8,
            reviews: 2890,
            rating: 4.5,
            active: true
        },
        
        adobe_creative_cloud_1month: {
            id: 'adobe_creative_cloud_1month',
            appName: 'Adobe Creative Cloud',
            category: 'design',
            plan: '1 Month (All Apps)',
            region: 'Global',
            icon: 'adobe',
            color: '#FF0000',
            description: 'Adobe Creative Cloud - access all apps',
            features: [
                'All Adobe apps',
                'Cloud storage 100GB',
                'Desktop & mobile',
                'Fonts library',
                'Templates & assets',
                'Premium support'
            ],
            pricing: {
                standard: { price: 29.99, originalPrice: 39.99, supplier: 'supplier_official', stock: 280 },
                budget: { price: 27.99, originalPrice: 39.99, supplier: 'supplier_reseller_a', stock: 190 }
            },
            deliveryType: 'instant_code',
            deliveryTime: 'Within 10 minutes',
            popularity: 8.7,
            reviews: 2120,
            rating: 4.8,
            active: true
        },
        
        microsoft_365_1month: {
            id: 'microsoft_365_1month',
            appName: 'Microsoft 365',
            category: 'productivity',
            plan: '1 Month (Personal)',
            region: 'Global',
            icon: 'microsoft',
            color: '#00A4EF',
            description: 'Microsoft 365 - Office apps and cloud storage',
            features: [
                'Word, Excel, PowerPoint',
                'Outlook',
                'OneDrive 1TB',
                'Microsoft Editor',
                'Family sharing',
                'Premium support'
            ],
            pricing: {
                standard: { price: 11.99, originalPrice: 14.99, supplier: 'supplier_official', stock: 520 },
                budget: { price: 10.99, originalPrice: 14.99, supplier: 'supplier_local', stock: 380 }
            },
            deliveryType: 'instant_code',
            deliveryTime: 'Within 10 minutes',
            popularity: 7.9,
            reviews: 1890,
            rating: 4.6,
            active: true
        },
        
        grammarly_premium_1month: {
            id: 'grammarly_premium_1month',
            appName: 'Grammarly Premium',
            category: 'productivity',
            plan: '1 Month',
            region: 'Global',
            icon: 'grammarly',
            color: '#15C784',
            description: 'Grammarly Premium - advanced writing assistant',
            features: [
                'Advanced grammar',
                'Plagiarism detection',
                'Tone detection',
                'Desktop app',
                'Browser extension',
                'Goal tracking'
            ],
            pricing: {
                standard: { price: 7.99, originalPrice: 11.99, supplier: 'supplier_official', stock: 640 },
                budget: { price: 6.99, originalPrice: 11.99, supplier: 'supplier_reseller_a', stock: 480 },
                cheapest: { price: 5.99, originalPrice: 11.99, supplier: 'supplier_reseller_b', stock: 320 }
            },
            deliveryType: 'instant_code',
            deliveryTime: 'Within 5 minutes',
            popularity: 7.5,
            reviews: 1650,
            rating: 4.4,
            active: true
        },
        
        nordvpn_1month: {
            id: 'nordvpn_1month',
            appName: 'NordVPN',
            category: 'vpn',
            plan: '1 Month',
            region: 'Global',
            icon: 'nordvpn',
            color: '#418FFF',
            description: 'NordVPN - secure and private internet',
            features: [
                'Encryption',
                '5900+ servers',
                '6 simultaneous connections',
                'No logs policy',
                'Kill switch',
                'Double VPN'
            ],
            pricing: {
                standard: { price: 5.99, originalPrice: 10.99, supplier: 'supplier_official', stock: 760 },
                budget: { price: 4.99, originalPrice: 10.99, supplier: 'supplier_local', stock: 580 }
            },
            deliveryType: 'instant_code',
            deliveryTime: 'Within 5 minutes',
            popularity: 8.2,
            reviews: 2340,
            rating: 4.7,
            active: true
        }
    },
    
    // Categories
    categories: {
        streaming: {
            id: 'streaming',
            name: 'Streaming & Entertainment',
            icon: 'film',
            color: '#E50914',
            description: 'Movies, TV Shows, Music'
        },
        music: {
            id: 'music',
            name: 'Music',
            icon: 'music',
            color: '#1DB954',
            description: 'Music streaming services'
        },
        design: {
            id: 'design',
            name: 'Design & Graphics',
            icon: 'palette',
            color: '#00D9FF',
            description: 'Design and creativity tools'
        },
        video_editing: {
            id: 'video_editing',
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
