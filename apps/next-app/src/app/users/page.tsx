import Link from "next/link";
// import { Card, CardContent } from "@repo/ui/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import { SearchForm } from "../../components/search-form";
import { getUsers } from "../../lib/api";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { User } from "../../types";

export const dynamic = "force-dynamic";
export default async function UsersPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const page = parseInt((searchParams?.page as string) || "1", 10); // Default to 1 if undefined
  const search = (searchParams?.search as string) || ""; // Default to empty string if undefined

  const { users, total } = await getUsers(page, 12, search);
  const totalPages = Math.ceil(total / 12);
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">All Professionals</h1>
      <SearchForm />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {users.map((user: User) => (
          <Link href={`/user/${user.friendlyId}`} key={user.id}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.profilePicture || "/default-avatar.png"} alt={user.username || "User"} />
                    <AvatarFallback>{(user.username?.slice(0, 1) || "U").toUpperCase()}</AvatarFallback>
                  </Avatar>

                  <div>
                    <h2 className="font-semibold">{user.username}</h2>
                    <p className="text-sm text-muted-foreground">{user.profession}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        {page > 1 && (
          <Link href={`/users?page=${page - 1}&search=${search}`}>
            <Button>Previous</Button>
          </Link>
        )}
        {page < totalPages && (
          <Link href={`/users?page=${page + 1}&search=${search}`}>
            <Button>Next</Button>
          </Link>
        )}
      </div>
      <p className="text-center mt-4">{/* Page {page} of {totalPages} */}</p>
    </div>
  );
}
