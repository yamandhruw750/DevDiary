import service from "@/appwrite/config";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "./ui/card";

function PostCard($id, title, featuredImage) {
  return (
    <Link to={`/post/${$id}`}>
      <Card>
        {/* Post Image */}
        <img
          src={service.getFilePreview(featuredImage)}
          alt={title}
          className="h-25 w-full object-cover"
        />
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default PostCard;
