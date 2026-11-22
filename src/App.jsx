
import { useState, useRef } from 'react';
import './App.css';
import WeddingInvitation from './components/WeddingInvitation';
import weddingMusic from './assets/music.mp3';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  const startMusic = async () => {
    if (!audioRef.current || isPlaying) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.log('Music playback was blocked:', error);
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Unable to play music:', error);
    }
  };

  const openEnvelope = () => {
    if (isOpen) return;

    setIsOpen(true);
    startMusic();
  };

  const handleFlapAnimationEnd = (event) => {
    if (event.animationName === 'openFlap') {
      setTimeout(() => {
        setShowInvitation(true);
      }, 2400);
    }
  };

  return (
    <main className="invitation-page">
      <audio ref={audioRef} src={weddingMusic} loop />

      {!showInvitation ? (
        <div className="envelope-container">
          <p className="intro-text">YOU ARE CORDIALLY INVITED</p>

          <div
            className={`envelope ${isOpen ? 'opened' : ''}`}
            onClick={openEnvelope}
            role="button"
            tabIndex={0}
            aria-label="Open wedding invitation"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openEnvelope();
              }
            }}
          >
            <div className="envelope-card">
              <span>YOU ARE INVITED</span>
              <span className="card-heart">♥</span>
            </div>

            <div className="envelope-back"></div>
            <div
              className="envelope-flap"
              onAnimationEnd={handleFlapAnimationEnd}
            ></div>
            <div className="envelope-front"></div>
            <div className="wax-seal">♥</div>
          </div>

          <h1>Wedding Invitation</h1>
          <p className="instruction">Tap the envelope to open</p>
        </div>
      ) : (
        <WeddingInvitation
          isPlaying={isPlaying}
          onToggleMusic={toggleMusic}
        />
      )}
    </main>
  );
}

export default App;
