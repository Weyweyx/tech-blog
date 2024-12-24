const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

console.log('Type of userRoutes:', typeof userRoutes); // Should be "function"
console.log('Type of postRoutes:', typeof postRoutes); // Should be "function"
console.log('Type of commentRoutes:', typeof commentRoutes); // Should be "function"


// Use specific routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;