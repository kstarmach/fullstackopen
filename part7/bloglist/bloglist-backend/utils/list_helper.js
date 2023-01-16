const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length > 0) {
        return blogs.reduce((accumulate, blog) => accumulate += blog.likes, 0)
    }
    return 0
}

const favoriteBlog = (blogs) => {
    if (blogs.length > 0) {
        const max = blogs.reduce((prev, curr) => (prev.likes > curr.likes) ? prev : curr)
        return {
            title: max.title,
            author: max.author,
            likes: max.likes
        }
    }
    return {}
}


module.exports = {
    dummy, totalLikes, favoriteBlog
}