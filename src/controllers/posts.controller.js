import mongoose from "mongoose";
import Post from '../models/post.model.js';


export const createPost = async (req, res) => {
    const { title, content, image } = req.body;

    try {
        const newPost = new Post({ title, content, image });

        // Save the new post in the database
        const postSaved = await newPost.save();

        res.status(201).json(postSaved);

    } catch (error) {
        res.status(500).json({ message: 'Error creating post' });
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error getting posts' });
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error getting post' });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post' });
    }
};

export const updatePost = async (req, res) => {
    const { title, content, image } = req.body;
    const postId = req.params.id;

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title, content, image },
            { new: true } // Return the updated post
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post' });
    }
};
