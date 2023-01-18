import { useSelector } from 'react-redux';
const Blog = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <div>{blog.title} </div>
          <div>{blog.author}</div>
          {/* <div>
              <BlogDetails key={blog.id} blog={blog} />
            </div> */}
        </li>
      ))}
    </ul>
  );
};

// const BlogDetails = ({ blog }) => {
//   console.log(blog);
//   return (
//     <div>
//       <div>{blog.url}</div>
//       <div>
//         {/* {blog.likes} <button onClick={() => increaseLike(blog)}>like</button> */}
//       </div>
//       <div>{blog.author}</div>
//       {/* {blog.user.username === JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username ?
//                 : ''} */}

//       {/* <button onClick={() => removeBlog(blog)}>remove</button> */}
//     </div>
//   );
// };

export default Blog;
