import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Img,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface WelcomeEmailProps {
  teamName: string
  contactName: string
  registrationId: string
}

export const WelcomeEmail = ({
  teamName,
  contactName,
  registrationId,
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to CBL 2025 Corporate Edition - Registration Confirmed!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Img
            src="https://tnglzpywvtafomngxsgc.supabase.co/storage/v1/object/public/assets/cbl-logo.png"
            alt="CBL Logo"
            style={logo}
          />
          <Text style={yearText}>2025</Text>
        </Section>
        
        <Heading style={h1}>Registration Confirmed!</Heading>
        
        <Text style={greeting}>
          Dear {contactName},
        </Text>
        
        <Text style={text}>
          Congratulations! Your team <strong>{teamName}</strong> has been successfully registered for the 
          <strong> CBL 2025 Corporate Edition</strong> - Malaysia's premier corporate basketball league.
        </Text>

        <Section style={infoBox}>
          <Text style={infoTitle}>📋 Registration Details</Text>
          <Text style={infoText}>
            <strong>Team Name:</strong> {teamName}<br/>
            <strong>Registration ID:</strong> {registrationId}<br/>
            <strong>Competition:</strong> CBL 2025 Corporate Edition
          </Text>
        </Section>

        <Text style={text}>
          <strong>What's Next?</strong>
        </Text>
        
        <Text style={text}>
          • 📧 You'll receive tournament details and schedule updates via email<br/>
          • 🏀 Prepare your team for an exciting season of competitive basketball<br/>
          • 📱 Follow us for updates and announcements<br/>
          • 🏆 Get ready to compete for the CBL 2025 championship!
        </Text>

        <Hr style={hr} />

        <Text style={footerText}>
          If you have any questions about your registration or the tournament, 
          please don't hesitate to contact our support team.
        </Text>

        <Text style={footer}>
          <strong>Corporate Basketball League (CBL)</strong><br/>
          Malaysia's Premier Corporate Basketball Competition<br/>
          <Link href="mailto:support@cbl.my" style={link}>support@cbl.my</Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default WelcomeEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 20px 48px',
  maxWidth: '600px',
}

const logoSection = {
  textAlign: 'center' as const,
  marginBottom: '32px',
}

const logo = {
  height: '80px',
  width: 'auto',
  margin: '0 auto 8px',
}

const yearText = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#ff6600',
  margin: '0',
  textAlign: 'center' as const,
}

const h1 = {
  color: '#ff6600',
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
}

const greeting = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#374151',
  margin: '16px 0',
}

const text = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#374151',
  margin: '16px 0',
}

const infoBox = {
  backgroundColor: '#fff7ed',
  border: '2px solid #fed7aa',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
}

const infoTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#ea580c',
  margin: '0 0 12px 0',
}

const infoText = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#374151',
  margin: '0',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
}

const footerText = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#6b7280',
  margin: '16px 0',
}

const footer = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#6b7280',
  textAlign: 'center' as const,
  margin: '32px 0 0 0',
}

const link = {
  color: '#ff6600',
  textDecoration: 'underline',
}