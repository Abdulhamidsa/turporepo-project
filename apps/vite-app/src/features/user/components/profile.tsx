"use client";

import { useState, useEffect } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Pen, Camera, Check } from "lucide-react";
import { useUserProfile } from "../../user/hooks/use.user.profile";
import { Countries } from "@repo/data/constants/countries";
import { Professions } from "@repo/data/constants/professions";

export default function ProfileEdit({ friendlyId }: { friendlyId: string }) {
  const { userProfile, isLoading, error, mutate } = useUserProfile(friendlyId);

  const [editingField, setEditingField] = useState<string | null>(null);
  const [, setUnsavedChanges] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    age: 0,
    bio: "",
    profilePicture: "https://example.com",
    coverImage: "/placeholder.svg?height=200&width=800",
    country: "",
    profession: "",
  });

  useEffect(() => {
    if (userProfile) {
      setProfile({
        username: userProfile.username || "",
        age: userProfile.age || 0,
        bio: userProfile.bio || "",
        profilePicture: userProfile.profilePicture || "https://example.com",
        coverImage: userProfile.coverImage || "/placeholder.svg?height=200&width=800",
        country: userProfile.country || "",
        profession: userProfile.profession || "",
      });
    }
  }, [userProfile]);

  const handleEdit = (field: string) => {
    setUnsavedChanges(false);
    setEditingField(field);
  };

  const handleChange = (field: string, value: string) => {
    setUnsavedChanges(true);
    setProfile((prev) => ({
      ...prev,
      [field]: field === "age" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSave = async () => {
    setEditingField(null);
    try {
      const response = await fetch("http://localhost:4000/api/internal/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to update profile");
      await mutate(); // Re-fetch updated profile
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to save changes.");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, field: "profilePicture" | "coverImage") => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-8">
            <img src={profile.coverImage} alt="Cover" className="w-full h-48 object-cover rounded-t-lg" />
            <label htmlFor="cover-upload" className="absolute bottom-2 right-2 cursor-pointer">
              <Camera className="h-6 w-6 text-white" />
              <input id="cover-upload" type="file" className="hidden" onChange={(e) => handleImageUpload(e, "coverImage")} accept="image/*" />
            </label>
          </div>
          <div className="flex items-center mb-6">
            <div className="relative">
              <img src={profile.profilePicture} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white -mt-12" />
              <label htmlFor="profile-upload" className="absolute bottom-0 right-0 cursor-pointer">
                <Camera className="h-5 w-5 text-gray-600" />
                <input id="profile-upload" type="file" className="hidden" onChange={(e) => handleImageUpload(e, "profilePicture")} accept="image/*" />
              </label>
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{profile.username}</h2>
              <p className="text-gray-600">{profile.profession}</p>
            </div>
          </div>
          <div className="space-y-6">
            {Object.entries(profile).map(([key, value]) => {
              if (key === "profilePicture" || key === "coverImage") return null;
              return (
                <div key={key} className="flex items-center justify-between bg-muted rounded-lg p-3">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-400 mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    {editingField === key ? (
                      key === "bio" ? (
                        <Textarea value={value} onChange={(e) => handleChange(key, e.target.value)} className="mt-1" />
                      ) : key === "country" || key === "profession" ? (
                        <Select onValueChange={(value) => handleChange(key, value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={value} />
                          </SelectTrigger>
                          <SelectContent className="bg-card text-card-foreground max-h-60 overflow-y-auto z-50">
                            {(key === "country" ? Countries : Professions).map((item) => (
                              <SelectItem key={item.value} value={item.value} className="cursor-pointer hover:bg-muted hover:text-primary rounded px-2 py-1">
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input value={value} onChange={(e) => handleChange(key, e.target.value)} className="mt-1" />
                      )
                    ) : (
                      <p className="mt-1">{value}</p>
                    )}
                  </div>
                  {editingField === key && (
                    <Button variant="ghost" size="icon" onClick={() => setEditingField(null)} className="text-primary">
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  {!editingField && (
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(key)}>
                      <Pen className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
