const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    if (blogs.length > 0) {
        
        return blogs.reduce((accumulate, blog) => accumulate += blog.likes, 0)
    }
    return 0
}

module.exports = {
    dummy, totalLikes
}