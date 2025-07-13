-- Fix remaining security issues

-- 1. Fix the users_masked view by removing SECURITY DEFINER
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

-- 2. Enable RLS on spatial_ref_sys (PostGIS system table)
ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

-- Create a policy for spatial_ref_sys to allow read access (it's a reference table)
CREATE POLICY "Allow read access to spatial reference systems" 
ON public.spatial_ref_sys 
FOR SELECT 
USING (true);