import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Github, Mail, Edit3, Save, X, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useProfileStore } from '../store/profileStore';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { profile, isLoading, error, fetchProfile, updateProfile, clearError } = useProfileStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    full_name: ''
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    
    fetchProfile();
  }, [user, navigate]);

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        bio: profile.bio || '',
        full_name: profile.full_name || ''
      });
    }
  }, [profile]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => clearError();
  }, []);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (formData.bio && formData.bio.length > 500) {
      errors.bio = 'La bio ne peut pas dépasser 500 caractères';
    }
    
    if (formData.full_name && formData.full_name.length > 100) {
      errors.full_name = 'Le nom complet ne peut pas dépasser 100 caractères';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      bio: profile?.bio || '',
      full_name: profile?.full_name || ''
    });
    setIsEditing(false);
    setValidationErrors({});
  };

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-8 py-12">
          <div className="flex items-center">
            <div className="relative">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-white">
                  <User className="h-12 w-12 text-indigo-600" />
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-gray-900 rounded-full p-2">
                <Github className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-white">
                {profile?.full_name || profile?.username || 'Utilisateur'}
              </h1>
              {profile?.username && (
                <p className="text-indigo-200 text-lg">@{profile.username}</p>
              )}
              <div className="flex items-center mt-2 text-indigo-200">
                <Mail className="h-4 w-4 mr-2" />
                <span>{profile?.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
              <span className="text-red-700">{error}</span>
              <button
                onClick={clearError}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      validationErrors.full_name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Votre nom complet"
                    maxLength={100}
                  />
                  {validationErrors.full_name && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.full_name}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.full_name.length}/100 caractères
                  </p>
                </div>
              ) : (
                <p className="text-gray-900 text-lg">
                  {profile?.full_name || 'Non renseigné'}
                </p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              {isEditing ? (
                <div>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none ${
                      validationErrors.bio ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Parlez-nous de vous, de votre expérience avec Flutter..."
                    maxLength={500}
                  />
                  {validationErrors.bio && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.bio}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.bio.length}/500 caractères
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 min-h-[100px]">
                  {profile?.bio ? (
                    <p className="text-gray-700 whitespace-pre-wrap">{profile.bio}</p>
                  ) : (
                    <p className="text-gray-500 italic">
                      Aucune bio renseignée. Cliquez sur "Modifier" pour ajouter une description.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* GitHub Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Informations GitHub
              </label>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center">
                  <Github className="h-5 w-5 text-gray-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {profile?.username || 'Non disponible'}
                    </p>
                    <p className="text-sm text-gray-600">Nom d'utilisateur GitHub</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Informations du compte
              </label>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Membre depuis :</span>
                  <span className="text-gray-900">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('fr-FR') : 'Non disponible'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dernière mise à jour :</span>
                  <span className="text-gray-900">
                    {profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString('fr-FR') : 'Non disponible'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <X className="h-4 w-4 mr-2 inline" />
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="h-4 w-4 mr-2 inline" />
                  {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Edit3 className="h-4 w-4 mr-2 inline" />
                Modifier le profil
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};