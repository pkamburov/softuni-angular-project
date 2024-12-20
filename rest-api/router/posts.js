const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { postController } = require('../controllers');

// middleware that is specific to this router

router.get('/', postController.getLatestsPosts);
// router.get('/posts/:postId', auth(), postController.getPost);
//
router.post('/', auth(), postController.createPost);
router.put('/posts/:postId', auth(), postController.editPost);
router.delete('/:postId', auth(), postController.deletePost);
//

module.exports = router