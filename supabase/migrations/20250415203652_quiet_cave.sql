/*
  # Fix user_challenges RLS policies

  1. Changes
    - Update RLS policies for user_challenges table to allow authenticated users to:
      - Insert their own challenges
      - Read their own challenges
      - Update their own challenges

  2. Security
    - Enable RLS on user_challenges table
    - Add policies for INSERT, SELECT, and UPDATE operations
    - Ensure users can only access their own data
*/

BEGIN;

-- Enable RLS
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can create challenges" ON public.user_challenges;
  DROP POLICY IF EXISTS "Users can read own challenges" ON public.user_challenges;
  DROP POLICY IF EXISTS "Users can update own challenges" ON public.user_challenges;

  -- Create new policies
  CREATE POLICY "Users can create challenges"
    ON public.user_challenges
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

  CREATE POLICY "Users can read own challenges"
    ON public.user_challenges
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

  CREATE POLICY "Users can update own challenges"
    ON public.user_challenges
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
END $$;

COMMIT;