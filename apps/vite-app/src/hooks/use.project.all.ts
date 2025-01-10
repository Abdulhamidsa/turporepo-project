import { fetchedProjectSchema, FetchedProjectType } from "@repo/zod/validation";
import useSWR from "swr";
import { swrFetcher } from "../../api/swrFetcher";
import { ENDPOINTS } from "@repo/api/endpoints";

/**
 * Hook for fetching all projects with pagination.
 */
export const useAllProjects = (page: number, limit: number) => {
  // Dynamically construct the URL using the ENDPOINTS object
  const urlFetch = `${ENDPOINTS.projects.fetchAll}?limit=${limit}&page=${page}`;

  const { data, mutate, error, isLoading } = useSWR<FetchedProjectType[]>(urlFetch, (endpoint: string) => swrFetcher(endpoint, fetchedProjectSchema.array()));
  return {
    projects: data || [], // Ensure a fallback to an empty array
    mutate,
    error,
    isLoading,
  };
};
