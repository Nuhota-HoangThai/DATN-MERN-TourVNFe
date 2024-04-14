import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import HTMLRenderer from "../../components/HTML.component/HTML";

const FetchBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/blog/getAllUser`);
      if (!response.ok) throw new Error("Something went wrong!");
      const data = await response.json();
      setBlogs(data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-sky-100 p-8">
      {blogs.length > 0 ? (
        <div className="space-y-10">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  {blog.image ? (
                    <img
                      src={`${BASE_URL}/${blog.image.replace(/\\/g, "/")}`}
                      alt="Blog"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-200 text-gray-500">
                      Không có hình ảnh
                    </div>
                  )}
                </div>
                <div className="p-8 md:w-1/2">
                  <h3 className="mb-4 text-2xl font-bold">{blog.title}</h3>
                  <div className="h-48 overflow-hidden">
                    <HTMLRenderer
                      htmlString={blog.body}
                      className="clamp-4-lines text-gray-700"
                    />
                  </div>
                  <Link
                    to={`/blog/${blog._id}`}
                    className="mt-4 inline-block italic text-blue-500 underline hover:text-blue-700"
                  >
                    Xem thêm
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default FetchBlogs;
