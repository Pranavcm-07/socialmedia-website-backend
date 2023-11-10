import User from "../models/User.js";
import Post from "../models/Post.js";

export const createpost = async (req, res) => {
  try {
    const { userid, picturepath, description } = req.body;
    const user = await User.findById(userid);
    const newpost = new Post({
      userid,
      firstname: user.firstname,
      lastname: user.lastname,
      picturepath,
      description,
      userpicturepath: user.userpicturepath,
      location: user.location,
      likes: {},
      comments: [],
    });

    await newpost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getfeedpost = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getuserpost = async (req, res) => {
  try {
    const { userid } = req.params;
    const post = await Post.find({ userid });

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const likepost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userid } = req.body;
    const post = Post.findById(id);
    const isliked = post.likes.get(userid);

    if (isliked) {
      post.likes.delete(userid);
    } else {
      post.likes.set(userid, true);
    }

    const updatedpost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedpost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
