"use client";

import { useState } from "react";
import {
  Input,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Box,
  Text,
  InputGroup,
  InputLeftElement,
  Divider,
  VStack,
  Image,
  Center,
} from "@chakra-ui/react";
import { AiOutlineMail, AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/lib/uploadImage"; // Import the uploadImage function
import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null); // To store the uploaded image URL
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const clearFormData = () => {
    setEmail("");
    setPassword("");
    setName("");
    setImageFile(null);
    setImageURL(null); // Clear the uploaded image URL
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("All fields are required");
      return;
    }

    try {
      let imageUrl = imageURL;
      if (imageFile) {
        // Upload the image to Firebase Storage and get the URL
        imageUrl = await uploadImage(imageFile);
        setImageURL(imageUrl); // Update the state with the uploaded image URL
      }

      // Send the data to your API
      const response = await fetch("/api/auth/signup/new-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          imageUrl, // Include the uploaded image URL in the request
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      setError("");
      clearFormData();
      router.push("/auth/signin");
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <SignUpForm // Pass the props to the SignUpForm component
      email={email}
      password={password}
      name={name}
      imageFile={imageFile}
      error={error}
      setEmail={setEmail}
      setPassword={setPassword}
      setName={setName}
      setImageFile={setImageFile}
      handleInputChange={handleInputChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      router={router}
    />
  );
}
