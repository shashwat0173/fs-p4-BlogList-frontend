import {useState} from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const CreateForm = ({setBlogs, setNotification, setError}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState(0)

    const handleCreate = async (event) => {
        event.preventDefault()
        try {
          console.log('title', title);
          const newBlog = {
            title,
            author,
            url,
            likes
          }
    
          const createdBlog = await blogService.create(newBlog)
          setBlogs(blogs => blogs.concat(createdBlog))
    
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

CreateForm.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
}

export default CreateForm