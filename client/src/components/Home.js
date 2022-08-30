import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [posts, setPosts] = useState([]);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:3000/posts/");
    console.log(res.data);
    setPosts(res.data);
  };

  return (
    <div>
      {posts.map((post) => {
        return <div key={post._id}>{post.text}</div>;
      })}
    </div>
  );
}

export default Home;
