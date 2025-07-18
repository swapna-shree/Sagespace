import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Section,
  Button,
  Hr,
} from "@react-email/components";
import * as React from "react";
import type { CSSProperties } from "react";

interface VerificationEmailProps {
  username: string;
  code: string;
  email :string;
}

export const VerificationEmail = ({
  username,
  code,
  email,
}: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your verification code for SageSpace</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>Hey {username},</Text>

          <Text style={paragraph}>I'm really glad you're here.</Text>

          <Text style={paragraph}>
            SageSpace is a project I’ve been building to give people a quiet,
            judgment-free corner of the internet — a space to just be, feel, and
            heal.
          </Text>

          <Text style={paragraph}>
            Here's your verification code to get started:
          </Text>

          <Section style={codeSection}>
            <Text style={codeStyle}>{code}</Text>
          </Section>

          <Text style={paragraph}>
            This code helps me make sure it's really you. It expires in a few
            minutes, so don’t take too long 💌
          </Text>

          <Text style={paragraph}>
            If you didn’t sign up, no worries — just ignore this email.
          </Text>

          <Hr style={divider} />

          <Text style={footer}>
            Built with intention, empathy, and a lot of tea ☕
            <br />
            — Swapna (Creator of SageSpace)
          </Text>
          <Button
           href={`https://sagespace.vercel.app/verify?email=${encodeURIComponent(email)}&code=${code}`}
           style={buttonStyle}
            >
           Verify My Account
          </Button>

        </Container>
      </Body>
    </Html>
  );
};

const main: CSSProperties = {
  backgroundColor: "#f8fafc",
  padding: "24px",
  fontFamily: "'Segoe UI', sans-serif",
};

const container: CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  padding: "32px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
};

const heading: CSSProperties = {
  fontSize: "20px",
  fontWeight: 600,
  color: "#1a202c",
};

const paragraph: CSSProperties = {
  fontSize: "16px",
  color: "#4a5568",
  lineHeight: "1.6",
  marginBottom: "16px",
};

const codeSection: CSSProperties = {
  textAlign: "center",
  margin: "24px 0",
};

const codeStyle: CSSProperties = {
  display: "inline-block",
  fontSize: "24px",
  fontWeight: "bold",
  backgroundColor: "#edf2f7",
  color: "#2d3748",
  padding: "12px 24px",
  borderRadius: "6px",
  letterSpacing: "2px",
};

const divider: CSSProperties = {
  margin: "32px 0",
  borderColor: "#cbd5e0",
};

const footer: CSSProperties = {
  fontSize: "13px",
  color: "#718096",
  textAlign: "center",
  lineHeight: "1.6",
};

const buttonStyle : CSSProperties = {
  backgroundColor: "#4f46e5",
  color: "#ffffff",
  padding: "12px 24px",
  fontSize: "16px",
  borderRadius: "6px",
  textDecoration: "none",
  display: "inline-block",
  fontWeight: 600,
};


export default VerificationEmail;
