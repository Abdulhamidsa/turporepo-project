import { useState, useEffect } from "react";
import Select from "react-select";
import { Button } from "@repo/ui/components/ui/button";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { useUserProfile } from "../../user/hooks/use.user.profile";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function ProfilePage({ mongo_ref }: { mongo_ref: string }) {
  const { userProfile, isLoading, error } = useUserProfile(mongo_ref);
  const [isEditable, setIsEditable] = useState(false);
  const [countries, setCountries] = useState<{ value: string; label: string }[]>([]);
  const [professions, setProfessions] = useState<{ value: string; label: string }[]>([]);

  // Fetch countries and professions
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const countriesResponse = await fetch("/api/countries");
        const professionsResponse = await fetch("/api/professions");
        const countriesData = await countriesResponse.json();
        const professionsData = await professionsResponse.json();
        setCountries(
          countriesData.map((country: string) => ({
            value: country.toLowerCase(),
            label: country,
          }))
        );
        setProfessions(
          professionsData.map((profession: string) => ({
            value: profession.toLowerCase(),
            label: profession,
          }))
        );
      } catch (err) {
        console.error("Error fetching dropdown data:", err);
      }
    };
    fetchDropdownData();
  }, []);

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/internal/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: userProfile?.bio || "",
          age: userProfile?.age || null,
          country: userProfile?.country || "",
          profession: userProfile?.profession || "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      alert("Profile updated successfully!");
      setIsEditable(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to save changes.");
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
        <AlertCircle className="w-6 h-6 mr-2" />
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Profile</h1>
          <Button onClick={handleEditToggle} variant="outline" className="text-gray-100 border-gray-600 hover:bg-gray-700">
            {isEditable ? "Cancel" : "Edit"}
          </Button>
        </div>

        {/* Profile Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-400">
              Bio
            </label>
            <Textarea
              id="bio"
              name="bio"
              defaultValue={userProfile?.bio || ""}
              readOnly={!isEditable}
              placeholder="Write a short bio..."
              className={`mt-1 w-full bg-gray-900 border border-gray-700 text-gray-100 rounded-lg focus:ring-primary focus:ring-2 focus:border-primary ${isEditable ? "" : "cursor-not-allowed opacity-70"}`}
            />
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-400">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              defaultValue={userProfile?.age || ""}
              readOnly={!isEditable}
              className={`mt-1 w-full px-3 py-2 bg-gray-900 border border-gray-700 text-gray-100 rounded-lg focus:ring-primary focus:ring-2 focus:border-primary ${isEditable ? "" : "cursor-not-allowed opacity-70"}`}
            />
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-400">
              Country
            </label>
            {isEditable ? (
              <Select id="country" name="country" options={countries} defaultValue={countries.find((c) => c.value === userProfile?.country) || null} className="react-select-container" classNamePrefix="react-select" placeholder="Select a country" />
            ) : (
              <p className="mt-1 text-gray-100">{userProfile?.country || "Not specified"}</p>
            )}
          </div>

          {/* Profession */}
          <div>
            <label htmlFor="profession" className="block text-sm font-medium text-gray-400">
              Profession
            </label>
            {isEditable ? (
              <Select id="profession" name="profession" options={professions} defaultValue={professions.find((p) => p.value === userProfile?.profession) || null} className="react-select-container" classNamePrefix="react-select" placeholder="Select a profession" />
            ) : (
              <p className="mt-1 text-gray-100">{userProfile?.profession || "Not specified"}</p>
            )}
          </div>

          {/* Save Button */}
          {isEditable && (
            <div className="flex justify-end">
              <Button onClick={handleSave} className="bg-primary text-gray-100 hover:bg-primary/90 transition-all px-6 py-2 rounded-lg flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
