import { fetchedProjectSchema, FetchedProjectType } from "@repo/zod/validation";
import useSWR from "swr";
import { swrFetcher } from "../../api/swrFetcher";

export const useAllProjects = (page: number, limit: number) => {
  const urlFetch = `http://localhost:4000/api/public/all/?limit=${limit}&page=${page}`;

  const { data, mutate, error } = useSWR<FetchedProjectType[]>(urlFetch, (endpoint: string) => swrFetcher(endpoint, fetchedProjectSchema.array()));

  return {
    projects: data || [],
    mutate,
    error,
  };
};
