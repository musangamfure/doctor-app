import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQ = {
  question: string;
  answer: string;
};

export default function CustomAccordion() {
  const faqArray: FAQ[] = [
    {
      question: "What is telehealth, and how does it work?",
      answer:
        "Telehealth allows you to consult with a healthcare provider remotely via video, phone, or chat. You can access medical advice, diagnoses, and even prescriptions without visiting a clinic. Simply log in to the app, choose your preferred service, and connect with a healthcare professional.",
    },
    {
      question: "Is my personal information and medical data secure?",
      answer:
        "Yes, your privacy is our top priority. All communications and medical records are encrypted and stored securely in compliance with HIPAA and other healthcare regulations to ensure your data is protected.",
    },
    {
      question: "Do I need any special equipment for telehealth appointments?",
      answer:
        "You only need a device with an internet connection, such as a smartphone, tablet, or computer. Most appointments are done via video calls, so a working camera and microphone are recommended.",
    },
    {
      question: "Can I get a prescription through telehealth?",
      answer:
        "Yes, depending on your condition, healthcare providers can prescribe medications via telehealth consultations. The prescription will be sent directly to your preferred pharmacy for easy pickup.",
    },
    {
      question: "What should I do if I have a medical emergency?",
      answer:
        "Telehealth is not for medical emergencies. If you have a serious condition, such as chest pain, difficulty breathing, or severe injury, please call 911 or go to the nearest emergency room immediately.",
    },
    {
      question: "How do I schedule or cancel an appointment?",
      answer:
        "To schedule an appointment, log into the app, select your provider, and choose a time that works for you. If you need to cancel, go to your appointments section and click 'Cancel' at least 24 hours in advance to avoid any fees.",
    },
  ];

  return (
    <Accordion type="single" collapsible>
      {faqArray.map((faq, i) => {
        return (
          <AccordionItem key={i} value={`item-${i + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
