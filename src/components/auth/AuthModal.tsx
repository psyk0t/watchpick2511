import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, LogIn, UserPlus, AlertCircle, Star, Heart, Film, Coffee, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BENEFITS = [
  { 
    icon: Star, 
    title: 'Recommandations',
    description: 'Personnalisées pour vous'
  },
  { 
    icon: Heart, 
    title: 'Organisation',
    description: 'Favoris, vus, à voir'
  },
  { 
    icon: Film, 
    title: 'Sans pub',
    description: 'Expérience fluide'
  },
  { 
    icon: Coffee, 
    title: 'Soutien',
    description: 'Aidez WatchPick'
  }
];

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showGoogleConfirm, setShowGoogleConfirm] = useState(false);
  const [showGoogleSuccess, setShowGoogleSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        onClose();
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Les mots de passe ne correspondent pas');
          return;
        }
        await signUp(formData.email, formData.password);
        setSuccess('Un email de vérification vous a été envoyé');
        setTimeout(() => {
          setIsLogin(true);
          setSuccess(null);
          setFormData({
            email: '',
            password: '',
            confirmPassword: ''
          });
        }, 5000);
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('email-already-in-use')) {
          setError('Email déjà utilisé');
        } else if (err.message.includes('weak-password')) {
          setError('Mot de passe trop faible');
        } else if (err.message.includes('invalid-email')) {
          setError('Email invalide');
        } else if (err.message.includes('user-not-found') || err.message.includes('wrong-password')) {
          setError('Email ou mot de passe incorrect');
        } else if (err.message.includes('too-many-requests')) {
          setError('Trop de tentatives');
        } else if (err.message.includes('email-not-verified')) {
          setError('Vérifiez votre email');
        } else {
          setError(err.message);
        }
      } else {
        setError('Une erreur est survenue');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setShowGoogleConfirm(false);
      setShowGoogleSuccess(true);
      setTimeout(() => {
        setShowGoogleSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur avec Google');
    }
  };

  if (showGoogleSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-sm bg-white rounded-xl shadow-xl p-6 text-center"
        >
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Connexion réussie !
          </h3>
          <p className="text-gray-600">
            Bienvenue sur WatchPick
          </p>
        </motion.div>
      </motion.div>
    );
  }

  if (showGoogleConfirm) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-sm bg-white rounded-xl shadow-xl p-6"
        >
          <button
            onClick={() => setShowGoogleConfirm(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>

          <div className="text-center space-y-4">
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-12 h-12 mx-auto"
            />
            <h3 className="text-lg font-bold text-gray-800">
              Connexion avec Google
            </h3>
            <p className="text-sm text-gray-600">
              Vous allez être redirigé vers Google
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleGoogleSignIn}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Continuer
              </button>
              <button
                onClick={() => setShowGoogleConfirm(false)}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Annuler
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-sm bg-white rounded-xl shadow-xl p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {isLogin ? 'Connexion' : 'Inscription'}
            </h2>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 p-2 rounded-lg mb-4 text-xs">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 bg-green-50 text-green-600 p-2 rounded-lg mb-4 text-xs">
                <CheckCircle size={14} />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    required
                  />
                  <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    required
                  />
                  <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Confirmer
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      required
                    />
                    <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                {isLogin ? (
                  <>
                    <LogIn size={16} />
                    Se connecter
                  </>
                ) : (
                  <>
                    <UserPlus size={16} />
                    S'inscrire
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 space-y-4">
              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-2">
                {BENEFITS.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex flex-col items-center text-center p-2 bg-gray-50 rounded-lg">
                    <Icon className="w-4 h-4 text-indigo-600 mb-1" />
                    <h3 className="text-xs font-medium text-gray-800">{title}</h3>
                    <p className="text-[10px] text-gray-500">{description}</p>
                  </div>
                ))}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">Ou</span>
                </div>
              </div>

              <button
                onClick={() => setShowGoogleConfirm(true)}
                className="w-full flex items-center justify-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                <span className="text-gray-700">Google</span>
              </button>

              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                  setSuccess(null);
                  setFormData({
                    email: '',
                    password: '',
                    confirmPassword: ''
                  });
                }}
                className="w-full text-xs text-indigo-600 hover:text-indigo-700 text-center"
              >
                {isLogin ? "Pas de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}