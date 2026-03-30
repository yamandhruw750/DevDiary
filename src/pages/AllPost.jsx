import { useState, useEffect } from "react";
import service from "@/appwrite/config";
import { PostCard, Container } from "@/components/index";

function AllPost() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = () =>
      service.getPosts().then((posts) => {
        if (posts) {
          setPost(posts.documents || []);
        }
      });
    fetchPost();
  }, []);

  return (
    <div>
      <Container>
        <div className="flex flex-wrap">
          {posts?.map((post) => (
            <div key={post.$id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
