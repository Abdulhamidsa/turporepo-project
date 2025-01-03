import { Toaster, toast } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          maxWidth: "60%",
          minHeight: "10vh",
          fontSize: "0.875rem",
          padding: "8px 16px",
          borderRadius: "8px",
        },
        success: {
          style: {
            background: "#d1e7dd",
            color: "#0f5132",
          },
        },
        error: {
          style: {
            background: "#f8d7da",
            color: "#842029",
          },
        },
      }}
    />
  );
};

export const showToast = (message: string, type: "success" | "error" = "success") => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  }
};
