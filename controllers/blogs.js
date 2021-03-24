const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
 
blogsRouter.get('/', (req, res) => {
  Blog.find({})
    .then(notes => {
      res.json(notes)
    })
})

blogsRouter.post('/', (req, res, next) => {
  const body = req.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog.save()
    .then(savedBlog =>{
      res.json(savedBlog)
    })
    .catch(err => next(err))
})

blogsRouter.delete('/:id',  (req, res, next) => {
   Blog.findByIdAndRemove(req.params.id).then(() => {
     res.status(204).end()
   })
})

blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(updatedBlog)

})




module.exports = blogsRouter