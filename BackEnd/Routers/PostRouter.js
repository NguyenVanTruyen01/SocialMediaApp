const express = require('express');
const router = express.Router();

const { createPost,
    getPost,
    updatePost,
    deleteUser,
    likePost,
    getTimeLinePostUSer } = require('../Controllers/PostController')

router.route('/').post(createPost);
router.route('/:id').get(getPost).patch(updatePost).delete(deleteUser);
router.route('/like/:id').put(likePost);
router.route('/:id/timelinepost').get(getTimeLinePostUSer);

module.exports = router;