import { create } from 'zustand';
import { supabase } from '../lib/supabase';

// Interface pour définir la structure d'un post
interface Post {
  id: string;
  user_id: string;
  title: string;
  summary: string;
  code_content: string;
  programming_language: string;
  tags: string[];
  image_url?: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  users?: {
    username: string;
    full_name: string;
    avatar_url?: string;
    email: string;
  };
  is_liked?: boolean;
}

// Interface pour définir la structure d'un commentaire
interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  users?: {
    username: string;
    full_name: string;
    avatar_url?: string;
    email: string;
  };
}

// Interface pour définir l'état du store des posts
interface PostsState {
  posts: Post[];
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  
  // Actions pour gérer les posts
  fetchPosts: () => Promise<void>;
  createPost: (postData: {
    title: string;
    summary: string;
    code_content: string;
    programming_language: string;
    tags: string[];
    image_url?: string;
  }) => Promise<void>;
  updatePost: (postId: string, updates: Partial<Post>) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  
  // Actions pour gérer les likes
  toggleLike: (postId: string) => Promise<void>;
  
  // Actions pour gérer les commentaires
  fetchComments: (postId: string) => Promise<void>;
  createComment: (postId: string, content: string) => Promise<void>;
  updateComment: (commentId: string, content: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  
  // Actions utilitaires
  clearError: () => void;
}

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  comments: [],
  isLoading: false,
  error: null,

  // Récupérer tous les posts avec les informations des utilisateurs
  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Récupérer les posts avec les profils utilisateurs depuis la table users
      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select(`
          *,
          users!posts_user_id_fkey (
            username,
            full_name,
            avatar_url,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (postsError) {
        console.error('Erreur lors de la récupération des posts:', postsError);
        throw postsError;
      }

      // Si l'utilisateur est connecté, vérifier quels posts il a likés
      let postsWithLikes = posts || [];
      if (user) {
        const { data: userLikes } = await supabase
          .from('post_likes')
          .select('post_id')
          .eq('user_id', user.id);

        const likedPostIds = new Set(userLikes?.map(like => like.post_id) || []);
        
        postsWithLikes = posts?.map(post => ({
          ...post,
          is_liked: likedPostIds.has(post.id)
        })) || [];
      }

      console.log('Posts récupérés:', postsWithLikes);
      set({ posts: postsWithLikes, isLoading: false });
    } catch (error) {
      console.error('Erreur lors de la récupération des posts:', error);
      set({ error: 'Erreur lors de la récupération des posts', isLoading: false });
    }
  },

  // Créer un nouveau post
  createPost: async (postData) => {
    set({ isLoading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Utilisateur non authentifié');

      console.log('Création du post avec les données:', postData);

      // Vérifier si l'utilisateur existe dans la table users, sinon le créer
      const { data: existingUser, error: userCheckError } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single();

      if (userCheckError && userCheckError.code === 'PGRST116') {
        // L'utilisateur n'existe pas dans la table users, le créer
        console.log('Création du profil utilisateur...');
        const { error: createUserError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email!,
            username: user.user_metadata?.user_name || user.user_metadata?.username,
            full_name: user.user_metadata?.full_name || user.user_metadata?.name,
            avatar_url: user.user_metadata?.avatar_url
          });

        if (createUserError) {
          console.error('Erreur lors de la création du profil utilisateur:', createUserError);
          throw createUserError;
        }
      }

      // Créer le post
      const { data, error } = await supabase
        .from('posts')
        .insert({
          ...postData,
          user_id: user.id
        })
        .select(`
          *,
          users!posts_user_id_fkey (
            username,
            full_name,
            avatar_url,
            email
          )
        `)
        .single();

      if (error) {
        console.error('Erreur lors de la création du post:', error);
        throw error;
      }

      console.log('Post créé avec succès:', data);

      // Ajouter le nouveau post au début de la liste
      set(state => ({
        posts: [{ ...data, is_liked: false }, ...state.posts],
        isLoading: false
      }));
    } catch (error) {
      console.error('Erreur lors de la création du post:', error);
      set({ error: 'Erreur lors de la création du post', isLoading: false });
      throw error; // Re-throw pour que le composant puisse gérer l'erreur
    }
  },

  // Mettre à jour un post existant
  updatePost: async (postId, updates) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', postId)
        .select(`
          *,
          users!posts_user_id_fkey (
            username,
            full_name,
            avatar_url,
            email
          )
        `)
        .single();

      if (error) throw error;

      // Mettre à jour le post dans la liste
      set(state => ({
        posts: state.posts.map(post => 
          post.id === postId ? { ...data, is_liked: post.is_liked } : post
        ),
        isLoading: false
      }));
    } catch (error) {
      console.error('Erreur lors de la mise à jour du post:', error);
      set({ error: 'Erreur lors de la mise à jour du post', isLoading: false });
    }
  },

  // Supprimer un post
  deletePost: async (postId) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      // Retirer le post de la liste
      set(state => ({
        posts: state.posts.filter(post => post.id !== postId),
        isLoading: false
      }));
    } catch (error) {
      console.error('Erreur lors de la suppression du post:', error);
      set({ error: 'Erreur lors de la suppression du post', isLoading: false });
    }
  },

  // Basculer le like d'un post
  toggleLike: async (postId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Utilisateur non authentifié');

      const post = get().posts.find(p => p.id === postId);
      if (!post) return;

      if (post.is_liked) {
        // Retirer le like
        const { error } = await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        if (error) throw error;

        // Mettre à jour l'état local
        set(state => ({
          posts: state.posts.map(p => 
            p.id === postId 
              ? { ...p, is_liked: false, likes_count: p.likes_count - 1 }
              : p
          )
        }));
      } else {
        // Ajouter le like
        const { error } = await supabase
          .from('post_likes')
          .insert({
            post_id: postId,
            user_id: user.id
          });

        if (error) throw error;

        // Mettre à jour l'état local
        set(state => ({
          posts: state.posts.map(p => 
            p.id === postId 
              ? { ...p, is_liked: true, likes_count: p.likes_count + 1 }
              : p
          )
        }));
      }
    } catch (error) {
      console.error('Erreur lors du toggle like:', error);
      set({ error: 'Erreur lors de la gestion du like' });
    }
  },

  // Récupérer les commentaires d'un post
  fetchComments: async (postId) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('post_comments')
        .select(`
          *,
          users!post_comments_user_id_fkey (
            username,
            full_name,
            avatar_url,
            email
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      set({ comments: data || [], isLoading: false });
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
      set({ error: 'Erreur lors de la récupération des commentaires', isLoading: false });
    }
  },

