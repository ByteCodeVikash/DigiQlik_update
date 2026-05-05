import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({ url, title }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      if (container) {
        container.removeEventListener('contextmenu', handleContextMenu);
      }
    };
  }, []);

  return (
    <div className="video-player-container" ref={containerRef}>
      <div className="video-protection-overlay" />
      <div className="video-aspect-ratio">
        <iframe
          src={url}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="protected-iframe"
        ></iframe>
      </div>
      <style>{`
        .video-player-container {
          position: relative;
          width: 100%;
          background: #000;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .video-protection-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          /* This overlay helps prevent right-click specifically on the video area if pointer-events were enabled, 
             but we rely on contextmenu event listener primarily */
        }
        .video-aspect-ratio {
          position: relative;
          padding-top: 56.25%; /* 16:9 Aspect Ratio */
        }
        .protected-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 5;
        }
        /* Custom styles to hide default player context menus in some browsers */
        .protected-iframe::-webkit-media-controls-enclosure {
          display:none !important;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;
