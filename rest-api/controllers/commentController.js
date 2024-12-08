const { userModel, themeModel, postModel } = require('../models');

function newComment(text, userId, postId) {
    return userModel.create({ text, userId, postId })
        .then(post => {
            return Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { posts: post._id }, $addToSet: { themes: themeId } }),
                themeModel.findByIdAndUpdate({ _id: themeId }, { $push: { posts: post._id }, $addToSet: { subscribers: userId } }, { new: true })
            ])
        })
}