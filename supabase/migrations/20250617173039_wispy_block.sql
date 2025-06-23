/*
  # Add missing foreign key constraint for post_comments

  1. Changes
    - Add foreign key constraint `post_comments_user_id_fkey` linking `post_comments.user_id` to `users.id`
    - This constraint is required for PostgREST to perform relational queries using the hint syntax

  2. Security
    - No RLS changes needed as the constraint is purely relational
    - CASCADE delete ensures data integrity when users are deleted

  3. Notes
    - This fixes the PGRST200 error when fetching comments with user data
    - PostgREST uses the constraint name as a hint for relational queries
*/

-- Add the missing foreign key constraint between post_comments and users
DO $$
BEGIN
  -- Check if the constraint doesn't already exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'post_comments_user_id_fkey' 
    AND table_name = 'post_comments'
  ) THEN
    ALTER TABLE post_comments
    ADD CONSTRAINT post_comments_user_id_fkey
      FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE;
  END IF;
END $$;