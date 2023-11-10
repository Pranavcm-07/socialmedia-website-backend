import User from "../models/User.js";

export const getuser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ id });
    res.status(200).json({ user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getuserfriend = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ id });
    const friend = await Promise.all(
      user.friends.map((id) => User.findById({ id }))
    );
    const formatted = friend.map(
      (_id, firstname, lastname, occupation, picturepath, location) => {
        return { _id, firstname, lastname, occupation, picturepath, location };
      }
    );
    res.status(200).json({ formatted });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addremovefriend = async (req, res) => {
  try {
    const { id, friendid } = req.params;
    const user = await User.findById({ id });
    const friend = await User.findById({ friendid });

    if (user.friends.includes(friendid)) {
      user.friends = user.friends.filter((id) => id !== friendid);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendid);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById({ id }))
    );
    const formatted = friends.map(
      (_id, firstname, lastname, occupation, picturepath, location) => {
        return { _id, firstname, lastname, occupation, picturepath, location };
      }
    );
    res.status(200).json({ formatted });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
