const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    nameUserId: String,
    desc: String,
    likes: [],
    image: String,
},
    { timestamps: true })

module.exports = mongoose.model('Post', PostSchema)