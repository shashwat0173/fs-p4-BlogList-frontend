import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
  
  const increaseLike = async (id) => {
    await blogService.increaseLike(id)
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }

  const deleteBlog = async (id) => {
    await blogService.deleteBlog(id)
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }

  const allBlogs = () => (
    <div>
      <h2>blogs</h2>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} increaseLike={increaseLike} deleteBlog={deleteBlog}/>
      )}
    </div>
  )

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs)
    }
  }, [])

  return (
    <div>
      {error && <Error error={error} />}
      {notification && <Notification notification={notification} />}

      {user && <p>{user.name} logged in</p>}
      {user && <button onClick={handleLogOut}>logout</button>}
      {user && 
        <Togglable buttonLabel="create new blog" cancelLabel="cancel" >
          <CreateForm setBlogs={setBlogs} setNotification={setNotification} setError={setError}/>
        </Togglable>
      }
      {user === null ?
        loginForm() :
        allBlogs()
      }
    </div>
  )
}

export default App