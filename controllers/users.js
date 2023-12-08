import User from "../models/User.js";
import Post from "../models/Post.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { picturePath } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { picturePath: picturePath },
      { new: true }
    );
    const posts = await Post.find({ userId: userId });
    await Promise.all(
      posts.map(async (post) => {
        return await Post.findByIdAndUpdate(
          post._id,
          {
            userPicturePath: picturePath,
          },
          { new: true }
        );
      })
    );
    const updatedPosts = await Post.find();
    // Promise.all(posts.map(async(post)=>{
    //   post.comments.map((_id)=>{
    //     _id===userId && return {}
    //   })
    // }))
    res.status(200).json({ updatedUser, updatedPosts });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
