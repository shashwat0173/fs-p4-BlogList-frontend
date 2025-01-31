import { useState } from "react"

const Blog = ({ blog, increaseLike, deleteBlog }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible? 'none' : ''}
  const showWhenVisible = {display: visible? '' : 'none'}
  
  const toggleVisible = () => {
    setVisible(!visible);
  }

  const delBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      deleteBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style = {blogStyle}>
      <div style={{display : 'inline-block', marginRight: 5}}>
        {blog.title} {blog.author} 
      </div>
      <div style={{display : 'inline-block'}}>
        <button style={hideWhenVisible} onClick={toggleVisible}> show </button>
        <button style={showWhenVisible} onClick={toggleVisible}> hide </button>
      </div>
      <div style = {showWhenVisible}> 
        {blog.url} <br />
        likes {blog.likes} <button onClick= { () => increaseLike(blog.id)}> like </button> <br />
        {blog.author} <br />
        <div style={{display: blog.user.username === window.localStorage.getItem('loggedBlogappUser').name ? '' : 'none' }}>
          <button onClick={() => delBlog(blog)}>delete</button>
        </div>
      </div>
        
    </div>  
  )
}

export default Blog