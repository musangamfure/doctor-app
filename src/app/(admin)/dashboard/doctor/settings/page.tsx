import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AvailabilitySettings from "@/components/dashboard/doctor/AvailabilitySettings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDoctorProfileById } from "../../../../../../actions/onboarding";
import DoctorServiceSettings from "@/components/dashboard/doctor/DoctorServiceSettings";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const profile = await getDoctorProfileById(user?.id);

  return (
    <div className=" max-w-5xl px-4">
      <h2 className="text-3xl font-bold py-4">Settings</h2>
      <Tabs defaultValue="availability" className="w-[800px]">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="service">Service Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="service">
          <DoctorServiceSettings profile={profile?.data} />
        </TabsContent>
        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
              <CardDescription>
                Please add your availability for the whole week.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <AvailabilitySettings profile={profile?.data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
