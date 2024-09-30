import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadButton, UploadDropzone } from "../../../../utils/uploadthing";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { X, XCircle } from "lucide-react";
import toast from "react-hot-toast";
type ImageInputProps = {
  imageUrls: string[];
  setImageUrls: any;
  endpoint: any;
  className?: string;
  label: string;
};
export default function MultipleImageInput({
  label,
  imageUrls,
  setImageUrls,
  endpoint,
  className = "col-span-full",
}: ImageInputProps) {
  return (
    <div className={className}>
      <label
        htmlFor="image"
        className="block text-sm py-4 font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <Card className="relative py-4">
        <CardContent>
          {imageUrls.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {imageUrls.map((imageUrl: string, i: number) => {
                return (
                  <div key={i} className=" bg-slate-500 relative mb-6">
                    <button
                      type="button"
                      onClick={() =>
                        setImageUrls(
                          imageUrls.filter((url, index) => index !== i)
                        )
                      }
                    >
                      <XCircle className="absolute -top-4 -right-2 text-slate-900 rounded-full  bg-slate-100 hover:text-gray-500" />
                    </button>
                    <div className="py2 px-6 bg-slate-500 col-span-1"></div>
                  </div>
                );
              })}
            </div>
          ) : (
            <UploadDropzone
              className="col-span-full"
              endpoint={endpoint}
              onClientUploadComplete={(res) => {
                const urls = res.map((item) => item.url);

                setImageUrls(urls);
                console.log(urls);
                toast.success("Files uploaded successfully");
              }}
              onUploadError={(error: Error) => {
                toast.error("Error uploading files");
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
