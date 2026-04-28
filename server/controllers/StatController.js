const Stat = require('../models/Stat');
const User = require('../models/User');
const Portfolio = require('../models/Portfolio'); // Wajib import Portfolio model

class StatController {
    async getGlobalStats(req, res) {
        try {
            const visitorStat = await Stat.findOneAndUpdate(
                { name: 'visitors' },
                { $inc: { count: 1 } },
                { new: true, upsert: true }
            );

            const totalUsers = await User.countDocuments();

            res.status(200).json({
                totalVisits: visitorStat.count,
                totalUsers: totalUsers
            });
        } catch (error) {
            console.error('Stats Error:', error);
            res.status(500).json({ totalVisits: 0, totalUsers: 0 });
        }
    }

    // 👇 API BARU UNTUK ADMIN DASHBOARD (ANALITIK) 👇
    async getAdminAnalytics(req, res) {
        try {
            // 1. Kira jumlah keseluruhan portfolio
            const totalVentures = await Portfolio.countDocuments();

            // 2. Aggregation Pipeline: Kira Pecahan Kategori (F&B, Tech, etc)
            const categoryDistribution = await Portfolio.aggregate([
                { $group: { _id: "$category", count: { $sum: 1 } } },
                { $sort: { count: -1 } } // Susun dari yang paling banyak
            ]);

            // 3. Aggregation Pipeline: Kira Populariti Template
            const templatePopularity = await Portfolio.aggregate([
                { $group: { _id: "$template", count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]);

            res.status(200).json({
                totalVentures,
                categoryDistribution,
                templatePopularity
            });
        } catch (error) {
            console.error('Analytics Error:', error);
            res.status(500).json({ message: "Failed to fetch analytics" });
        }
    }
}

module.exports = new StatController();