  // Créer un nouveau commentaire
  createComment: async (postId, content) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Utilisateur non authentifié');

      const { data, error } = await supabase
        .from('post_comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content
        })
        .select(`
          *,
          users!post_comments_user_id_fkey (
            username,
            full_name,
            avatar_url,
            email
          )
        `)
        .single();

      if (error) throw error;

      // Ajouter le commentaire à la liste
      set(state => ({
        comments: [...state.comments, data],
        posts: state.posts.map(p => 
          p.id === postId 
            ? { ...p, comments_count: p.comments_count + 1 }
            : p
        )
      }));
    } catch (error) {
      console.error('Erreur lors de la création du commentaire:', error);
      set({ error: 'Erreur lors de la création du commentaire' });
    }
  },

  // Mettre à jour un commentaire
  updateComment: async (commentId, content) => {
    try {
      const { data, error } = await supabase
        .from('post_comments')
        .update({ content })
        .eq('id', commentId)
        .select(`
          *,
          users!post_comments_user_id_fkey (
            username,
            full_name,
            avatar_url,
            email
          )
        `)
        .single();

      if (error) throw error;

      // Mettre à jour le commentaire dans la liste
      set(state => ({
        comments: state.comments.map(comment => 
          comment.id === commentId ? data : comment
        )
      }));
    } catch (error) {
      console.error('Erreur lors de la mise à jour du commentaire:', error);
      set({ error: 'Erreur lors de la mise à jour du commentaire' });
    }
  },

  // Supprimer un commentaire
  deleteComment: async (commentId) => {
    try {
      const commentToDelete = get().comments.find(c => c.id === commentId);
      if (!commentToDelete) return;

      const { error } = await supabase
        .from('post_comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      // Retirer le commentaire de la liste
      set(state => ({
        comments: state.comments.filter(comment => comment.id !== commentId),
        posts: state.posts.map(p => 
          p.id === commentToDelete.post_id 
            ? { ...p, comments_count: p.comments_count - 1 }
            : p
        )
      }));
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);
      set({ error: 'Erreur lors de la suppression du commentaire' });
    }
  },

  // Effacer les erreurs
  clearError: () => set({ error: null })
}));