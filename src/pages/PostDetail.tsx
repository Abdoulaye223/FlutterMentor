import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  MessageCircle, 
  Calendar, 
  User, 
  Code2, 
  ArrowLeft,
  Edit,
  Trash2,
  Send,
  MoreVertical
} from 'lucide-react';
import { usePostsStore } from '../store/postsStore';
import { useAuthStore } from '../store/authStore';

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { 
    posts, 
    comments, 
    fetchPosts, 
    fetchComments, 
    toggleLike, 
    createComment,
    deletePost,
    deleteComment 
  } = usePostsStore();

  // États locaux
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Récupérer le post actuel
  const post = posts.find(p => p.id === id);

  // Charger les données au montage
  useEffect(() => {
    if (!posts.length) {
      fetchPosts();
    }
    if (id) {
      fetchComments(id);
    }
  }, [id]);

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fonction pour gérer le like
  const handleLike = async () => {
    if (!user || !post) return;
    await toggleLike(post.id);
  };

  // Fonction pour soumettre un commentaire
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !post || !newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      await createComment(post.id, newComment.trim());
      setNewComment('');
    } catch (error) {
      console.error('Erreur lors de la création du commentaire:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Fonction pour supprimer le post
  const handleDeletePost = async () => {
    if (!post) return;
    
    try {
      await deletePost(post.id);
      navigate('/posts');
    } catch (error) {
      console.error('Erreur lors de la suppression du post:', error);
    }
  };

  // Fonction pour supprimer un commentaire
  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);
    }
  };

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post non trouvé</h1>
          <Link 
            to="/posts" 
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Retour aux posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Navigation de retour */}
      <div className="mb-8">
        <Link 
          to="/posts" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux posts
        </Link>
      </div>

      {/* Contenu principal du post */}
      <article className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Image du post (si disponible) */}
        {post.image_url && (
          <div className="aspect-video overflow-hidden">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8">
          {/* En-tête avec informations utilisateur et actions */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              {post.users?.avatar_url ? (
                <img
                  src={post.users.avatar_url}
                  alt={post.users.username || post.users.full_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-indigo-600" />
                </div>
              )}
              <div className="ml-4">
                <h4 className="text-lg font-medium text-gray-900">
                  {post.users?.full_name || post.users?.username || post.users?.email || 'Utilisateur'}
                </h4>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(post.created_at)}
                </div>
              </div>
            </div>

            {/* Actions pour le propriétaire du post */}
            {user && user.id === post.user_id && (
              <div className="flex items-center space-x-2">
                <Link
                  to={`/posts/${post.id}/edit`}
                  className="p-2 text-gray-500 hover:text-indigo-600 rounded-lg hover:bg-gray-100"
                >
                  <Edit className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-gray-100"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Badge du langage et tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full">
              {post.programming_language}
            </span>
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Titre et résumé */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">{post.summary}</p>

          {/* Code */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Code2 className="h-5 w-5 mr-2" />
                Code
              </h3>
            </div>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                {post.programming_language}
              </div>
              <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                <code>{post.code_content}</code>
              </pre>
            </div>
          </div>

          {/* Actions et statistiques */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-6">
              {/* Bouton like */}
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  post.is_liked 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
                disabled={!user}
              >
                <Heart 
                  className={`h-5 w-5 ${post.is_liked ? 'fill-current' : ''}`} 
                />
                <span className="font-medium">{post.likes_count}</span>
              </button>

              {/* Nombre de commentaires */}
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg">
                <MessageCircle className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-600">{post.comments_count}</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Section des commentaires */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Commentaires ({comments.length})
        </h3>

        {/* Formulaire d'ajout de commentaire */}
        {user ? (
          <form onSubmit={handleSubmitComment} className="mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ajoutez votre commentaire..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                rows={3}
                required
              />
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={isSubmittingComment || !newComment.trim()}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmittingComment ? 'Envoi...' : 'Commenter'}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-center">
            <p className="text-gray-600 mb-4">Connectez-vous pour laisser un commentaire</p>
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Se connecter
            </Link>
          </div>
        )}

        {/* Liste des commentaires */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Aucun commentaire pour le moment</p>
              <p className="text-sm text-gray-400">Soyez le premier à commenter !</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    {comment.users?.avatar_url ? (
                      <img
                        src={comment.users.avatar_url}
                        alt={comment.users.username || comment.users.full_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-indigo-600" />
                      </div>
                    )}
                    <div className="ml-3 flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-medium text-gray-900">
                          {comment.users?.full_name || comment.users?.username || comment.users?.email || 'Utilisateur'}
                        </h5>
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>

                  {/* Actions pour le propriétaire du commentaire */}
                  {user && user.id === comment.user_id && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="p-1 text-gray-400 hover:text-red-600 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Supprimer le post
            </h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer ce post ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                onClick={handleDeletePost}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};