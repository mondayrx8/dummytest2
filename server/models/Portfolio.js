const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    // WAJIB: Untuk hubungkan portfolio ni dengan user yang login
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    banner: { type: String, default: "" },
    template: { type: String, default: "template1" },

    // 0. Nama Bisnes / Company
    businessName: {
        type: String,
        required: true
    },

    // 1. Slogan / Short Brief
    slogan: {
        type: String,
        default: ""
    },

    // 2. About Us / Who We Are
    aboutUs: {
        type: String,
        default: ""
    },

    // 3. Mission & Vision
    missionVision: {
        mission: { type: String, default: "" },
        vision: { type: String, default: "" },
        graphicInfo: { type: String, default: "" } // Boleh simpan URL gambar
    },

    // 4. Our Team (Boleh tambah banyak member)
    ourTeam: [{
        name: { type: String },
        role: { type: String },
        description: { type: String },
        image: { type: String } // URL gambar profile
    }],

    // 5. Our Services (Boleh tambah banyak servis)
    ourServices: [{
        serviceName: { type: String },
        description: { type: String }
    }],

    // 6. Products (Banyak gambar)
    products: [{
        image: { type: String } // URL gambar produk
    }],

    // 7. Target Market
    targetMarket: {
        tam: { type: String, default: "" },
        sam: { type: String, default: "" },
        som: { type: String, default: "" }
    },

    // 8. Best Achievement / Performance
    achievements: [{
        description: { type: String },
        image: { type: String } // URL gambar anugerah/pencapaian
    }],

    // 9. Contact Info & Socials
    contactInfo: {
        phone: { type: String, default: "" },
        email: { type: String, default: "" },
        address: { type: String, default: "" },
        website: { type: String, default: "" },
        socials: {
            tiktok: { type: String, default: "" },
            instagram: { type: String, default: "" },
            twitter: { type: String, default: "" },
            facebook: { type: String, default: "" },
            threads: { type: String, default: "" }
        }
    },

    // Tarikh dicipta
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);