import { Link } from "react-router";

const PostCard = ({ post }) => {
  const {
    authorImage,
    title,
    tag,
    createdAt,
    authorName,
    description,
    upVote,
    downVote,
    voteDifference,
    _id,
  } = post;
  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <Link to={`/postDetails/${_id}`}>
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={authorImage}
                alt={authorName}
                className="w-14 h-14 rounded-full"
              />
              <div>
                <h3 className="font-bold">{authorName}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <h2 className="card-title">{title}</h2>

            <div className="flex gap-4 mt-4">
              <div className="badge badge-outline">{tag}</div>
              <div className="flex items-center gap-1">
                👍 {upVote}
                👎 {downVote}
                <span className="ml-2 font-bold">
                  (Total Vote: {voteDifference})
                </span>
                {/* <span>{comments}</span> */}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default PostCard;
