const PostCard = ({ post }) => {
  const { authorImage, title, tag, createdAt, authorName } = post;
  return (
    <>
      <div className="border p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={authorImage}
            alt={authorName}
            className="w-12 h-12 rounded-full"
          />

          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500"># {tag}</span>

            <span className="text-sm text-gray-500">
              Posted on: {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
