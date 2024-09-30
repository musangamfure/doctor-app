import Container from "@/components/frontend/Container";
import OnboardingSteps from "@/components/onboarding/OnboardingSteps";
import React from "react";

export default function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <Container className="min-h-screen py-8 dark:bg-slate-950">
        <OnboardingSteps id={id} />
      </Container>
    </div>
  );
}
