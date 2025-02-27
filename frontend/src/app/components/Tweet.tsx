import React from "react";

interface TweetProps {
  username: string;
  content: string;
  timestamp: string;
  avatar: string;
}

const Tweet: React.FC<TweetProps> = ({
  username,
  content,
  timestamp,
  avatar,
}) => {
  return (
    <div className="border-b border-gray-200 p-4 w-full">
      <div className="flex items-center">
        <div className="mr-2">
          <img
            src={avatar}
            alt={`${username} avatar`}
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div>
          <p className="font-semibold">{username}</p>
          <p className="mt-2">{content}</p>
          <p className="text-sm text-gray-500">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
