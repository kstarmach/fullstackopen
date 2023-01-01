import { useState } from "react"
const Blog = ({ blog, increaseLike, removeBlog }) => {
    const [viewDetails, setViewDetails] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }
    return (
        <li style={blogStyle}>
            <div>{blog.title} </div>
            <div>{blog.author}</div>

            {viewDetails ?
                <div>
                    <BlogDetails
                        key={blog.id}
                        blog={blog}
                        increaseLike={increaseLike}
                        removeBlog={removeBlog}
                    />
                    <button onClick={() => setViewDetails(false)}>close</button>
                </div>
                : <button onClick={() => setViewDetails(true)}>show</button>}

        </li>
    )
}

const BlogDetails = ({ blog, increaseLike, removeBlog }) => {

    return (
        <div>
            <div>{blog.url}</div>
            <div>{blog.likes} <button onClick={() => increaseLike(blog)}>like</button></div>
            <div>{blog.author}</div>
            {/* {blog.user.username === JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username ?
                : ''} */}

            <button onClick={() => removeBlog(blog)}>remove</button>
        </div>
    )
}

export default Blog