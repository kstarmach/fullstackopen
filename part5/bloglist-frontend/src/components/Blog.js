import { useState } from "react"


const Blog = ({ blog, updateBlog }) => {
  const [viewDetails, setViewDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}

      {viewDetails ?
        <div>
          <BlogDetails
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
          />
          <button onClick={() => setViewDetails(false)}>close</button>
        </div>
        : <button onClick={() => setViewDetails(true)}>show</button>}

    </div>
  )
}

const BlogDetails = ({ blog, updateBlog }) => {

  const increaseLike = () => {
    blog.likes += 1
    updateBlog(blog)
  }

  return (
    <div>
      <div>{blog.url}</div>
      <div>{blog.likes} <button onClick={() => increaseLike()}>like</button></div>
      <div>{blog.author}</div>
    </div>
  )
}

export default Blog