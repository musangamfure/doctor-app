import { Card, CardContent } from "@/components/ui/card";
import { UploadDropzone } from "../../../../utils/uploadthing";
import React from "react";

import { File, Pencil, XCircle } from "lucide-react";
import toast from "react-hot-toast";
type ImageInputProps = {
  files: File[];
  setFiles: any;
  endpoint: any;
  className?: string;
  label: string;
};

export type File = {
  url: string;
  title: string;
  size: number;
};

export default function MultipleImageInput({
  label,
  files,
  setFiles,
  endpoint,
  className = "col-span-full",
}: ImageInputProps) {
  const handleRemove = (index: number) => {
    setFiles((prevFiles: File[]) => prevFiles.filter((_, i) => i !== index));
  };
  const convertToMB = (sizeInKB: number): string => {
    const sizeInMB = sizeInKB / 1024 / 1024;
    return sizeInMB.toFixed(2);
  };

  return (
    <div className={className}>
      <div className="flex justify-between py-4 items-center">
        <label
          htmlFor="image"
          className="block text-sm py-4 font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        {files && (
          <button
            onClick={() => setFiles([])}
            type="button"
            className="flex space-x-2 bg-slate-900 rounded-sm shadow text-slate-50 py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Files</span>
          </button>
        )}
      </div>
      <Card className="relative py-4">
        <CardContent>
          {files && files.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {files.map((file, i) => {
                return (
                  <div key={i} className=" relative mb-6">
                    <button type="button" onClick={() => handleRemove(i)}>
                      <XCircle className="absolute  -right-2 text-slate-900 rounded-full  bg-slate-100 hover:text-gray-500" />
                    </button>
                    <div className="py-2 flex items-center px-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg border dark:border-slate-300 border-slate-200 col-span-1">
                      <File className="h-8 w-8 mr-2 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="line-clamp-1"> {file.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {convertToMB(file.size)} MB
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <UploadDropzone
              className="col-span-full"
              endpoint={endpoint}
              onClientUploadComplete={(res) => {
                const urls = res.map((item) => {
                  return {
                    url: item.url,
                    title: item.name,
                    size: item.size,
                  };
                });

                setFiles(urls);
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
