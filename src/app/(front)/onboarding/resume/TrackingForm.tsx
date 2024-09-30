"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getTrackingNumberById } from "../../../../../actions/users";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useOnboardingContext } from "../../../../../context/context";

export default function TrackingForm() {
  const { setSavedDBData } = useOnboardingContext();
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const router = useRouter();
  const formSchema = z.object({
    trackingNumber: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trackingNumber: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);

    //Update User
    try {
      const res = await getTrackingNumberById(data.trackingNumber);
      setSavedDBData(res?.data);
      if (res?.status === 404) {
        setShowNotification(true);
        setLoading(false);
        return;
      }
      if (res?.status === 200) {
        toast.success("Tracking Number Verified Successfully");
        const userId = res.data?.id;
        const page = res.data?.page;
        router.push(`/onboarding/${userId}?page=${page}`);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      {showNotification && (
        <Alert color="failure" icon={HiInformationCircle} className="mb-3">
          <span className="font-medium">Wrong Tracking Number! </span>
          Please Check the Tracking Number and Try Again.
        </Alert>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="trackingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tracking Number:</FormLabel>
              <FormControl>
                <Input placeholder=" eg: nk4YD5Wv9f" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit to Continue</Button>
      </form>
    </Form>
  );
}
