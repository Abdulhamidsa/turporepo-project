import useSWR from "swr";
import { swrFetcher } from "../../../../api/swrFetcher";
import { fetchedProjectSchema, FetchedProjectType } from "@repo/zod/validation";
import { ENDPOINTS } from "@repo/api/endpoints";
import { z } from "zod";

// Adjust schema to accept an array directly
const projectArraySchema = z.array(fetchedProjectSchema);

export const useUserProjects = (friendlyId?: string) => {
  const urlFetch = friendlyId ? `${ENDPOINTS.projects.fetchByFriendlyId}/${friendlyId}` : ENDPOINTS.projects.fetchUserProjects;

  const { data, error: swrError, isLoading, mutate } = useSWR<FetchedProjectType[]>(urlFetch, (endpoint: string) => swrFetcher(endpoint, projectArraySchema, []));
  return {
    projects: data ?? [],
    mutate,
    isLoading,
    error: swrError,
  };
};
