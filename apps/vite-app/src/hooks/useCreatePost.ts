import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { request } from "../../api/request";
import { ENDPOINTS } from "@repo/api/endpoints";

export const PostSchema = z.object({
  content: z.string().optional(),
  image: z.string().optional(),
});

type PostData = z.infer<typeof PostSchema>;
type PostPayload = { content: string; image?: string };

export const usePostSubmit = () => {
  // Mutation fetcher logic for submitting the post
  const mutationFetcher = async (url: string, { arg }: { arg: PostPayload }) => {
    const response = await request<PostData>("POST", url, arg);
    if (!response) {
      throw new Error("Failed to create post");
    }
    return response;
  };

  const { trigger, isMutating, error } = useSWRMutation<PostData, Error, string, PostPayload>(ENDPOINTS.posts.post, mutationFetcher);

  return { trigger, isMutating, error };
};
