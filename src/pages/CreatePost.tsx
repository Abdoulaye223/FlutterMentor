import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Code2, Tag, Save } from 'lucide-react';
import { usePostsStore } from '../store/postsStore';
import { useAuthStore } from '../store/authStore';
import { ImageUpload } from '../components/ImageUpload';

export const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { createPost, isLoading } = usePostsStore();

  // États du formulaire
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    code_content: '',
    programming_language: 'dart', // Toujours Dart pour Flutter
    image_url: '',
    tags: [] as string[]
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Rediriger si l'utilisateur n'est pas connecté
  if (!user) {
    navigate('/posts');
    return null;
  }

  // Fonction pour valider le formulaire
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Le titre doit contenir au moins 5 caractères';
    }

    if (!formData.summary.trim()) {
      newErrors.summary = 'Le résumé est requis';
    } else if (formData.summary.length < 20) {
      newErrors.summary = 'Le résumé doit contenir au moins 20 caractères';
    }

    if (!formData.code_content.trim()) {
      newErrors.code_content = 'Le code est requis';
    } else if (formData.code_content.length < 10) {
      newErrors.code_content = 'Le code doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fonction pour gérer les changements dans les champs
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Fonction pour gérer l'upload d'image
  const handleImageUploaded = (url: string) => {
    setFormData(prev => ({ ...prev, image_url: url }));
  };

  // Fonction pour supprimer l'image
  const handleImageRemoved = () => {
    setFormData(prev => ({ ...prev, image_url: '' }));
  };

  // Fonction pour ajouter un tag
  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase();
      if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tag]
        }));
        setTagInput('');
      }
    }
  };

  // Fonction pour supprimer un tag
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await createPost({
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        code_content: formData.code_content.trim(),
        programming_language: formData.programming_language,
        tags: formData.tags,
        image_url: formData.image_url.trim() || undefined
      });
      
      navigate('/posts');
    } catch (error) {
      console.error('Erreur lors de la création du post:', error);
      setErrors({ submit: 'Erreur lors de la création du post' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* En-tête */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/posts')}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux posts
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Créer un nouveau post Flutter</h1>
        <p className="text-gray-600 mt-2">Partagez votre code Flutter avec la communauté</p>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Titre */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Titre du post *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Donnez un titre accrocheur à votre post Flutter..."
              maxLength={100}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-600">{errors.title}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {formData.title.length}/100 caractères
            </p>
          </div>

          {/* Résumé */}
          <div className="mb-6">
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
              Résumé *
            </label>
            <textarea
              id="summary"
              value={formData.summary}
              onChange={(e) => handleInputChange('summary', e.target.value)}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none ${
                errors.summary ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Décrivez brièvement votre code Flutter et son utilité..."
              maxLength={500}
            />
            {errors.summary && (
              <p className="mt-2 text-sm text-red-600">{errors.summary}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {formData.summary.length}/500 caractères
            </p>
          </div>

          {/* Code Dart/Flutter */}
          <div className="mb-6">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              <Code2 className="inline h-4 w-4 mr-1" />
              Code Dart/Flutter *
            </label>
            <textarea
              id="code"
              value={formData.code_content}
              onChange={(e) => handleInputChange('code_content', e.target.value)}
              rows={12}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm resize-none ${
                errors.code_content ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Collez votre code Dart/Flutter ici..."
            />
            {errors.code_content && (
              <p className="mt-2 text-sm text-red-600">{errors.code_content}</p>
            )}
          </div>

          {/* Upload d'image */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image du projet (optionnel)
            </label>
            <ImageUpload
              onImageUploaded={handleImageUploaded}
              onImageRemoved={handleImageRemoved}
              currentImageUrl={formData.image_url}
              disabled={isLoading}
            />
            <p className="mt-2 text-sm text-gray-500">
              Ajoutez une capture d'écran de votre app Flutter pour illustrer votre post
            </p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="inline h-4 w-4 mr-1" />
              Tags (maximum 5)
            </label>
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ex: widget, animation, ui, state-management..."
              disabled={formData.tags.length >= 5}
            />
            <p className="mt-1 text-sm text-gray-500">
              Appuyez sur Entrée ou virgule pour ajouter un tag
            </p>
            
            {/* Affichage des tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-indigo-600 hover:text-indigo-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Erreur générale */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/posts')}
              className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Publication...' : 'Publier le post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};