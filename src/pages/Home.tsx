import React, { useEffect, useState } from 'react';
import { Layout, Users, Code2, ArrowRight, Clock, Heart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePostsStore } from '../store/postsStore';

export const Home: React.FC = () => {
  const { posts, fetchPosts, isLoading } = usePostsStore();
  const [latestPosts, setLatestPosts] = useState<any[]>([]);

  // Fetch posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Update latest posts when posts change
  useEffect(() => {
    // Get the 3 most recent posts for the home page
    const recentPosts = posts
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 3);
    setLatestPosts(recentPosts);
  }, [posts]);

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Function to get a fallback image based on programming language
  const getFallbackImage = (language: string) => {
    const images = {
      dart: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      javascript: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      python: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      flutter: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    };
    return images[language as keyof typeof images] || images.dart;
  };

  return (
    <>
      {/* Section héro */}
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Partagez votre code avec la communauté
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-indigo-100 sm:text-2xl md:mt-5 md:max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Publiez vos projets, découvrez des solutions créatives et apprenez avec d'autres développeurs passionnés.
            </p>
            <div className="mt-10 flex justify-center space-x-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link 
                to="/posts" 
                className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-all transform hover:scale-105 flex items-center"
              >
                Découvrir les posts
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Section des posts récents */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Posts récents de la communauté</h2>
            <p className="mt-4 text-xl text-gray-600">Découvrez les derniers codes partagés par nos développeurs</p>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Chargement des posts...</p>
            </div>
          ) : latestPosts.length === 0 ? (
            <div className="text-center py-12">
              <Code2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun post pour le moment</h3>
              <p className="text-gray-500 mb-6">
                Soyez le premier à partager votre code Flutter !
              </p>
              <Link
                to="/posts/create"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Code2 className="h-5 w-5 mr-2" />
                Créer le premier post
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="relative h-48">
                    <img
                      src={post.image_url || getFallbackImage(post.programming_language)}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-full">
                        {post.programming_language}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.summary}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        {post.users?.avatar_url ? (
                          <img
                            src={post.users.avatar_url}
                            alt={post.users.full_name || post.users.username}
                            className="w-6 h-6 rounded-full object-cover mr-2"
                          />
                        ) : (
                          <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                            <Code2 className="h-3 w-3 text-indigo-600" />
                          </div>
                        )}
                        <span>{post.users?.full_name || post.users?.username || post.users?.email || 'Utilisateur'}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-gray-500">
                          <Heart className="h-4 w-4 mr-1" />
                          <span className="text-sm">{post.likes_count}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          <span className="text-sm">{post.comments_count}</span>
                        </div>
                      </div>
                      <Link
                        to={`/posts/${post.id}`}
                        className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                      >
                        Lire plus →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          
          {latestPosts.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/posts"
                className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 text-lg"
              >
                Voir tous les posts
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Section des fonctionnalités */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Pourquoi choisir FlutterMentor?</h2>
            <p className="mt-4 text-xl text-gray-600">Une plateforme conçue pour les développeurs, par les développeurs</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all">
              <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Partage de Code</h3>
              <p className="text-gray-600">
                Partagez facilement vos projets et découvrez des solutions créatives de la communauté.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all">
              <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Communauté Active</h3>
              <p className="text-gray-600">
                Échangez, commentez et apprenez avec une communauté passionnée de développeurs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all">
              <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Layout className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Interface Moderne</h3>
              <p className="text-gray-600">
                Une interface élégante et intuitive pour une expérience de partage optimale.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section d'appel à l'action */}
      <div className="bg-indigo-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              Prêt à partager votre premier post?
            </h2>
            <Link 
              to="/posts/create" 
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-all transform hover:scale-105"
            >
              Créer un post
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};