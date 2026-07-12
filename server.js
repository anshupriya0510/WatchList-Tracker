require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Watchlist = require('./models/Watchlist');

// ─── App Setup ────────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── MongoDB Connection ───────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅  MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌  MongoDB connection error:', err.message);
    process.exit(1);
  });

// ─── Routes ───────────────────────────────────────────────────────────────────

/**
 * POST /api/watchlists
 * Create a new watchlist item
 */
app.post('/api/watchlists', async (req, res) => {
  try {
    const { title, platform } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required.' });
    }

    const newItem = await Watchlist.create({ title: title.trim(), platform });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/**
 * GET /api/watchlists
 * Fetch all watchlist items (newest first)
 */
app.get('/api/watchlists', async (req, res) => {
  try {
    const items = await Watchlist.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/**
 * PUT /api/watchlists/:id
 * Toggle the isWatched boolean for a specific item
 */
app.put('/api/watchlists/:id', async (req, res) => {
  try {
    const item = await Watchlist.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }

    item.isWatched = !item.isWatched;
    await item.save();

    res.status(200).json(item);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/**
 * DELETE /api/watchlists/:id
 * Remove a watchlist item from the database
 */
app.delete('/api/watchlists/:id', async (req, res) => {
  try {
    const item = await Watchlist.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }

    res.status(200).json({ message: 'Item deleted successfully.', id: req.params.id });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`);
});
