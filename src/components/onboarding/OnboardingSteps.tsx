"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import BioDataForm from "./BioDataForm";
import ContactInfo from "./ContactInfo";
import PracticeInfo from "./PracticeInfo";
import EducationInfo from "./EducationInfo";
import AdditionalInfo from "./AdditionalInfo";
import ProfileInfo from "./ProfileInfo";
import { useOnboardingContext } from "../../../context/context";
import { Specialty } from "@prisma/client";

export function DoctorsOnboardingForm({
  id,
  specialties,
}: {
  id: string;
  specialties: Specialty[];
}) {
  const params = useSearchParams();
  const page = params.get("page") ?? "bio-data";
  const { trackingNumber, savedDBData, doctorProfileId } =
    useOnboardingContext();
  const steps = [
    {
      title: "Bio Data",
      page: "bio-data",
      component: (
        <BioDataForm
          userId={id}
          title="Bio Data"
          description="Please fill in your bio data info"
          page={page}
          nextPage="profile"
          formId={doctorProfileId ? doctorProfileId : savedDBData.id}
        />
      ),
    },
    {
      title: "Profile Information",
      page: "profile",
      component: (
        <ProfileInfo
          title="Profile Information"
          description="Please fill in your profile info"
          page={page}
          nextPage="contact"
          formId={doctorProfileId ? doctorProfileId : savedDBData.id}
          userId={id}
        />
      ),
    },
    {
      title: "Contact Infomation",
      page: "contact",
      component: (
        <ContactInfo
          page={page}
          nextPage="education"
          title="Contact Information"
          description="Please fill in your contact info"
          formId={doctorProfileId ? doctorProfileId : savedDBData.id}
          userId={id}
        />
      ),
    },
    {
      title: "Education",
      page: "education",
      component: (
        <EducationInfo
          specialties={specialties}
          page={page}
          nextPage="practice"
          title="Education Information"
          description="Please fill in your education info"
          formId={doctorProfileId ? doctorProfileId : savedDBData.id}
          userId={id}
        />
      ),
    },

    {
      title: "Practice Information",
      page: "practice",
      component: (
        <PracticeInfo
          page={page}
          nextPage="additional"
          title="Practice Information"
          description="Please fill in your practice info"
          formId={doctorProfileId ? doctorProfileId : savedDBData.id}
          userId={id}
        />
      ),
    },
    {
      title: "Additional Information",
      page: "additional",
      component: (
        <AdditionalInfo
          page={page}
          nextPage="availability"
          title="Additional Information"
          description="Please fill in your additional info"
          formId={doctorProfileId ? doctorProfileId : savedDBData.id}
          userId={id}
        />
      ),
    },
  ];
  const currentStep = steps.find((step) => step.page === page);
  return (
    <div className="grid grid-cols-12 overflow-hidden bg-slate-200 mx-auto rounded-lg border shadow-inner border-white/65 h-screen w-full">
      <div className="md:col-span-3 col-span-full divide-y-2 divide-gray-300 sticky top-0 h-screen overflow-y-auto">
        {steps.map((step, i) => {
          return (
            <Link
              key={i}
              href={
                step.page === "bio-data"
                  ? `/onboarding/${id}`
                  : `/onboarding/${id}?page=${step.page}`
              }
              className={cn(
                "py-3 px-4 block bg-slate-300 text- text-slate-800 shadow-inner uppercase text-sm",
                step.page === page ? "bg-teal-800 text-slate-100" : ""
              )}
            >
              {step.title}
            </Link>
          );
        })}
      </div>

      <div className="col-span-full md:col-span-9 p-4 overflow-y-auto h-screen ">
        {(trackingNumber || savedDBData.id) && (
          <p className="text-sm  text-slate-800 dark:text-slate-800 ">
            Your tracking ID is:
            <span className="text-green-500 px-2 font-bold dark:text-green-500">
              {trackingNumber ? trackingNumber : savedDBData.trackingNumber}
            </span>
            use it to resume your application or check the status{" "}
          </p>
        )}
        {currentStep?.component}
      </div>
    </div>
  );
}
export default DoctorsOnboardingForm;
