import { serve } from "https://deno.land/std@0.208.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DatabasePlayer {
  id: string;
  player_order: number;
  full_name: string;
  ic_passport: string;
  email: string;
  phone: string;
  affiliation: string;
  relationship_type: string;
}

interface RegistrationData {
  id: string;
  team_name: string;
  company_1: string;
  company_2: string | null;
  has_second_company: boolean;
  payment_file_url: string | null;
  total_players: number;
  created_at: string;
  team_registration_players: DatabasePlayer[];
  players: Array<{
    full_name: string;
    ic_passport: string;
    email: string;
    phone: string;
    affiliation: string;
    player_order: number;
  }>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { registrationId } = await req.json()

    if (!registrationId) {
      throw new Error('Registration ID is required')
    }

    // Fetch registration data with players
    const { data: registration, error: regError } = await supabaseClient
      .from('team_registrations')
      .select(`
        *,
        team_registration_players (*)
      `)
      .eq('id', registrationId)
      .single()

    if (regError) {
      throw new Error(`Failed to fetch registration: ${regError.message}`)
    }

    // Sort players by order
    const sortedPlayers = registration.team_registration_players.sort(
      (a: DatabasePlayer, b: DatabasePlayer) => a.player_order - b.player_order
    )

    // Format players list for Google Sheets
    const playersText = sortedPlayers
      .map((player: DatabasePlayer, index: number) => 
        `${index + 1}. ${player.full_name} (${player.ic_passport}) - ${player.email} - ${player.phone} - ${player.affiliation}`
      )
      .join('\n')

    // Prepare data for Google Sheets
    const sheetData = {
      timestamp: new Date(registration.created_at).toLocaleString(),
      teamName: registration.team_name,
      company1: registration.company_1,
      company2: registration.company_2 || '',
      hasSecondCompany: registration.has_second_company ? 'Yes' : 'No',
      totalPlayers: registration.total_players,
      paymentFileUrl: registration.payment_file_url || '',
      playersList: playersText,
      status: registration.status
    }

    // Get Google Sheets credentials from environment
    const googleSheetsUrl = Deno.env.get('GOOGLE_SHEETS_WEBHOOK_URL')
    
    if (!googleSheetsUrl) {
      console.log('Google Sheets webhook URL not configured, skipping sync')
      return new Response(
        JSON.stringify({ success: true, message: 'No Google Sheets URL configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Send data to Google Sheets via webhook
    const response = await fetch(googleSheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetData)
    })

    if (!response.ok) {
      throw new Error(`Google Sheets sync failed: ${response.statusText}`)
    }

    // Mark as synced in database
    const { error: updateError } = await supabaseClient
      .from('team_registrations')
      .update({ google_sheet_synced: true })
      .eq('id', registrationId)

    if (updateError) {
      console.error('Failed to update sync status:', updateError)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Data synced to Google Sheets successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error syncing to Google Sheets:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Unknown error occurred' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})