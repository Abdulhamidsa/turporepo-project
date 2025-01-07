import { useState, useEffect } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Pen, Check, Loader } from "lucide-react";
import { showToast } from "@repo/ui/components/ui/toaster";
import { useFetchCredentials, useUpdateCredentials } from "../hooks/use.auth";

type EditableCredentialsType = {
  email: string;
  password: string;
};
export type UpdateCredentialsPayload = {
  email?: string | undefined;
  password?: string | undefined;
};

export default function CredentialsPage() {
  const { credentials, isLoading, error, mutate } = useFetchCredentials();
  const { updateCredentials } = useUpdateCredentials();

  const [editableCredentials, setEditableCredentials] = useState<Partial<EditableCredentialsType>>({});
  const [editingField, setEditingField] = useState<keyof EditableCredentialsType | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsDirty(editableCredentials.email !== credentials?.email || (editableCredentials.password !== undefined && editableCredentials.password !== ""));
  }, [editableCredentials, credentials]);

  const handleEdit = (field: keyof EditableCredentialsType) => {
    setEditingField(field); // Mark this field as being edited
    setEditableCredentials((prev) => ({
      ...prev,
      [field]: field === "password" ? "" : (credentials?.[field] ?? ""), // Initialize with current credentials, password always empty
    }));
  };

  const handleChange = (field: keyof EditableCredentialsType, value: string) => {
    setEditableCredentials((prev) => ({
      ...prev,
      [field]: value, // Update editable credentials state
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const modifiedFields: UpdateCredentialsPayload = {
        email: editableCredentials.email !== credentials?.email ? editableCredentials.email : undefined,
        password: editableCredentials.password !== "" ? editableCredentials.password : undefined,
      };

      if (Object.keys(modifiedFields).some((key) => modifiedFields[key as keyof UpdateCredentialsPayload] !== undefined)) {
        await updateCredentials(modifiedFields);
        await mutate(); // Refresh the credentials
        showToast("Credentials updated successfully!");
      } else {
        showToast("No changes to save.");
      }
    } catch (err) {
      console.error("Error updating credentials:", err);
      showToast("Failed to save credentials.");
    } finally {
      setIsSaving(false);
      setEditingField(null);
    }
  };

  return (
    <div className="relative">
      {isLoading ? (
        <p>Loading credentials...</p>
      ) : error ? (
        <p>Error loading credentials: {error}</p>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {["email", "password"].map((field) => (
            <div key={field} className="relative flex flex-col bg-muted text-muted-foreground rounded-lg p-3 sm:p-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-muted-foreground mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                {editingField === field ? (
                  <Input
                    type={field === "password" ? "password" : "text"}
                    value={editableCredentials[field as keyof EditableCredentialsType] || ""}
                    onChange={(e) => handleChange(field as keyof EditableCredentialsType, e.target.value)}
                    className="mt-1 w-full bg-card text-card-foreground border border-border rounded-lg text-sm p-2 sm:p-3"
                  />
                ) : (
                  <p className="mt-1 text-sm">{field === "password" ? "********" : (editableCredentials[field as keyof EditableCredentialsType] ?? credentials?.[field as keyof EditableCredentialsType])}</p>
                )}
              </div>
              {editingField !== field ? (
                <Button variant="ghost" size="icon" onClick={() => handleEdit(field as keyof EditableCredentialsType)} className="absolute top-1 right-1">
                  <Pen />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingField(null)} // Exit edit mode without saving
                  className="absolute top-1 right-1"
                >
                  <Check />
                </Button>
              )}
            </div>
          ))}
          {isDirty && (
            <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4">
              <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-accent text-primary-foreground">
                {isSaving ? <Loader className="animate-spin h-5 w-5" /> : "Save Changes"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
