import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useVerifyEmail } from "@/hooks/useAuth";

export default function VerifyEmailPage() {
  const [location] = useLocation();
  const [message, setMessage] = useState("Verifying your email...");
  const [isLoading, setIsLoading] = useState(true);

  // Extract token from URL query params
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  // Access mutation function from your hook
  const { mutateAsync: verifyEmail } = useVerifyEmail();

  useEffect(() => {
    if (!token) {
      setMessage("Verification token is missing from the URL.");
      setIsLoading(false);
      return;
    }

    verifyEmail(token)
      .then((data) => {
        setMessage(data.message || "Email verified successfully!");
        // Redirect to login after 3 seconds
        setTimeout(() => location("/login"), 3000);
      })
      .catch((error) => {
        setMessage(error.message || "Email verification failed.");
      })
      .finally(() => setIsLoading(false));
  }, [token, verifyEmail, location]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-green-50 to-emerald-100">
      {isLoading ? (
        <p className="text-lg text-gray-700">{message}</p>
      ) : (
        <div className="bg-white p-6 rounded shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold mb-4">Email Verification</h2>
          <p className="mb-4">{message}</p>
          {!message.includes("success") && (
            <button
              onClick={() => location("/register")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Register Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
