import { useEffect, useState } from "react";
import service from "@/appwrite/config";
import { Container, PostCard, Hero } from "@/components/index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PostCardSkeleton from "@/components/Skeleton";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus) {
      service.getPosts().then((post) => {
        if (post) {
          setPosts(post.documents);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [authStatus]);

  //It is just a loading skeleton
  if (loading) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {Array.from({ length: 8 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        </Container>
      </div>
    );
  }
  //It runs when not logged in !!
  if (!authStatus) {
    return <Hero />;
  }

  //It runs when logged in and no posts are there !!
  if (authStatus) {
    return (
      <Container>
        <h2 className="text-xl font-semibold">
          No posts yet. Start writing your first post 🚀
        </h2>
      </Container>
    );
  }

  //It runs when logged in and posts are there !!
  if (!posts?.length === 0) {
    return (
      <Container>
        <div className="flex">
          {posts?.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    );
  }
}

export default Home;
