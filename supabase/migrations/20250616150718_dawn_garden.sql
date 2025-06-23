/*
  # Fix posts-users relationship

  1. Changes
    - Add proper foreign key constraint between posts.user_id and users.id
    - Name the constraint 'posts_user_id_fkey' to match the code expectation
    - Ensure the relationship works for Supabase queries

  2. Security
    - No changes to existing RLS policies
*/

-- First, let's make sure we have the proper foreign key constraint
-- Remove the existing constraint if it exists with a different name
DO $$
BEGIN
  -- Check if there's already a constraint with the expected name
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'posts_user_id_fkey' 
    AND table_name = 'posts' 
    AND table_schema = 'public'
  ) THEN
    -- Add the foreign key constraint with the correct name
    ALTER TABLE public.posts 
    ADD CONSTRAINT posts_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;
END $$;