"use client";
import React, { useState, ChangeEvent } from "react";

interface ImageInputProps {
  onImageChange: (base64Image: string) => void;
  multiple?: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageChange, multiple }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        onImageChange(base64String);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="my-2">
      <input
        multiple={multiple || false}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageInput;
