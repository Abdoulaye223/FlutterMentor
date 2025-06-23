import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  MessageCircle, 
  Code2, 
  Calendar,
  User,
  Plus,
  Eye
} from 'lucide-react';
import { usePostsStore } from '../store/postsStore';
import { useAuthStore } from '../store/authStore';

export const Posts: React.FC = () => {
  // État local pour le tri
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');

  // Récupération des données depuis les stores
  const { posts, isLoading, fetchPosts, toggleLike } = usePostsStore();
  const { user } = useAuthStore();

  // Charger les posts au montage du composant
  useEffect(() => {
    fetchPosts();
  }, []);

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Fonction pour formater le temps relatif
  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Il y a moins d\'une heure';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    if (diffInHours < 48) return 'Hier';
    return formatDate(dateString);
  };

  // Fonction pour gérer le like d'un post
  const handleLike = async (postId: string) => {
    if (!user) {
      // Rediriger vers la connexion ou afficher un message
      return;
    }
    await toggleLike(postId);
  };

  // Trier les posts
  const sortedPosts = posts
    .sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.likes_count + b.comments_count) - (a.likes_count + a.comments_count);
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* En-tête avec titre et bouton de création */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Posts Flutter</h1>
          <p className="text-gray-600">Découvrez les derniers codes Flutter partagés par la communauté</p>
        </div>
        {user && (
          <Link
            to="/posts/create"
            className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Créer un post
          </Link>
        )}
      </div>

      {/* Barre de tri simple */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Trier par :</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setSortBy('recent')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'recent'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Plus récents
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'popular'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Plus populaires
              </button>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            {posts.length} post{posts.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Grille des posts */}
      {sortedPosts.length === 0 ? (
        <div className="text-center py-12">
          <Code2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun post pour le moment</h3>
          <p className="text-gray-500 mb-6">
            Soyez le premier à partager votre code Flutter !
          </p>
          {user && (
            <Link
              to="/posts/create"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Créer le premier post
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Image du post (si disponible) */}
              {post.image_url && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6">
                {/* En-tête avec informations utilisateur */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center flex-1">
                    {post.users?.avatar_url ? (
                      <img
                        src={post.users.avatar_url}
                        alt={post.users.username || post.users.full_name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-indigo-600" />
                      </div>
                    )}
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {post.users?.full_name || post.users?.username || post.users?.email || 'Utilisateur'}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatRelativeTime(post.created_at)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Badge Flutter */}
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Flutter
                  </span>
                </div>

                {/* Titre et résumé */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.summary}
                </p>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-md">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions et statistiques */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    {/* Bouton like */}
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-1 text-sm transition-colors ${
                        post.is_liked 
                          ? 'text-red-600 hover:text-red-700' 
                          : 'text-gray-500 hover:text-red-600'
                      }`}
                      disabled={!user}
                    >
                      <Heart 
                        className={`h-4 w-4 ${post.is_liked ? 'fill-current' : ''}`} 
                      />
                      <span>{post.likes_count}</span>
                    </button>

                    {/* Nombre de commentaires */}
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments_count}</span>
                    </div>
                  </div>

                  {/* Bouton voir le post */}
                  <Link
                    to={`/posts/${post.id}`}
                    className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Voir</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Bouton "Charger plus" (pour une pagination future) */}
      {sortedPosts.length > 0 && (
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Charger plus de posts
          </button>
        </div>
      )}
    </div>
  );
};