import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })

        setAuthor("")
        setTitle("")
        setUrl("")
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        id='title'
                        placeholder="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        id='author'
                        placeholder='Author'
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        id='url'
                        placeholder='Url'
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type='submit' id='create_new_blog'>create</button>
            </form>
        </div>
    )
}

export default BlogForm