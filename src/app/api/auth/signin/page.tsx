"use client";

import { signIn } from "next-auth/react";
import React from "react";
import LoginForm from "@/components/LoginForm";

export default function SignInForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const clearFormData = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: "/",
    });

    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <LoginForm
      email={email}
      password={password}
      error={error}
      setEmail={setEmail}
      setPassword={setPassword}
      handleInputChange={handleInputChange}
      signIn={signIn}
      handleSubmit={handleSubmit}
      clearFormData={clearFormData}
    />
  );
}
