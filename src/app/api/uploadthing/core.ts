import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  doctorProfileImage: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      return { uploadedBy: "doctor" };
    }
  ),

  doctorProfessionDocs: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ metadata, file }) => {
    return { uploadedBy: "doctor", pdf: file.url };
  }),
  doctorAddionalDocs: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ metadata, file }) => {
    return { uploadedBy: "doctor", pdf: file.url };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
