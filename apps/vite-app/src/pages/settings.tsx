export default function SettingsPage() {
  const handleDeleteAccount = () => {
    alert("Your account will be deleted!");
    // Add logic for deleting account here
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-card rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="space-y-4">
        <button onClick={handleDeleteAccount} className="w-full px-4 py-2 text-sm font-medium text-destructive-foreground bg-destructive rounded-lg hover:bg-destructive/90">
          Delete Your Account
        </button>
        <button onClick={() => alert("Other settings functionality")} className="w-full px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-lg hover:bg-muted/50">
          Other Settings
        </button>
      </div>
    </div>
  );
}
