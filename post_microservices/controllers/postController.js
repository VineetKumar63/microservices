import axios from "axios";
import prisma from "../config/db.config.js";

const getPost = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({});  // Fetch all posts

    // ////////    method 1       //////////
    // const postByUserId = await Promise.all(
    //   posts.map(async (post) => {
    //     const response = await axios.post(
    //       `${process.env.AUTH_MIROSERVICES_URL}/api/user/getUser/${post.user_id}`
    //     );
    //     return {
    //       ...post,
    //       userData: response.data,
    //     };
    //   })
    // );
    // return res.json({ postByUserId });

    const userIds = posts.map(post => post.user_id);   // Extract user IDs from posts
    const response = await axios.post(
      `${process.env.AUTH_MIROSERVICES_URL}/api/user/getallUser`,
      userIds
    ); // Fetch user data for all users

        ////////* method 2 //////////

    // const users = response.data.users;
    // const postWithUsers = posts.map(post => {
    //   const userByPost = users.find(user => user.id === post.user_id);
    //   return {
    //     ...post,
    //     userByPost
    //   };
    // });

    const users = {};
    response.data.users.forEach(user => {
      users[user.id] = user;
    });
    const postWithUsers = await Promise.all(
      posts.map(post => {
        const user = users[post.user_id];
        return {
          ...post,
          user
        };
      })
    );
    return res.json(postWithUsers);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

const store = async (req, res) => {
  try {
    const authUser = req.user;
    const { content, title } = req.body;
    const posts = await prisma.post.create({
      data: {
        user_id: authUser.id,
        title,
        content,
      },
    });
    return res
      .status(200)
      .json({ message: "Post created successfully", posts });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong during post creation", error });
    }
  };

export { getPost, store };
