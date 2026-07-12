const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    platform: {
      type: String,
      trim: true,
      default: 'Other',
    },
    isWatched: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model('Watchlist', watchlistSchema);
