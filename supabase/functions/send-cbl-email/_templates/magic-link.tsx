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
  Button,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface MagicLinkEmailProps {
  supabase_url: string
  email_action_type: string
  redirect_to: string
  token_hash: string
  token: string
}

export const MagicLinkEmail = ({
  token,
  supabase_url,
  email_action_type,
  redirect_to,
  token_hash,
}: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Secure login to your CBL 2025 account</Preview>
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
        
        <Heading style={h1}>Secure Login</Heading>
        
        <Text style={text}>
          Click the button below to securely access your CBL 2025 Corporate Edition account:
        </Text>

        <Section style={buttonContainer}>
          <Button
            href={`${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`}
            style={button}
          >
            Access Your CBL Account
          </Button>
        </Section>

        <Text style={text}>
          Alternatively, you can copy and paste this temporary login code:
        </Text>
        <Section style={codeContainer}>
          <Text style={code}>{token}</Text>
        </Section>

        <Hr style={hr} />

        <Text style={securityText}>
          🔒 <strong>Security Notice:</strong> This login link is valid for a limited time and can only be used once. 
          If you didn't request this login, you can safely ignore this email.
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

export default MagicLinkEmail

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

const text = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#374151',
  margin: '16px 0',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#ff6600',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
  boxShadow: '0 4px 12px rgba(255, 102, 0, 0.3)',
}

const codeContainer = {
  backgroundColor: '#f9fafb',
  border: '2px solid #e5e7eb',
  borderRadius: '8px',
  padding: '16px',
  textAlign: 'center' as const,
  margin: '24px 0',
}

const code = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#ff6600',
  fontFamily: 'monospace',
  letterSpacing: '2px',
  margin: '0',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
}

const securityText = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#6b7280',
  backgroundColor: '#f0f9ff',
  border: '1px solid #bae6fd',
  borderRadius: '6px',
  padding: '16px',
  margin: '24px 0',
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