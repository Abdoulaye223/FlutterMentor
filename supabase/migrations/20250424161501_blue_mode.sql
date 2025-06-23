/*
  # Fix user_challenges RLS policies

  1. Changes
    - Drop existing INSERT policy that has overly restrictive conditions
    - Create new INSERT policy with proper security checks
    
  2. Security
    - Ensures users can only create challenges for themselves
    - Validates initial status is 'in_progress'
*/

-- Drop the existing overly restrictive INSERT policy
DROP POLICY IF EXISTS "Users can create challenges" ON user_challenges;

-- Create new INSERT policy with proper conditions
CREATE POLICY "Users can create challenges" ON user_challenges
FOR INSERT TO authenticated
WITH CHECK (
  -- Ensure users can only create challenges for themselves
  auth.uid() = user_id AND
  -- Ensure initial status is 'in_progress'
  status = 'in_progress'
);