/*
  # Fix posts-users foreign key relationship

  1. Changes
    - Remove existing foreign key constraint from posts to auth.users
    - Add new foreign key constraint from posts.user_id to public.users.id
    - Use the exact constraint name expected by the code: posts_user_id_fkey

  2. Security
    - Maintains referential integrity
    - Ensures cascade deletion when user is deleted
*/

-- First, drop the existing foreign key constraint to auth.users
DO $$
BEGIN
  -- Check if the constraint exists and drop it
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'posts_user_id_fkey' 
    AND table_name = 'posts' 
    AND table_schema = 'public'
    AND constraint_type = 'FOREIGN KEY'
  ) THEN
    ALTER TABLE public.posts DROP CONSTRAINT posts_user_id_fkey;
  END IF;
END $$;

-- Add the correct foreign key constraint with the expected name
ALTER TABLE public.posts 
ADD CONSTRAINT posts_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- Refresh the schema cache (PostgREST will pick this up automatically)
NOTIFY pgrst, 'reload schema';