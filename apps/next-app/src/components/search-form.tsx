"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";

export function SearchForm() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`?search=${encodeURIComponent(search)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      <Button type="submit">Search</Button>
    </form>
  );
}
