import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          </Tabs>
        </div>
      </div>
    </main>
  );
}
