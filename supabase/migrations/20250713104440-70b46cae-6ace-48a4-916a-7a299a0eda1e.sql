-- Fix RLS issues by enabling RLS on tables that have policies but RLS disabled
-- (excluding spatial_ref_sys which is a PostGIS system table)

-- Enable RLS on tables that have policies but RLS not enabled
ALTER TABLE public.advanced_player_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_processing_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_subject_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pdpa_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pdpa_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_stats ENABLE ROW LEVEL SECURITY;

-- Fix the users_masked view by removing SECURITY DEFINER
-- First drop the existing view
DROP VIEW IF EXISTS public.users_masked;

-- Recreate the view without SECURITY DEFINER
CREATE VIEW public.users_masked AS
SELECT 
  id,
  created_at,
  updated_at,
  email,
  first_name,
  last_name,
  preferred_language,
  nric_gender(nric) as gender,
  nric_birth_date(nric) as birth_date,
  nric_state(nric) as birth_state,
  mask_nric(nric) as nric_masked
FROM public.users;