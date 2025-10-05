"use client";

import React, { useState } from "react";
import ForgotPasswordForm from "@/app/Component/ForgotPassword/Ui"; // Adjust path if necessary

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send reset email.");
        return;
      }

      setMessage(
        data.message || "Password reset email sent. Check your inbox.",
      );
    } catch (err: unknown) {
      console.error("Client-side forgot password error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ForgotPasswordForm
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        error={error}
        loading={loading}
        message={message}
      />
    </div>
  );
};

export default ForgotPasswordPage;
