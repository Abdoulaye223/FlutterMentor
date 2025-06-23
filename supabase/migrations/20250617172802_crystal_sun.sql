/*
  # Fix all foreign key constraints for posts system

  1. Changes
    - Ensure all foreign key constraints have the correct names expected by the code
    - Fix post_comments.user_id -> users.id relationship
    - Fix post_likes.user_id -> users.id relationship
    - Ensure posts.user_id -> users.id relationship is correct

  2. Security
    - Maintains referential integrity
    - Ensures cascade deletion when user is deleted
*/

-- Fix post_comments foreign key constraints
DO $$
BEGIN
  -- Drop existing constraint if it exists with wrong name
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name != 'post_comments_user_id_fkey' 
    AND table_name = 'post_comments' 
    AND table_schema = 'public'
    AND constraint_type = 'FOREIGN KEY'
    AND EXISTS (
      SELECT 1 FROM information_schema.key_column_usage kcu
      WHERE kcu.constraint_name = table_constraints.constraint_name
      AND kcu.column_name = 'user_id'
    )
  ) THEN
    -- Find and drop the existing constraint
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
        AND kcu.column_name = 'user_id'
        AND tc.constraint_name != 'post_comments_user_id_fkey';
      
      IF constraint_name_to_drop IS NOT NULL THEN
        EXECUTE 'ALTER TABLE public.post_comments DROP CONSTRAINT ' || constraint_name_to_drop;
      END IF;
    END;
  END IF;

  -- Add the correct constraint if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'post_comments_user_id_fkey' 
    AND table_name = 'post_comments' 
    AND table_schema = 'public'
  ) THEN
    ALTER TABLE public.post_comments 
    ADD CONSTRAINT post_comments_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Fix post_likes foreign key constraints
DO $$
BEGIN
  -- Drop existing constraint if it exists with wrong name
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name != 'post_likes_user_id_fkey' 
    AND table_name = 'post_likes' 
    AND table_schema = 'public'
    AND constraint_type = 'FOREIGN KEY'
    AND EXISTS (
      SELECT 1 FROM information_schema.key_column_usage kcu
      WHERE kcu.constraint_name = table_constraints.constraint_name
      AND kcu.column_name = 'user_id'
    )
  ) THEN
    -- Find and drop the existing constraint
    DECLARE
      constraint_name_to_drop text;
    BEGIN
      SELECT tc.constraint_name INTO constraint_name_to_drop
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
      WHERE tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_name = 'post_likes'
        AND tc.table_schema = 'public'
        AND kcu.column_name = 'user_id'
        AND tc.constraint_name != 'post_likes_user_id_fkey';
      
      IF constraint_name_to_drop IS NOT NULL THEN
        EXECUTE 'ALTER TABLE public.post_likes DROP CONSTRAINT ' || constraint_name_to_drop;
      END IF;
    END;
  END IF;

  -- Add the correct constraint if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'post_likes_user_id_fkey' 
    AND table_name = 'post_likes' 
    AND table_schema = 'public'
  ) THEN
    ALTER TABLE public.post_likes 
    ADD CONSTRAINT post_likes_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Ensure posts foreign key is correct
DO $$
BEGIN
  -- Check if posts_user_id_fkey exists and points to the right table
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.constraint_column_usage ccu
      ON tc.constraint_name = ccu.constraint_name
    WHERE tc.constraint_name = 'posts_user_id_fkey'
      AND tc.table_name = 'posts'
      AND tc.table_schema = 'public'
      AND ccu.table_name = 'users'
      AND ccu.table_schema = 'public'
  ) THEN
    -- Drop existing constraint if it exists with wrong target
    IF EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'posts_user_id_fkey' 
      AND table_name = 'posts' 
      AND table_schema = 'public'
    ) THEN
      ALTER TABLE public.posts DROP CONSTRAINT posts_user_id_fkey;
    END IF;
    
    -- Add the correct constraint
    ALTER TABLE public.posts 
    ADD CONSTRAINT posts_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';