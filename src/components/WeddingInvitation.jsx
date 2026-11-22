import { useEffect, useState } from 'react';
import { CalendarDays, Clock, MapPin, Music, Pause } from 'lucide-react';
import './WeddingInvitation.css';
import flowerTopRight from '../assets/flower-top-right.png';
import flowerBottomLeft from '../assets/flower-bottom-left.png';

function WeddingInvitation({ isPlaying, onToggleMusic }) {
    const weddingDate = new Date('2026-12-26T11:00:00+08:00').getTime();

    const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    });
    
    useEffect(() => {
    const updateCountdown = () => {
        const difference = weddingDate - Date.now();

        if (difference <= 0) {
        setTimeLeft(null);
        return;
        }

        setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
    }, []);

  return (
    <section className="wedding-section">
      <div className="invitation-card">

        <button
        className="music-button"
        onClick={onToggleMusic}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
        {isPlaying ? <Pause size={20} /> : <Music size={20} />}
        </button>

        <img
        src={flowerTopRight}
        alt=""
        aria-hidden="true"
        className="flower-decoration flower-top-right"
        />

        <img
        src={flowerBottomLeft}
        alt=""
        aria-hidden="true"
        className="flower-decoration flower-bottom-left"
        />

        <div className="petal-layer" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
            <span
            key={index}
            className={`petal petal-${index + 1}`}
            />
        ))}
        </div>

        <header className="invitation-header">
          <p className="bismillah">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          <h1>UNDANGAN MAJLIS KESYUKURAN</h1>
          <div className="ornament"><span>◆</span></div>
        </header>

        <div className="invitation-intro">
          <p className="greeting">
            Assalamualaikum Warahmatullahi Wabarakatuh &amp; Salam Sejahtera.
          </p>

          <p>
            Dengan penuh kesyukuran ke hadrat Allah SWT, kami sekeluarga
            berbesar hati menjemput Dato’/Datin/Tuan/Puan serta seisi keluarga
            ke majlis yang akan diadakan bagi meraikan dua acara istimewa
            seperti berikut:
          </p>
        </div>

        <section className="celebration">
          <h2>MAJLIS SAMBUT MENANTU</h2>
          <p className="subtitle">Meraikan pasangan pengantin:</p>

          <p className="script-name">
            Syed Hussain Shah bin Shah Syed
          </p>
          <p className="ampersand">&amp;</p>
          <p className="script-name">
            Nurhikmah binti Roslan
          </p>
        </section>

        <section className="celebration aqiqah">
          <h2>MAJLIS AQIQAH</h2>
          <p className="subtitle">Bersempena kelahiran:</p>

          <p className="script-name">Muhammad Umar Mateen bin Mohd Amirul Shiddiq</p>
        </section>

        <section className="event-details">
          <div className="detail-row">
            <CalendarDays />
            <strong>TARIKH</strong>
            <span>26 Disember 2026 (Sabtu)</span>
          </div>

          <div className="detail-row">
            <Clock />
            <strong>MASA</strong>
            <span>11.00 AM - 4.00 PM</span>
          </div>

          <div className="detail-row">
            <MapPin />
            <strong>TEMPAT</strong>
            <span>
                No.6, Jalan Putera Indah 12/19,
                Taman Putera Indah, Tongkang Pecah,
                Batu Pahat, 83010 Batu Pahat.
            </span>
            </div>

            <div className="map-button-wrapper">
            <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                'No.6, Jalan Putera Indah 12/19, Taman Putera Indah, Tongkang Pecah, Batu Pahat, 83010 Batu Pahat, Johor, Malaysia'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-button"
            >
                <MapPin size={19} />
                Lihat Lokasi
            </a>
            </div>
        </section>

        <section className="invitation-closing">
          <p>
            Kehadiran Dato’/Datin/Tuan/Puan serta seisi keluarga amatlah
            kami alu-alukan bagi bersama-sama memeriahkan kedua-dua
            majlis ini.
          </p>

          <p>
            Semoga majlis yang diadakan mendapat keberkatan dan rahmat
            daripada Allah SWT.
          </p>

          <div className="ornament"><span>◆</span></div>
          <div className="wedding-countdown">
            <p className="countdown-title">Counting Down to Our Special Day</p>

            {timeLeft ? (
                <div className="countdown-items">
                {Object.entries(timeLeft).map(([label, value]) => (
                    <div className="countdown-item" key={label}>
                    <span>{String(value).padStart(2, '0')}</span>
                    <small>{label}</small>
                    </div>
                ))}
                </div>
            ) : (
                <p className="countdown-finished">Today is the special day! ❤️</p>
            )}
            </div>

             <div className="ornament"><span>◆</span></div>
          <p className="thank-you">
            Kehadiran anda amat bermakna buat kami! ♡
          </p>

          <p className="thank-you">
            Sekian, terima kasih.<br />
            Daripada,
          </p>

          <p className="family-name">Pn. Rabuya & Keluarga</p>
        </section>

      </div>
    </section>
  );
}

export default WeddingInvitation;
