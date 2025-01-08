import React, { useState, FormEvent } from "react";
import { addComment } from "../../../../services/postService";
import { CommentType } from "@repo/zod/validation/post";

type CommentBoxProps = {
  postId: string;
  onCommentAdded?: (newComments: CommentType[]) => void;
};

export const CommentBox: React.FC<CommentBoxProps> = ({ postId, onCommentAdded }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const maxLength = 250; // Max comment length

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    if (text.length > maxLength) {
      setError(`Comment exceeds the ${maxLength} character limit.`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await addComment(postId, text);
      const updatedPost = res.data.post; // typed as PostType
      const updatedComments = updatedPost.comments; // typed as CommentType[]

      // Clear the input
      setText("");

      // Notify parent of the new comments
      if (onCommentAdded) {
        onCommentAdded(updatedComments);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add your comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex items-center space-x-2">
        <input className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Add a comment..." value={text} onChange={(e) => setText(e.target.value)} maxLength={maxLength} />
        <button type="submit" className={`px-4 py-2 rounded-lg text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`} disabled={loading}>
          {loading ? "Posting..." : "Comment"}
        </button>
      </div>

      <div className="text-sm text-gray-500">
        {text.length}/{maxLength}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};
