import Link from "next/link";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import GeneralSettings from "./GeneralSettings";

export const description =
  "A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings.";

export default function Settings() {
  const tabs = [
    {
      label: "General",
      value: "general",
      component: <GeneralSettings />,
    },
    {
      label: "Security",
      value: "security",
      component: <div>Security</div>,
    },
    {
      label: "Integrations",
      value: "integrations",
      component: <div>Integrations</div>,
    },
    {
      label: "Support",
      value: "support",
      component: <div>Support</div>,
    },
    {
      label: "Organizations",
      value: "organizations",
      component: <div>Organizations</div>,
    },
    {
      label: "Advanced",
      value: "advanced",
      component: <div>Advanced</div>,
    },
  ];
  return (
    <main className="grid items-start py-6  flex-1  gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-1 lg:grid-cols-1">
        <div className="">
          <Tabs defaultValue="general">
            <TabsList>
              {tabs.map((tab, i) => {
                return (
                  <TabsTrigger key={i} value={tab.value}>
                    {tab.label}{" "}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {tabs.map((tab, i) => {
              return (
                <TabsContent value={tab.value} key={i}>
                  {tab.component}
                </TabsContent>
              );
            })}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're
                    done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you'll be logged
                    out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
