// This is the Core part of the Day 5 codebase
const express = require('express');
const Post = require('../models/Post');

// Create router
const router = express.Router();

router.get('/search', async (req, res) => {
    // return res.send('Works')
    try {
        const { keyword, from, to } = req.query;

        const matchStage = {};

        // Keyword search
        if (keyword) {
            matchStage.title = { $regex: keyword, $options: 'i' };
        }

        // Date range filter
        if (from || to) {
            matchStage.createdAt = {};
            if (from) matchStage.createdAt.$gte = new Date(from);
            if (to) matchStage.createdAt.$lte = new Date(to);
        }

        const posts = await Post.aggregate([
            { $match: matchStage },
            { $sort: { createdAt: -1 } },
            {
                $project: {
                    title: 1,
                    createdAt: 1,
                    views: 1,
                    _id: 0
                }
            }
        ]);

        res.json({
            count: posts.length,
            data: posts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports =  router;
// Next: connect route to server(go to server.js)