import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import React from 'npm:react@18.3.1';
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { WelcomeEmail } from './_templates/welcome-email.tsx';
import { MagicLinkEmail } from './_templates/magic-link.tsx';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: 'welcome' | 'magic-link';
  to: string;
  data?: Record<string, unknown>;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, to, data }: EmailRequest = await req.json();

    let emailHtml: string;
    let subject: string;

    switch (type) {
      case 'welcome':
        emailHtml = await renderAsync(
          React.createElement(WelcomeEmail, {
            teamName: data.teamName,
            contactName: data.contactName,
            registrationId: data.registrationId,
          })
        );
        subject = "Welcome to CBL 2025 - Registration Confirmed! 🏀";
        break;

      case 'magic-link':
        emailHtml = await renderAsync(
          React.createElement(MagicLinkEmail, {
            supabase_url: data.supabase_url,
            token: data.token,
            token_hash: data.token_hash,
            redirect_to: data.redirect_to,
            email_action_type: data.email_action_type,
          })
        );
        subject = "Secure Login to Your CBL 2025 Account 🔐";
        break;

      default:
        throw new Error(`Unknown email type: ${type}`);
    }

    const emailResponse = await resend.emails.send({
      from: "CBL 2025 <noreply@cbl.my>",
      to: [to],
      subject,
      html: emailHtml,
    });

    console.log("CBL email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-cbl-email function:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);