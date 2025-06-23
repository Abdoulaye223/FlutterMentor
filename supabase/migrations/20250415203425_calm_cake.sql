/*
  # Création des tables pour la gestion des défis utilisateur

  1. New Tables
    - `user_challenges`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `challenge_id` (integer)
      - `status` (text) - 'in_progress' ou 'completed'
      - `started_at` (timestamp)
      - `completed_at` (timestamp, nullable)
      - `repository_url` (text, nullable)
      - `submission_notes` (text, nullable)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `user_challenges` table
    - Add policies for authenticated users to:
      - Read their own challenges
      - Create new challenge entries
      - Update their own challenge entries
*/

BEGIN;

-- Create the user_challenges table
CREATE TABLE IF NOT EXISTS public.user_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  challenge_id integer NOT NULL,
  status text NOT NULL CHECK (status IN ('in_progress', 'completed')),
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  repository_url text,
  submission_notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can read own challenges" ON public.user_challenges;
  DROP POLICY IF EXISTS "Users can create challenges" ON public.user_challenges;
  DROP POLICY IF EXISTS "Users can update own challenges" ON public.user_challenges;
  
  -- Create new policies
  CREATE POLICY "Users can read own challenges"
    ON public.user_challenges
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

  CREATE POLICY "Users can create challenges"
    ON public.user_challenges
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

  CREATE POLICY "Users can update own challenges"
    ON public.user_challenges
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
END $$;

COMMIT;