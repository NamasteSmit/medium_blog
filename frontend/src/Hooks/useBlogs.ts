import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";


const useBlog = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

    console.log("loading",blogs)
  useEffect(() => {
    getAllBlogs();
  }, []);

  const getAllBlogs = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/blog/bulk`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${localStorage.getItem("Token")}`
        }
      });
      const data = await response.json();
      setBlogs(data.posts);
      setLoading(false);
      console.log("allblogs", data);
    } catch (err) {
        console.error("Error fetching blogs", err);
    }
  };
  return { loading, blogs };
};

export default useBlog;
