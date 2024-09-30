"use client";

import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";
import { UploadDropzone } from "../../../../utils/uploadthing";
import toast from "react-hot-toast";

export default function ImageInput({
  label,
  imageUrl,
  setImageUrl,
  className = "col-span-full",
  endpoint,
}: {
  label: string;
  imageUrl: string | undefined;
  setImageUrl: any;
  className?: string;
  endpoint: string;
}) {
  return (
    <div className={className}>
      <div className="flex justify-between items-between py-4">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        {imageUrl && (
          <button
            onClick={() => setImageUrl("")}
            type="button"
            className="flex space-x-2 bg-slate-900 rounded-sm shadow text-slate-50 py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )}
      </div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          width={667}
          height={667}
          className="object-contain w-full h-40 rounded-sm"
          alt="Profile Image"
        />
      ) : (
        <UploadDropzone
          endpoint={`${endpoint}` as any}
          onClientUploadComplete={(res: any) => {
            setImageUrl(res[0].url);
            toast.success("Image Uploaded Successfully");
            console.log("files: ", res);
          }}
          onUploadError={(err: any) => {
            toast.error("Image Upload Failed");
            console.log("error: ", err);
          }}
        />
      )}
    </div>
  );
}
