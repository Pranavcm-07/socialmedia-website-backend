import mongoose from "mongoose";
const postschema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturepath: String,
    userpicturepath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postschema);

export default Post;
