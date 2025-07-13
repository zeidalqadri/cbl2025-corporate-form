-- Create enum for relationship types
CREATE TYPE public.affiliation_type AS ENUM (
  'employee',
  'contractor', 
  'consultant',
  'partner',
  'sponsor',
  'vendor',
  'other'
);

-- Update team_registration_players table to use the new enum
-- First add the new column
ALTER TABLE public.team_registration_players 
ADD COLUMN relationship_type public.affiliation_type;

-- Update existing data to map from old affiliation format
UPDATE public.team_registration_players 
SET relationship_type = 'employee'
WHERE affiliation IN ('company_1', 'company_2');

-- Make the new column NOT NULL after populating it
ALTER TABLE public.team_registration_players 
ALTER COLUMN relationship_type SET NOT NULL;

-- Add a default value for future inserts
ALTER TABLE public.team_registration_players 
ALTER COLUMN relationship_type SET DEFAULT 'employee';

-- Keep the old affiliation column for now to track which company
-- Update the check constraint to allow more flexible values
ALTER TABLE public.team_registration_players 
DROP CONSTRAINT IF EXISTS team_registration_players_affiliation_check;

-- Add a comment to clarify the purpose of each column
COMMENT ON COLUMN public.team_registration_players.affiliation IS 'Indicates which company (company_1 or company_2)';
COMMENT ON COLUMN public.team_registration_players.relationship_type IS 'Type of relationship with the company (employee, contractor, etc.)';