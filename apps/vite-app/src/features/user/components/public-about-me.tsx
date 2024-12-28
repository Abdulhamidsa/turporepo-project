import { Card, CardContent } from "@repo/ui/components/ui/card";

export function PublicAboutMe() {
  const about = `With over 5 years of experience in web development, I specialize in creating robust and scalable web applications. 
My expertise includes React, Node.js, and cloud technologies. I'm passionate about clean code, user experience, 
and staying up-to-date with the latest industry trends.

Key Skills:
• Frontend: React, Next.js, TypeScript
• Backend: Node.js, Express, GraphQL
• Database: MongoDB, PostgreSQL
• Cloud: AWS, Docker, Kubernetes
• Testing: Jest, Cypress

I'm always open to new opportunities and collaborations. Feel free to reach out if you'd like to discuss a project 
or potential role!`;

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">About Me</h2>
        <div className="whitespace-pre-wrap">{about}</div>
      </CardContent>
    </Card>
  );
}
