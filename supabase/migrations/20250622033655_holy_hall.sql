/*
  # Fix post_comments foreign key relationship

  1. Changes
    - Drop existing foreign key constraint from post_comments.user_id to auth.users
    - Add correct foreign key constraint from post_comments.user_id to public.users
    - Ensure the constraint name matches what the code expects: post_comments_user_id_fkey

  2. Security
    - Maintains referential integrity
    - Ensures cascade deletion when user is deleted
    - No changes to RLS policies needed
*/

-- First, drop any existing foreign key constraints on post_comments.user_id
DO $$
BEGIN
  -- Find and drop existing foreign key constraints on user_id column
  DECLARE
    constraint_name_to_drop text;
  BEGIN
    SELECT tc.constraint_name INTO constraint_name_to_drop
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
    WHERE tc.constraint_type = 'FOREIGN KEY'
      AND tc.table_name = 'post_comments'
      AND tc.table_schema = 'public'
      AND kcu.column_name = 'user_id';
    
    IF constraint_name_to_drop IS NOT NULL THEN
      EXECUTE 'ALTER TABLE public.post_comments DROP CONSTRAINT ' || constraint_name_to_drop;
    END IF;
  END;
END $$;

-- Add the correct foreign key constraint with the expected name
ALTER TABLE public.post_comments
ADD CONSTRAINT post_comments_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES public.users(id)
  ON DELETE CASCADE;

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';