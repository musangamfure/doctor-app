import CustomAccordion from "@/components/frontend/CustomAccordion";
import CustomButton from "@/components/CustomButton";
import Container from "@/components/frontend/Container";
import { link } from "fs";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Princing from "@/components/frontend/Princing";

export default function page() {
  const features = [
    " Medical app brings patient to you",
    "Medical app e-prescribing experience ",
    "Integrated clinic note-taking",
  ];

  const features2 = [
    {
      title: "List your practice",
      description: (
        <span>
          It&#39;s free to join with no membership fees or time commitments
        </span>
      ),
    },
    {
      title: "Create competitive offerings ",
      description:
        "We help you tailor your offerings to attract new patients and build your practice",
    },
    {
      title: "Start seeing patients",
      description:
        "Patients can book appointments with you minutes after your profile goes live",
    },
  ];

  const cards = [
    {
      title: "Begin Your Journey",
      description:
        " Start a new application to join our network of healthcare providers",
      link: "/join/doctors",
      linkTitle: "Start New Application",
    },
    {
      title: "Resume Application",
      description: "Pick up where you left off and complete your application",
      link: "/join/doctors",
      linkTitle: "Continue Application",
    },
    {
      title: "Schedule a Call",
      description: "Arrange a time for call to finalize your Application.",
      link: "/pricing",
      linkTitle: "Schedule a Call",
    },
    {
      title: "Check Status",
      description:
        "Track your application status and get updates on your progress.",
      link: "/pricing",
      linkTitle: "Check Status",
    },
  ];

  return (
    <div className="min-h-screen py-16">
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="">
          <h2 className="text-2xl md:text-4xl !leading-[1.208] font-semibold">
            Build a thriving
            <span className="text-purple-600 font-bold mx-2 ">
              direct-pay
            </span>{" "}
            practice with Medical App.
          </h2>
          <p className="py-4 font-medium text-muted-foreground">
            By offering secure payment processing, automated appointment
            scheduling, and real-time communication, medical apps enhance
            patient satisfaction and streamline operations. Providers can focus
            more on patient care, while the app handles administrative tasks,
            billing transparency, and compliance.
          </p>
          <CustomButton
            className="bg-purple-600 hover:bg-purple-500 my-6 "
            title="List Your Practice"
          />
          {features.map((feature, index) => (
            <p
              key={index}
              className="py-2 font-medium text-muted-foreground flex "
            >
              <Check className="text-purple-600 mr-2 flex-shrink-0 size-18" />
              {feature}
            </p>
          ))}
        </div>
        <div className="relative z-10 inline-block pt-11 lg:pt-0">
          <Image
            src="/doctor2.webp"
            width={1200}
            alt="Doctor"
            height={1200}
            className="object-cover"
          />
        </div>
      </Container>
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-10 py-16 md:py-24">
        <div className="relative z-10 pt-11 lg:pt-0 hidden md:block">
          <Image
            src="/woman-doctor.webp"
            width={1200}
            alt="Doctor"
            height={1200}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl md:text-4xl !leading-[1.208] font-semibold ">
            Join Medital App to increase your
            <span className="text-purple-600 font-bold mx-2 ">
              revenue
            </span>{" "}
            today.
          </h2>
          <div className="py-4">
            {features2.map((feature, index) => (
              <div key={index} className="flex items-start py-2">
                <Check className="text-purple-600 mr-2 flex-shrink-0 size-18" />
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className=" text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        <div className="relative z-10 inline-block pt-11 lg:pt-0 col-span-1">
          <Image
            src="/onboarding.jpg"
            width={1200}
            alt="Doctor"
            height={1200}
            className="object-cover"
          />
        </div>

        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-3">
            {cards.map((card, index) => {
              return (
                <div
                  key={index}
                  className="bg-slate-500 p-4 rounded-lg shadow-sm "
                >
                  <h3 className="text-2xl font-semibold text-white py-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-white text-xs">
                    {card.description}
                  </p>
                  <CustomButton
                    href={card.link}
                    className="bg-purple-600 hover:bg-purple-500 my-6 "
                    title={card.linkTitle}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      <Container className="py-16 md:py-24">
        <Princing />
      </Container>

      <Container className=" max-w-4xl pb-16 md:pb-18">
        <h2 className="py-6 text-3xl text-center font-bold">FAQs</h2>
        <CustomAccordion />
      </Container>
    </div>
  );
}
