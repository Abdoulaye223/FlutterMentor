/*
  # Fix user challenges RLS policies

  1. Changes
    - Drop and recreate the insert policy with clearer conditions
    - Ensure policy explicitly checks user_id matches authenticated user

  2. Security
    - Maintains RLS enabled
    - Ensures users can only create challenges for themselves
*/

-- Drop existing insert policy
DROP POLICY IF EXISTS "Users can create challenges" ON user_challenges;

-- Recreate insert policy with explicit conditions
CREATE POLICY "Users can create challenges" ON user_challenges
FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = user_id AND
  status IN ('in_progress', 'completed')
);