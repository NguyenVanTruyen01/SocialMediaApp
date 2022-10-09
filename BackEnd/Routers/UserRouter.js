const express = require('express');
const router = express.Router();
const { getUser, getAllUser, updateUser, deleteUser, followUser, unFollowUser } = require('../Controllers/UserController')
const { authMiddleWare } = require('../Middleware/authMiddleware')


router.route('/').get(getAllUser);
router.route('/:id')
    .get(getUser)
    .patch(authMiddleWare, updateUser)
    .delete(authMiddleWare, deleteUser);

router.route('/follow/:id').put(authMiddleWare, followUser);
router.route('/unfollow/:id').put(authMiddleWare, unFollowUser);

module.exports = router;