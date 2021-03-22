const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc,cur) => {
    return acc += cur.likes
  },0)
}

const favoriteBlog = (blogs) => {
  let max = blogs.sort((a,b) => {
    return b.likes - a.likes
  })
  return max[0]
}

const mostBlogs = blogs => {
  const arr = []
  blogs.forEach((item, idx) => {
    let target = arr.find(i => i.author === item.author)
    target ? target.count += 1 : arr.push({...item, count: 1})
  })
  const sorted = arr.sort((a,b) => {
    return b.count - a.count
  })
  return {
    author: sorted[0].author,
    blogs: sorted[0].count,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}