import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Pen, Check, Loader } from "lucide-react";
import { useUserProfile, useUpdateUserProfile } from "../features/user/hooks/use.user.profile";
import { Countries } from "@repo/data/constants/countries";
import { Professions } from "@repo/data/constants/professions";
import AgePicker from "../components/AgePicker";
import { EditableProfileType, ProfileType } from "@repo/data/types/user";
import { defaultUserProfile } from "@repo/zod/validation/user";
import { showToast } from "@repo/ui/components/ui/toaster";

export default function ProfileInfo() {
  const { userProfile, mutate } = useUserProfile();
  const { updateProfile } = useUpdateUserProfile();

  const [activeTab, setActiveTab] = useState("personalInfo");
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editableProfile, setEditableProfile] = useState<Partial<ProfileType>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const profileData: ProfileType = {
    ...defaultUserProfile,
    ...(userProfile as ProfileType), // Assert userProfile conforms to ProfileType
    ...editableProfile,
  };

  const handleEdit = (field: keyof ProfileType) => {
    setEditingField(field);
    setEditableProfile((prev) => ({ ...prev, [field]: (userProfile as ProfileType)?.[field] ?? null })); // Handle optional fields
  };

  const handleChange = (field: keyof ProfileType, value: string | number | null) => {
    setEditableProfile((prev) => ({ ...prev, [field]: value ?? undefined }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const modifiedFields: EditableProfileType = Object.fromEntries(Object.entries(editableProfile).filter(([key, value]) => value !== (userProfile as Partial<ProfileType>)[key as keyof ProfileType] && value !== undefined));

      if (Object.keys(modifiedFields).length > 0) {
        const updatedProfile: ProfileType = {
          ...profileData,
          ...modifiedFields,
        };

        await updateProfile(updatedProfile);
        await mutate();
        showToast("Profile updated successfully!");
        setIsDirty(false);
      } else {
        showToast("No changes to save.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      showToast("Failed to save changes.");
    } finally {
      setIsSaving(false);
      setEditingField(null);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setEditingField(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
        </CardHeader>
        <Tabs defaultValue="personalInfo" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex justify-start pl-6 pb-2 bg-transparent">
            <TabsTrigger value="personalInfo" className={`px-6 py-2 ${activeTab === "personalInfo" ? "border-b-2 border-primary" : ""}`}>
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="credentials" className={`px-6 py-2 ${activeTab === "credentials" ? "border-b-2 border-primary" : ""}`}>
              Credentials
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personalInfo">
            <CardContent>
              <div className="space-y-6">
                {Object.entries(profileData).map(([key, value]) => {
                  if (["profilePicture", "coverImage", "createdAt", "profileComplete", "email", "password", "friendlyId"].includes(key)) return null;

                  return (
                    <div key={key} className="flex items-center justify-between bg-muted text-muted-foreground rounded-lg p-3">
                      <div className="w-full">
                        <label className="block text-sm font-medium text-muted-foreground mb-1">{key === "age" ? "Age" : key.charAt(0).toUpperCase() + key.slice(1)}</label>
                        {editingField === key ? (
                          key === "bio" ? (
                            <Textarea value={(value as string) || ""} onChange={(e) => handleChange(key as keyof ProfileType, e.target.value)} onKeyDown={handleKeyDown} className="mt-1 bg-card text-card-foreground border border-border" />
                          ) : key === "countryOrigin" || key === "profession" ? (
                            <Select onValueChange={(val) => handleChange(key as keyof ProfileType, val)} value={(value as string) || ""}>
                              <SelectTrigger className="w-full bg-card text-card-foreground">
                                <SelectValue>{key === "countryOrigin" ? Countries.find((c) => c.value === value)?.label || "Select" : Professions.find((p) => p.value === value)?.label || "Select"}</SelectValue>
                              </SelectTrigger>
                              <SelectContent className="bg-card text-card-foreground max-h-60 overflow-y-auto z-50">
                                {(key === "countryOrigin" ? Countries : Professions).map((item) => (
                                  <SelectItem key={item.value} value={item.value} className="cursor-pointer hover:bg-muted hover:text-primary rounded px-2 py-1 pr-10">
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : key === "age" ? (
                            <AgePicker value={(value as number) || null} onChange={(age) => handleChange(key as keyof ProfileType, age)} />
                          ) : (
                            <Input value={(value as string | number) || ""} onChange={(e) => handleChange(key as keyof ProfileType, e.target.value)} onKeyDown={handleKeyDown} className="mt-1 bg-card text-card-foreground border border-border" />
                          )
                        ) : (
                          <p className="mt-1">{key === "age" && value === 0 ? "" : value}</p>
                        )}
                      </div>
                      {editingField === key && (
                        <Button variant="ghost" size="icon" onClick={() => setEditingField(null)} className="text-primary hover:text-primary-foreground mt-4 ml-2 flex items-center">
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      {editingField !== key && (
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(key as keyof ProfileType)} className="mt-4 ml-2 text-muted-foreground hover:text-foreground flex items-center">
                          <Pen className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
        {isDirty && (
          <div className="fixed bottom-4 right-4">
            <Button onClick={handleSave} className="bg-primary hover:bg-accent text-primary-foreground" disabled={isSaving}>
              {isSaving ? <Loader className="animate-spin h-5 w-5" /> : "Save Changes"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
