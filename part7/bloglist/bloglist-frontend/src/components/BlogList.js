import { useSelector } from 'react-redux';
const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <table>
      <thead>
        <tr>
          <th>tittle</th>
          <th>author</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog) => (
          <tr key={blog.id}>
            <td>{blog.title} </td>
            <td>{blog.author}</td>
            <td></td>
            {/* <div>
              <BlogDetails key={blog.id} blog={blog} />
            </div> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlogList;
