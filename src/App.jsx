import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try{
      const user = await blogService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      const allBLogs = await blogService.getAll();
      setBlogs(allBLogs)

      setNotification('Logged in successfully')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      console.log('wrong credentials')
      setError('wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setNotification('Logged out successfully')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title,
        author,
        url,
        likes
      }

      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))

      setNotification('New blog created successfully')
      setTimeout(() => {
        setNotification(null)
      },5000)
    } catch (exception) {
      console.log('Something wend wrong with creating a new blog', exception)
      setError('Something went wrong with creating a new blog')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  const allBlogs = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const createForm = () => {
    return (
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={(event) => setAuthor(event.target.value)} 
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={(event) => setUrl(event.target.value)} 
          />
        </div>
        <div>
          likes:
          <input
            type="number"
            value={likes}
            name="Likes"
            onChange={(event) => setLikes(event.target.value)} 
          />
        </div>
        <button type="submit">create</button>
      </form>
    )
  }

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      const allBLogs = await blogService.getAll();
      setBlogs(allBLogs)
    }
  }, [])

  return (
    <div>
      {error && <Error error={error} />}
      {notification && <Notification notification={notification} />}

      {user && <button onClick={handleLogOut}>logout</button>}
      {user && <p>{user.name} logged in</p>}
      {user && createForm()}
      {user === null ?
        loginForm() :
        allBlogs()
      }
    </div>
  )
}

export default App