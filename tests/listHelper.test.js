const listHelper = require('../utils/list_helper')

describe('one', () => {
  test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})


describe('total likes', () => {
  test('of empty list return zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const list = [{likes: 10}]
    const result = listHelper.totalLikes(list)
    expect(result).toBe(list[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    const list = [{likes: 10},{likes: 20}]
    const result = listHelper.totalLikes(list)
    expect(result).toBe(30)
  })


})
