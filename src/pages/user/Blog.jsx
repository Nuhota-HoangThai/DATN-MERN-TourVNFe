import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import DOMPurify from "dompurify";

const FetchBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const fetchBlogs = async (page = 1) => {
    setLoading(true); // Đặt lại trạng thái loading mỗi khi fetch
    try {
      const response = await fetch(
        `${BASE_URL}/blog/getAllLimit?page=${page}&limit`,
      );
      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();
      setBlogs(data.data);
      setPageInfo({
        currentPage: page,
        totalPages: data.totalPages,
      }); // Cập nhật tổng số trang từ API
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    fetchBlogs(newPage);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {blogs.length > 0 ? (
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id}>
              <h3 className="px-20 py-10 text-4xl font-bold">{blog.title}</h3>
              <p
                className="px-20 text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blog.body),
                }}
              ></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Công ty chúng tôi hiện đang cập nhật tin tức mới.</p>
      )}
      {/* phân trang */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: pageInfo.totalPages }, (_, i) => i + 1).map(
          (pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`mx-1 rounded bg-gray-500 px-4 py-2 text-white ${pageInfo.currentPage === pageNum ? "bg-gray-700" : ""}`}
            >
              {pageNum}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default FetchBlogs;
