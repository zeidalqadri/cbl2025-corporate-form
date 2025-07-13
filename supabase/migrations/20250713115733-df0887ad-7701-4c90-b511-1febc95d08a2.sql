-- Completely recreate the users_masked view with proper ownership
DROP VIEW IF EXISTS public.users_masked CASCADE;

-- Create the view as the authenticated user would see it
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

-- Grant appropriate permissions
GRANT SELECT ON public.users_masked TO authenticated, anon;