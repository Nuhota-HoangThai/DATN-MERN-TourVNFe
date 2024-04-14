// BlogDetail.jsx
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import axios from "axios";
import HTMLRenderer from "../../components/HTML.component/HTML";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/blog/detail/${id}`);
        //console.log(data);
        setBlog(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogDetail();
  }, [id]);

  return (
    <div className="flex justify-center">
      {blog ? (
        <div className="p-8">
          <h2 className="text-2xl font-bold">{blog.title}</h2>
          <HTMLRenderer htmlString={blog.body} />
        </div>
      ) : (
        <p>Đang tải...</p>
      )}
    </div>
  );
};

export default BlogDetail;
