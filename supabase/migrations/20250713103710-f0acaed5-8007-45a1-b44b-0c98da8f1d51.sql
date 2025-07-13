-- Create team_registrations table for CBL 2025 Corporate Edition
CREATE TABLE public.team_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_name TEXT NOT NULL,
  company_1 TEXT NOT NULL,
  company_2 TEXT,
  has_second_company BOOLEAN DEFAULT false,
  payment_file_url TEXT,
  payment_file_name TEXT,
  payment_file_size INTEGER,
  total_players INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  google_sheet_synced BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create team_registration_players table
CREATE TABLE public.team_registration_players (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id UUID NOT NULL REFERENCES public.team_registrations(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  ic_passport TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  affiliation TEXT NOT NULL CHECK (affiliation IN ('company_1', 'company_2')),
  player_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.team_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_registration_players ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (registration form)
CREATE POLICY "Allow public registration submissions" 
ON public.team_registrations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public to view their registrations" 
ON public.team_registrations 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public player submissions" 
ON public.team_registration_players 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public to view players" 
ON public.team_registration_players 
FOR SELECT 
USING (true);

-- Create storage bucket for payment uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-uploads', 'payment-uploads', false);

-- Create storage policies
CREATE POLICY "Allow public payment uploads" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'payment-uploads');

CREATE POLICY "Allow public to view uploaded payments" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'payment-uploads');

-- Create trigger for updating timestamps
CREATE TRIGGER update_team_registrations_updated_at
BEFORE UPDATE ON public.team_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_team_registrations_created_at ON public.team_registrations(created_at);
CREATE INDEX idx_team_registration_players_registration_id ON public.team_registration_players(registration_id);
CREATE INDEX idx_team_registration_players_order ON public.team_registration_players(registration_id, player_order);