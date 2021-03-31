const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res) => {
  const notes = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  res.json(notes);
});

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body;
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  const blog = await Blog.findById(req.params.id);
  if (decodedToken.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } else {
    next();
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body;
  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updatedBlog);
});

module.exports = blogsRouter;
