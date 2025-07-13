-- Phase 1: Create profiles table and authentication trigger
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  company TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create trigger for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add trigger for updating timestamps
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Phase 2: Fix RLS policies on existing tables
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow all operations for development" ON public.team_registrations;
DROP POLICY IF EXISTS "Allow all operations for development" ON public.team_registration_players;

-- Create secure policies for team registrations
CREATE POLICY "Users can view all registrations" 
ON public.team_registrations 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create registrations" 
ON public.team_registrations 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can update their own registrations" 
ON public.team_registrations 
FOR UPDATE 
TO authenticated
USING (true);

-- Create secure policies for team registration players
CREATE POLICY "Users can view all players" 
ON public.team_registration_players 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can add players" 
ON public.team_registration_players 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Add user_id column to team_registrations to track ownership
ALTER TABLE public.team_registrations 
ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Update policies to use user_id for ownership
DROP POLICY "Users can update their own registrations" ON public.team_registrations;
CREATE POLICY "Users can update their own registrations" 
ON public.team_registrations 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- Create admin role system
CREATE TYPE public.user_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create policy for user_roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Admin policies for team registrations
CREATE POLICY "Admins can do everything on registrations" 
ON public.team_registrations 
FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Input validation functions
CREATE OR REPLACE FUNCTION public.validate_email(email TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
IMMUTABLE
AS $$
  SELECT email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
$$;

CREATE OR REPLACE FUNCTION public.validate_phone(phone TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
IMMUTABLE
AS $$
  SELECT phone ~* '^\+?[1-9]\d{1,14}$'
$$;

-- Add constraints for validation
ALTER TABLE public.team_registration_players
ADD CONSTRAINT valid_email CHECK (public.validate_email(email));

ALTER TABLE public.team_registration_players
ADD CONSTRAINT valid_phone CHECK (public.validate_phone(phone));