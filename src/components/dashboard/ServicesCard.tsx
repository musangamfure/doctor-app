"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Pencil, Trash } from "lucide-react";
import { deleteService } from "../../../actions/services";
import toast from "react-hot-toast";
import { Service } from "@prisma/client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ServicesCard({ service }: { service: Service }) {
  async function handleDelete(id: string) {
    await deleteService(id);
    toast.success("Specialty deleted successfully");
  }

  return (
    <div className="border w-full mb-2 shadow-sm text-sm py-2 px-4 rounded-md flex items-center justify-between group relative">
      <div className="flex items-center gap-2">
        <Image
          src={service.imageUrl}
          alt={service.slug}
          width={512}
          height={512}
          className="w-14 h-auto"
        />
        <h2>{service.title}</h2>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Link href={`/dashboard/services/update/${service.slug}`}>
          <Pencil className="h-4 w-4 text-gray-600 hover:text-blue-500" />
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button type="button" className="text-red-600">
              <Trash className="h-4 w-4" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                service and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-400 hover:bg-red-500"
                onClick={() => handleDelete(service.id)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
