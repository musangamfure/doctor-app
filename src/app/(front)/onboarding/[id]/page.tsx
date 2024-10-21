import Container from "@/components/frontend/Container";
import OnboardingSteps from "@/components/onboarding/OnboardingSteps";
import React from "react";
import { getSpecialties } from "../../../../../actions/specialties";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const specialties = (await getSpecialties()).data || [];
  return (
    <div>
      <Container className="min-h-screen py-8 dark:bg-slate-950">
        <OnboardingSteps specialties={specialties} id={id} />
      </Container>
    </div>
  );
}

// tvbP2YG5kZ
