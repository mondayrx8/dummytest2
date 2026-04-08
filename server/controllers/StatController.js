const Stat = require('../models/Stat');
const User = require('../models/User'); 

class StatController {
    async getGlobalStats(req, res) {
        try {
            // 1. Increment visitor count
            const visitorStat = await Stat.findOneAndUpdate(
                { name: 'visitors' },
                { $inc: { count: 1 } },
                { new: true, upsert: true }
            );

            // 2. Get total registered users
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
}

module.exports = new StatController();
