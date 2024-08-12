// src/libs/uploadImage.ts
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export const uploadImage = async (file: File): Promise<string> => {
  try {
    // Ensure that the file has a name before proceeding
    if (!file.name) {
      throw new Error("File must have a valid name");
    }

    // Create a storage reference
    const storageRef = ref(storage, `user-images/${file.name}`);

    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);

    // Get the download URL for the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Return the download URL
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);

    // Throw a more descriptive error
    throw new Error("Failed to upload image to Firebase Storage");
  }
};
