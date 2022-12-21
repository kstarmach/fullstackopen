import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notifiaction from './components/Notification'

import blogService from './services/blogs'
import loginServices from './services/login'


const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNotification = (message, errorType) => {

    setErrorMessage({ message: message, errorType: errorType })

    setTimeout(() => {
      setErrorMessage(null)

    }, 5000)

  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginServices.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      handleNotification('successfully log-in', 'success')
    } catch (exception) {
      handleNotification(exception.response.data.error, 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
    handleNotification('successfully log-out', 'success')

  }

  const blogFormRef = useRef()

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))


        handleNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success')
      })
      .catch(exception => {
        handleNotification(exception.response.data.error, 'error')
      })
  }

  const updateBlog = (updatedBlog) => {
    blogService
      .update(updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog))
      })
      .catch(exception => {
        handleNotification(exception.response.data.error, 'error')
      })
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(blog.id)
        .then(result => {
          setBlogs(blogs.filter(obj => obj.id !== blog.id))
          handleNotification(`blog successfully removed`, 'success')
        })
        .catch(exception => {
          handleNotification(exception.response.data.error, 'error')
        })
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notifiaction
        message={errorMessage}
      />
      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </Togglable> :
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>

            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
            />

          )}
        </div>
      }
    </div>
  )
}

export default App
