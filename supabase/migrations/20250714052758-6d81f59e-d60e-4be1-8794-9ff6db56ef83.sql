-- Update the affiliation_type enum to use the new values
ALTER TYPE public.affiliation_type RENAME TO affiliation_type_old;

CREATE TYPE public.affiliation_type AS ENUM (
  'permanent',
  'contract', 
  'intern',
  'agent',
  'member'
);

-- Update the table to use the new enum
ALTER TABLE public.team_registration_players 
ALTER COLUMN relationship_type DROP DEFAULT;

ALTER TABLE public.team_registration_players 
ALTER COLUMN relationship_type TYPE public.affiliation_type 
USING 
  CASE 
    WHEN relationship_type::text = 'employee' THEN 'permanent'::affiliation_type
    WHEN relationship_type::text = 'contractor' THEN 'contract'::affiliation_type
    WHEN relationship_type::text = 'consultant' THEN 'contract'::affiliation_type
    WHEN relationship_type::text = 'partner' THEN 'member'::affiliation_type
    WHEN relationship_type::text = 'sponsor' THEN 'member'::affiliation_type
    WHEN relationship_type::text = 'vendor' THEN 'agent'::affiliation_type
    ELSE 'permanent'::affiliation_type
  END;

ALTER TABLE public.team_registration_players 
ALTER COLUMN relationship_type SET DEFAULT 'permanent';

-- Drop the old enum
DROP TYPE public.affiliation_type_old;