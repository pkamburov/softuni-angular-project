const { userModel, themeModel, postModel } = require('../models');

// function getPost(req, res, next) {
//     const { postId } = req.params;

//     postModel.findById(postId)
//         .populate({
//             path: 'comments',
//             populate : {
//                 path: 'userId'
//             }
//         })
//         .then(post => res.json(post))
//         .catch(next);
// }


function newPost(text, userId) {
    return postModel.create({ text: text.text, userId})
        .then(post => {
            return Promise.all([
                userModel.updateOne({ _id: userId}, { $push: {posts : post._id } })
            ])
        });
}

function getAllPosts(req, res, next) {
    postModel.find()
    .populate('userId')
    .then(themes => res.json(themes))
    .catch(next);
}


function getLatestsPosts(req, res, next) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    postModel.find()
        .sort({ created_at: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('themeId userId')
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(next);
}

function createPost(req, res, next) {
    const { _id: userId } = req.user;
    const postText = req.body;
    newPost(postText, userId)
        .then(([_, updatedPost]) => res.status(200).json(updatedPost))
        .catch(next);

}

function editPost(req, res, next) {
    const { postId } = req.params;
    const { postText } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the post, the post will not be updated
    postModel.findOneAndUpdate({ _id: postId, userId }, { text: postText }, { new: true })
        .then(updatedPost => {
            if (updatedPost) {
                res.status(200).json(updatedPost);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deletePost(req, res, next) {
    const { postId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        postModel.findOneAndDelete({ _id: postId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } }),
        // themeModel.findOneAndUpdate({ _id: themeId }, { $pull: { posts: postId } }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function like(req, res, next) {
    const { postId } = req.params;
    const { _id: userId } = req.user;

    console.log('like')

    postModel.updateOne({ _id: postId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next)
}

//
// function comment(req, res, next) {
//     const { postId } = req.params;
//     const { _id: userId} = req.user;

//     console.log('Comment');
    
// }
//


module.exports = {
    // getPost,
    getAllPosts,
    getLatestsPosts,
    newPost,
    createPost,
    editPost,
    deletePost,
    like,
}
