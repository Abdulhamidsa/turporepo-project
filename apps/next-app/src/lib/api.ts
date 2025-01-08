import "server-only";

const BASE_URL = "http://localhost:4000/api";

export async function getProjects(page = 1, limit = 12) {
  try {
    const res = await fetch(`${BASE_URL}/projects?page=${page}&limit=${limit}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch projects");

    const response = await res.json();
    const projects = response.data.projects || [];
    const totalPages = Math.ceil(response.data.pagination.total / limit);

    return { projects, totalPages };
  } catch (error) {
    console.error(error);
    return { projects: [], totalPages: 1 }; // Fallback in case of error
  }
}

export async function getUsers(page = 1, limit = 12, search = "") {
  const res = await fetch(`${BASE_URL}/users?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch users");

  const json = await res.json();
  console.log("API Response:", json); // Debug response
  return {
    users: json.data?.users || [],
    total: json.data?.pagination?.total || 0,
  };
}

// Fetch a single user by ID
export async function getUserProfile(friendlyId: string) {
  const res = await fetch(`${BASE_URL}/users/profile/${friendlyId}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  if (!res.ok) throw new Error("Failed to fetch user profile");
  return res.json();
}

// Fetch a single project by ID
// export async function getProject(id: string) {
//   const res = await fetch(`${BASE_URL}/projects/${id}`, {
//     next: { revalidate: 3600 }, // Revalidate every hour
//   });
//   if (!res.ok) throw new Error("Failed to fetch project");
//   return res.json();
// }

// Fetch featured users with a limit on the number of users
// export async function getFeaturedUsers(limit = 3) {
//   const res = await fetch(`${BASE_URL}/users/featured?limit=${limit}`, {
//     next: { revalidate: 3600 }, // Revalidate every hour
//   });
//   if (!res.ok) throw new Error("Failed to fetch featured users");
//   return res.json();
// }

// Fetch featured projects with a limit on the number of projects
// export async function getFeaturedProjects(limit = 3) {
//   const res = await fetch(`${BASE_URL}/projects/featured?limit=${limit}`, {
//     next: { revalidate: 3600 }, // Revalidate every hour
//   });
//   if (!res.ok) throw new Error("Failed to fetch featured projects");
//   return res.json();
// }
