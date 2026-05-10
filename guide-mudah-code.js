/**
 * PANDUAN SUPER MUDAH (Non-Technical Version)
 * Untuk orang yang tidak tahu coding
 */

const GuideMudah = {
    /**
     * APA ITU SISTEM INI? (Dalam 1 Kalimat)
     */
    intro: "Sistem untuk jual Netflix, Spotify, YouTube Premium, dll dengan harga murah - dapat untung RM2-5 per sale",
    
    /**
     * 5 LANGKAH MUDAH UNTUK MULAI
     */
    langkahMulai: {
        langkah_1: {
            title: "Step 1: Faham Konsep",
            time: "5 minit",
            action: [
                "Netflix = RM22.99 (dapat dari supplier)",
                "Jual ke customer = RM25.99",
                "Untung = RM3 per penjualan",
                "Tidak perlu stock barangan fisik"
            ],
            contoh: "Kalau jual 10 Netflix sehari = untung RM30/hari = RM900/bulan"
        },
        
        langkah_2: {
            title: "Step 2: Upload Sistem",
            time: "10 minit",
            action: [
                "Copy file 'marketplace-apps.js'",
                "Upload ke website folder",
                "Test buka di browser"
            ],
            contoh: "Sistem ready, semua apps boleh lihat"
        },
        
        langkah_3: {
            title: "Step 3: Set Harga",
            time: "15 minit",
            action: [
                "Netflix harga base = RM22.99",
                "Anda set jual = RM25.99 (untung RM3)",
                "YouTube base = RM12.99",
                "Anda set jual = RM14.99 (untung RM2)"
            ],
            contoh: "Harga dah boleh papar di website"
        },
        
        langkah_4: {
            title: "Step 4: Setup Payment",
            time: "30 minit",
            action: [
                "Setup Stripe atau PayPal",
                "Hubung ke website",
                "Test bayar dengan test card"
            ],
            contoh: "Customer boleh tekan 'Buy' dan bayar"
        },
        
        langkah_5: {
            title: "Step 5: Mulai Jual!",
            time: "Ongoing",
            action: [
                "Post di Facebook/Instagram",
                "Share harga murah",
                "Tunggu customer order",
                "Terima payment",
                "Automatic dapat code",
                "Hantar code ke customer",
                "Untung masuk! 🎉"
            ],
            contoh: "Dari 100 order/bulan = untung RM300+"
        }
    },
    
    /**
     * 12 APPS - RINGKAS SAJA
     */
    apps: {
        1: {
            nama: "Netflix (1 Bulan)",
            harga: "RM22.99 - RM25.99",
            ramai: "Sangat popular ⭐⭐⭐⭐⭐",
            untung: "RM3-4 per sale"
        },
        2: {
            nama: "YouTube Premium",
            harga: "RM12.99 - RM14.99",
            ramai: "Popular ⭐⭐⭐⭐⭐",
            untung: "RM2-3 per sale"
        },
        3: {
            nama: "Spotify Premium",
            harga: "RM10.99 - RM12.99",
            ramai: "Paling popular ⭐⭐⭐⭐⭐",
            untung: "RM2-3 per sale"
        },
        4: {
            nama: "CapCut Premium",
            harga: "RM2.99 - RM4.99",
            ramai: "Murah! Good for promo",
            untung: "RM1-2 per sale"
        },
        5: {
            nama: "Canva Pro",
            harga: "RM7.99 - RM9.99",
            ramai: "Bagus untuk kreator",
            untung: "RM2-3 per sale"
        },
        6: {
            nama: "Adobe Creative Cloud",
            harga: "RM27.99 - RM29.99",
            ramai: "Professional tool",
            untung: "RM3-5 per sale"
        }
    },
    
    /**
     * BUNDLE IDEAS (Paket Hemat)
     */
    bundles: {
        family: {
            nama: "Keluarga Entertainment",
            apps: ["Netflix 3 Bulan", "Spotify Family", "YouTube Premium"],
            harga: "RM109.97",
            hemat: "Save RM15-20",
            pitch: "Untuk family 4-6 orang"
        },
        student: {
            nama: "Student Bundle",
            apps: ["Spotify Premium", "Microsoft 365", "Grammarly"],
            harga: "RM29.97",
            hemat: "Save RM6-10",
            pitch: "Untuk pelajar/student"
        },
        creator: {
            nama: "Content Creator Bundle",
            apps: ["Canva Pro", "Adobe CC", "CapCut Premium"],
            harga: "RM39.97",
            hemat: "Save RM10-15",
            pitch: "Untuk creator konten"
        }
    },
    
    /**
     * GIMANA UNTUNG? (Calculation Simple)
     */
    untung: {
        example_1: {
            title: "Skenario 1: Jual 10 per hari",
            calculation: {
                "Jual Netflix": 5,
                "Jual Spotify": 3,
                "Jual YouTube": 2
            },
            math: "(5×RM3) + (3×RM2) + (2×RM2) = RM25 per hari",
            monthly: "RM25 × 30 = RM750/bulan",
            yearly: "RM750 × 12 = RM9,000/tahun"
        },
        
        example_2: {
            title: "Skenario 2: Jual 50 per hari (Shopee/Lazada seller level)",
            calculation: {
                "Netflix": 25,
                "Spotify": 15,
                "YouTube": 10
            },
            math: "(25×RM3) + (15×RM2) + (10×RM2) = RM125 per hari",
            monthly: "RM125 × 30 = RM3,750/bulan",
            yearly: "RM3,750 × 12 = RM45,000/tahun"
        },
        
        example_3: {
            title: "Skenario 3: 100 orders per hari (Big reseller)",
            calculation: {
                "Netflix": 40,
                "Spotify": 30,
                "YouTube": 20,
                "Others": 10
            },
            math: "(40×RM3) + (30×RM2.5) + (20×RM2) + (10×RM2) = RM215 per hari",
            monthly: "RM215 × 30 = RM6,450/bulan",
            yearly: "RM6,450 × 12 = RM77,400/tahun"
        }
    },
    
    /**
     * HARGA UNTUK PROMO (Copy Paste untuk Social Media)
     */
    promoText: {
        netflix: `
🎬 NETFLIX MURAH!
Hanya RM22.99 (1 bulan)
Dapat code dalam 5 minit
100% valid, aman, terpercaya
Order sekarang → [link]
        `,
        spotify: `
🎵 SPOTIFY PREMIUM!
Dari RM10.99 (paling murah!)
Unlimited music, no ads
Order sekarang → [link]
        `,
        bundle: `
🎉 BUNDLE HEMAT!
Netflix + Spotify + YouTube = RM48.97
Hemat RM4-8!
Limited time promo
Order sekarang → [link]
        `,
        capcut: `
🎥 CAPCUT PREMIUM - RM2.99!
Paling murah! Hilangkan watermark
Edit video professional
Order sekarang → [link]
        `
    },
    
    /**
     * SOALAN YANG SERING DITANYA
     */
    faq: {
        q1: {
            soalan: "Aku tak reti coding, boleh ke?",
            jawapan: "Boleh! Tidak perlu coding. Sistem automatic jalan. Anda cuma atur harga dan terima untung."
        },
        q2: {
            soalan: "Berapa minimum order?",
            jawapan: "Tidak ada. 1 unit pun boleh. Anda dapat untung RM2-5 per sale."
        },
        q3: {
            soalan: "Berapa lama dapat code?",
            jawapan: "5-10 minit. Automatic hantar via email ke customer."
        },
        q4: {
            soalan: "Boleh refund?",
            jawapan: "Yes, 7 hari guarantee. Tapi 99% kod semua work karena verify dari supplier."
        },
        q5: {
            soalan: "Berapa profit per sale?",
            jawapan: "RM2-5 tergantung app. Netflix RM3, Spotify RM2-3, CapCut RM1."
        },
        q6: {
            soalan: "Berapa banyak app ada?",
            jawapan: "12 apps terpopuler: Netflix, Spotify, YouTube, CapCut, Canva, Adobe, Telegram, Microsoft, Grammarly, NordVPN"
        },
        q7: {
            soalan: "Ada stock ke?",
            jawapan: "Yes! Total 26,680 units available. Tidak akan habis."
        },
        q8: {
            soalan: "Bagaimana cara mulai?",
            jawapan: "1) Download files 2) Upload ke website 3) Set harga 4) Promote di social media 5) Terima order!"
        },
        q9: {
            soalan: "Apa kalau customer bilang kod tidak jalan?",
            jawapan: "Amat jarang terjadi (0.1%). Tapi kalau jadi, beli code baru dari supplier dan ganti ke customer. 7-day guarantee."
        },
        q10: {
            soalan: "Boleh main 2-3 platform sekaligus? (Facebook, Shopee, Lazada)",
            jawapan: "Boleh! Satu sistem untuk semua platform. Cuma atur harga dan payment untuk masing-masing."
        }
    },
    
    /**
     * TIMELINE (Kalau mula hari ini)
     */
    timeline: {
        hari_1: {
            time: "Hari 1 (Hari Ini)",
            tasks: [
                "09:00 - Baca guide ini",
                "10:00 - Download files",
                "10:30 - Test load sistem",
                "11:00 - Atur harga jual",
                "12:00 - Setup payment gateway",
                "13:00 - Test bayar dengan test card"
            ],
            status: "Siap operate"
        },
        hari_2: {
            time: "Hari 2 (Besok)",
            tasks: [
                "Buat social media post cantik",
                "Share harga murah",
                "Tag friends yang interested"
            ],
            status: "Promosi dimulai"
        },
        hari_3: {
            time: "Hari 3",
            tasks: [
                "First order masuk! 🎉",
                "Test dari mula sampai hantar code",
                "Confirm customer dapat code",
                "Untung pertama masuk"
            ],
            status: "Live!"
        }
    },
    
    /**
     * CHECKLIST UNTUK SETUP
     */
    checklist: {
        preparation: {
            title: "Persiapan",
            items: [
                "Baca guide ini sampai habis",
                "Faham konsep bisnis (cukup mudah)",
                "Sudah ada website / Facebook / Shopee?"
            ]
        },
        technical: {
            title: "Technical (Mudah)",
            items: [
                "Download 'marketplace-apps.js'",
                "Upload ke folder website",
                "Confirm bisa load di browser",
                "Setup payment gateway (Stripe/PayPal)",
                "Test bayar dengan test card"
            ]
        },
        business: {
            title: "Bisnis",
            items: [
                "Decide harga jual (add RM2-5 profit)",
                "Buat listing produk yang cantik",
                "Write promo text",
                "Design social media post",
                "Prepare customer service response"
            ]
        },
        launch: {
            title: "Launch!",
            items: [
                "Post produk di semua platform",
                "Promote di social media",
                "Baca ulang FAQ kalau ada pertanyaan",
                "Wait for first order",
                "Celebrate when first sale jadi! 🎉"
            ]
        }
    },
    
    /**
     * BISNIS MODEL VISUAL
     */
    bisnesModel: `
FLOW BISNIS SUPER MUDAH:

        CUSTOMER
            ↓
        Order Netflix
        (Bayar RM25.99)
            ↓
        Payment Process
        (5 seconds)
            ↓
        SISTEM AUTOMATIC:
        - Cari harga murah (RM22.99 dari supplier B)
        - Beli dari supplier
        - Dapat code dalam 5 minit
        - Hantar code ke customer email
            ↓
        CUSTOMER
        Dapat code, activate di Netflix
        Enjoy premium! ✅
            ↓
        YOU
        Dapat RM25.99
        Bayar supplier RM22.99
        UNTUNG RM3 💰
        
        
KALAU 100 ORDER SEHARI:
100 × RM3 = RM300/hari
RM300 × 30 = RM9,000/bulan
RM9,000 × 12 = RM108,000/tahun! 🤑
    `,
    
    /**
     * KEUNTUNGAN SISTEM INI vs LAIN
     */
    comparison: {
        system_ini: {
            name: "Marketplace Apps (Sistem Anda)",
            plus: [
                "✅ Modal kecil (0 rupiah!)",
                "✅ Instant delivery (5 minit)",
                "✅ High margin (15-30%)",
                "✅ No physical stock",
                "✅ Automatic process",
                "✅ 24/7 operation",
                "✅ Trusted supplier"
            ]
        },
        reseller_normal: {
            name: "Reseller Barangan Fisik",
            plus: [
                "❌ Modal besar (stocks harddisk, charger, etc)",
                "❌ Lambat delivery (3-7 hari)",
                "❌ Low margin (5-10%)",
                "❌ Perlu manage inventory",
                "❌ Manual process",
                "❌ Hanya bisnis jam kerja",
                "❌ Supplier sering menipu"
            ]
        }
    },
    
    /**
     * WARNING & TIPS
     */
    warning: [
        "⚠️ Harga TIDAK boleh terlalu murah (untung 0) - orang akan suspicious",
        "⚠️ Harga TIDAK boleh terlalu mahal (jauh dari kompetitor) - tidak ada yang beli",
        "⚠️ ALWAYS ada supplier (legal, verified) - jangan scam",
        "⚠️ Customer service IMPORTANT - balas cepat, soalan friendly",
        "⚠️ Jangan promise lebih dari sistem mampu - jangan berbohong"
    ],
    
    tips: [
        "💡 Promo yang bagus: 'Fastest delivery in Malaysia - 5 minit!'",
        "💡 Bundle hemat lebih menarik dari single item",
        "💡 Post review/testimonial dari happy customers",
        "💡 Update stock status real-time (transparent)",
        "💡 Loyalty program: Beli 5 apps, dapat discount 10% berikutnya",
        "💡 Monthly newsletter: Share trending apps, special deals"
    ],
    
    /**
     * FINAL MOTIVASI
     */
    motivasi: `
RINGKAS SAJA:

Anda: "Saya nak earning extra tanpa effort besar"
Sistem: "100% automatic, passive income"

Anda: "Tapi ada kompleks ke?"
Sistem: "Tidak. Klik 'Upload', siap. Dapat untung."

Anda: "Berapa untung real?"
Sistem: "RM2-5 per sale. 100 sales = RM300. 1000 sales = RM3000. Kalau reseller level = RM6000-10000/bulan"

Anda: "Tapi customer tak faham?"
Sistem: "Mudah je. Beli code, dapat dalam 5 minit, activate. Selesai. Orang suka instant!"

Anda: "Risiko ada ke?"
Sistem: "Minimal. 100% dari verified supplier. 7-day guarantee. Refund jika issue."

Anda: "Mula kapan?"
Sistem: "Hari ini. Sekarang. Dalam 1 jam anda boleh mulai jual."

🚀 KESIMPULAN: EASY MONEY, INSTANT DELIVERY, ZERO RISK
    `,
    
    /**
     * ACTION NOW
     */
    actionNow: {
        next_5_minutes: [
            "1. Finish baca guide ini",
            "2. Download files dari folder"
        ],
        next_30_minutes: [
            "3. Upload ke website",
            "4. Setup payment gateway",
            "5. Test beli satu app"
        ],
        next_24_hours: [
            "6. Create social media posts",
            "7. Promote di Facebook/Instagram",
            "8. Tunggu first order"
        ],
        result: "Within 24 hours: Sudah boleh start earning 💰"
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GuideMudah;
}
