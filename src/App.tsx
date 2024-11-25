import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { SearchModule } from './components/SearchModule';
import { BackgroundTrailer } from './components/BackgroundTrailer';
import { MediaDetails } from './components/MediaDetails';
import { PopularTVSection } from './components/PopularTVSection';
import { PopularMoviesSection } from './components/PopularMoviesSection';
import { AISearchPage } from './components/ai-search/AISearchPage';
import { AuthModal } from './components/auth/AuthModal';
import { AccountPage } from './components/account/AccountPage';
import { TermsPage } from './components/legal/TermsPage';
import { PrivacyPage } from './components/legal/PrivacyPage';
import { Footer } from './components/Footer';
import { useAuth } from './contexts/AuthContext';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Show auth modal after 2 seconds if user is not logged in
    if (!currentUser && !localStorage.getItem('authModalDismissed')) {
      const timer = setTimeout(() => {
        setShowAuthModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
    localStorage.setItem('authModalDismissed', 'true');
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundTrailer />
      <div className="relative z-10">
        <Header onAuthClick={() => setShowAuthModal(true)} />
        
        <div className="container mx-auto px-4 py-12">
          <Routes>
            <Route path="/" element={
              <>
                <SearchModule />
                <PopularMoviesSection />
                <PopularTVSection />
              </>
            } />
            <Route path="/:mediaType/:id" element={<MediaDetails />} />
            <Route path="/compte" element={<AccountPage />} />
            <Route path="/ai-search" element={<AISearchPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </div>

        <Footer />
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleCloseAuthModal}
      />
    </div>
  );
}

export default App;