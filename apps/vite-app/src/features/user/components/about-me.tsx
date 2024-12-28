"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Pencil } from "lucide-react";

interface AboutMeProps {
  isPublicView: boolean;
}

export function AboutMe({ isPublicView }: AboutMeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(`With over 5 years of experience in web development, I specialize in creating robust and scalable web applications. 
My expertise includes React, Node.js, and cloud technologies. I'm passionate about clean code, user experience, 
and staying up-to-date with the latest industry trends.

Key Skills:
• Frontend: React, Next.js, TypeScript
• Backend: Node.js, Express, GraphQL
• Database: MongoDB, PostgreSQL
• Cloud: AWS, Docker, Kubernetes
• Testing: Jest, Cypress

I'm always open to new opportunities and collaborations. Feel free to reach out if you'd like to discuss a project 
or potential role!`);

  const handleSave = () => {
    console.log("Updated about:", about);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">About Me</CardTitle>
        {!isPublicView && !isEditing && (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing && !isPublicView ? (
          <>
            <Textarea value={about} onChange={(e) => setAbout(e.target.value)} className="mb-4" rows={10} />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </>
        ) : (
          <div className="prose dark:prose-invert max-w-none">
            {about.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
