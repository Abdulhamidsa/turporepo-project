import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Pen, Camera, Check } from "lucide-react";
import { useUserProfile, useUpdateUserProfile } from "../../user/hooks/use.user.profile";
import { Countries } from "@repo/data/constants/countries";
import { Professions } from "@repo/data/constants/professions";
import YearPicker from "../../../components/YearPicker";
import { ProfileType } from "@repo/data/types/user";
import { defaultUserProfile } from "@repo/zod/validation/user";

export default function ProfileEdit() {
  const { userProfile, mutate } = useUserProfile();
  const { updateProfile } = useUpdateUserProfile();

  const [editingField, setEditingField] = useState<string | null>(null);
  const [editableProfile, setEditableProfile] = useState<Partial<ProfileType>>({});

  const handleEdit = (field: keyof typeof userProfile) => {
    setEditingField(field);
    setEditableProfile((prev) => ({ ...prev, [field]: userProfile[field] }));
  };
  const handleChange = (field: keyof typeof userProfile, value: string | number | null) => {
    const normalizedValue = value === null || typeof value === "boolean" ? undefined : value;
    setEditableProfile((prev) => ({ ...prev, [field]: normalizedValue }));
  };

  const handleSave = async () => {
    setEditingField(null);
    try {
      const updatedProfile: ProfileType = {
        ...userProfile,
        ...editableProfile,
        username: editableProfile.username ?? userProfile?.username ?? null,
        profileComplete: editableProfile.profileComplete ?? userProfile?.profileComplete ?? false,
        bio: editableProfile.bio ?? userProfile?.bio ?? null,
        birthYear: editableProfile.birthYear ?? userProfile?.birthYear ?? null,
        country: editableProfile.country ?? userProfile?.country ?? null,
        profession: editableProfile.profession ?? userProfile?.profession ?? undefined,
        createdAt: userProfile?.createdAt ?? new Date().toISOString(),
        profilePicture: editableProfile.profilePicture ?? userProfile?.profilePicture ?? undefined,
        coverImage: editableProfile.coverImage ?? userProfile?.coverImage ?? undefined,
      };

      await updateProfile(updatedProfile);
      await mutate(); // Re-fetch updated data
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
        setEditableProfile((prev) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const profileData = { ...defaultUserProfile, ...(userProfile || {}), ...(editableProfile || {}) };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-8">
            <img src={profileData.coverImage} alt="Cover" className="w-full h-48 object-cover rounded-t-lg" />
            <label htmlFor="cover-upload" className="absolute bottom-2 right-2 cursor-pointer">
              <Camera className="h-6 w-6 text-white" />
              <input id="cover-upload" type="file" className="hidden" onChange={(e) => handleImageUpload(e, "coverImage")} accept="image/*" />
            </label>
          </div>
          <div className="flex items-center mb-6">
            <div className="relative">
              <img src={profileData.profilePicture ?? "/placeholder.png"} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white -mt-12" />
              <label htmlFor="profile-upload" className="absolute bottom-0 right-0 cursor-pointer">
                <Camera className="h-5 w-5 text-gray-600" />
                <input id="profile-upload" type="file" className="hidden" onChange={(e) => handleImageUpload(e, "profilePicture")} accept="image/*" />
              </label>
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{profileData.username}</h2>
              <p className="text-gray-600">{profileData.profession}</p>
            </div>
          </div>
          <div className="space-y-6">
            {Object.entries(profileData as Partial<ProfileType>).map(([key, value]) => {
              if (["profilePicture", "coverImage", "createdAt", "profileComplete"].includes(key)) return null;

              return (
                <div key={key} className="flex items-center justify-between bg-muted rounded-lg p-3">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-400 mb-1">{key === "birthYear" ? "Birth Year" : key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    {editingField === key ? (
                      key === "bio" ? (
                        <Textarea value={typeof value === "string" ? value : ""} onChange={(e) => handleChange(key as keyof typeof profileData, e.target.value)} className="mt-1" />
                      ) : key === "country" || key === "profession" ? (
                        <Select onValueChange={(val) => handleChange(key as keyof typeof profileData, val)} value={typeof value === "string" ? value : ""}>
                          <SelectTrigger className="w-full">
                            <SelectValue>{value ? (key === "country" ? Countries.find((c) => c.value === value)?.label : Professions.find((p) => p.value === value)?.label) : "Select"}</SelectValue>
                          </SelectTrigger>
                          <SelectContent className="bg-card text-card-foreground max-h-60 overflow-y-auto z-50">
                            {(key === "country" ? Countries : Professions).map((item) => (
                              <SelectItem key={item.value} value={item.value} className="cursor-pointer hover:bg-muted hover:text-primary rounded px-2 py-1">
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : key === "birthYear" ? (
                        <YearPicker value={typeof value === "number" ? value : null} onChange={(year) => handleChange(key as keyof typeof profileData, year)} />
                      ) : (
                        <Input value={typeof value === "string" || typeof value === "number" ? value : ""} onChange={(e) => handleChange(key as keyof typeof profileData, e.target.value)} className="mt-1" />
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
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(key as keyof typeof profileData)}>
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
