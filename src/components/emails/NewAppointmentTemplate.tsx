import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
interface NewAppointmentProps {
  firstName?: string;
  link: string;
  message: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const NewAppointmentTemplate = ({
  firstName = "",
  link,

  message,
}: NewAppointmentProps) => (
  <Html>
    <Head />
    <Preview>New Appointment</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://utfs.io/f/QfiCp4npyqgMZPYb49GtUBCNsebn28pRXrMqkO3FltKHu9wS"
          width="32"
          height="32"
          alt="Claridy"
        />

        <Section style={section}>
          <Text style={text}>
            Hey <strong>{firstName}</strong>!
          </Text>
          <Text style={text}>{message}</Text>

          <Button href={link} style={button}>
            View Appointment
          </Button>
          <Text style={text}>
            If you have any questions, feel free to reach out.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default NewAppointmentTemplate;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  width: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "24px",
  lineHeight: 1.25,
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};

const text = {
  margin: "0 0 20px 0",
  textAlign: "left" as const,
};

const button = {
  fontSize: "24px",
  backgroundColor: "#28a745",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "0.75em 1.5em",
};

const links = {
  textAlign: "center" as const,
};

const link = {
  color: "#0366d6",
  fontSize: "12px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};
