// Import
const mongoose = require('mongoose');
// const { type } = require('os');
// const { title } = require('process');
// const { use } = require('react');

// 1. Connect to MongoDB (Atlas or local)
mongoose.connect('mongodb+srv://Mongo:suhail123@cluster0.ioavy.mongodb.net/?appName=Cluster0')

// 2. Define User Schema
const userSchema = new mongoose.Schema({
    username : {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    createdAt: {type: Date, default: Date.now}
});

// 3. Define Post Schema with reference to User
const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true} // ref to User
});

// 4. Add a model method (static)
userSchema.statics.findByUsername = function(username) {
    return this.findOne({ username: new RegExp(`^${username}$`, 'i') });
};

// 5. Create models
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

// 6. Main lgic
async function run() {
    // Clear old data 
    await User.deleteMany({});
    await Post.deleteMany({});

    // Create a user
    const user = new User({ username: 'Stark', email: 'stark@test.com'})
    await user.save();

    // Create posts linked to the user
    const post1 = new Post({ title: "My First Post", content: "Hello world!", author: user._id });
    const post2 = new Post({ title: "Another post", content: "Learning MongoDB!", author: user._id });
    await post1.save();
    await post2.save();

    // Query with populate (one-to-many)
    const posts = await Post.find().populate('author', 'username email');
    console.log(JSON.stringify(posts, null, 2));

    // Use model method
    const foundUser = await User.findByUsername('stark');
    console.log('Found User:', foundUser?.username);

    mongoose.connection.close();
}

run().catch(console.error);