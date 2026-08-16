import React, { useState, useEffect, useRef } from 'react';

export default function Footer() {
  const [expanded, setExpanded] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const optIn = localStorage.getItem('notifications_opt_in');
      if (optIn === 'true') {
        setNotificationsEnabled(true);
      }
    }
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleToggleNotification = async () => {
    const newPref = !notificationsEnabled;
    
    // Always toggle visual state to avoid blocking the prototype experience
    setNotificationsEnabled(newPref);
    localStorage.setItem('notifications_opt_in', newPref ? 'true' : 'false');
    showToast(newPref ? 'Notifications Activated' : 'Notifications Deactivated');

    // Attempt actual browser notification subscription if turning on
    if (newPref && 'Notification' in window) {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        try {
          const permission = await Notification.requestPermission();
          if (permission === 'granted' && 'serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then((registration) => {
              registration.showNotification('Data Alchemist', {
                body: 'You are now subscribed to weekly alerts.',
                icon: '/icon-192x192.png',
                badge: '/icon-192x192.png'
              });
            });
          }
        } catch (e) {
          console.error("Could not request notification permission", e);
        }
      } else if (Notification.permission === 'granted' && 'serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification('Data Alchemist', {
              body: 'You are now subscribed to weekly alerts.',
              icon: '/icon-192x192.png',
              badge: '/icon-192x192.png'
            });
          });
      }
    }
  };

  return (
    <footer className="border-t border-text-darker/30 pt-12 pb-[max(env(safe-area-inset-bottom),_3rem)] px-6 relative">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        {/* App & Notifications */}
        <div className="border border-text-darker/30 p-6 rounded-sm bg-background transition-colors duration-300 relative overflow-hidden">
          <button 
             onClick={() => setExpanded(!expanded)}
             className="w-full text-left flex flex-col gap-2 focus:outline-none"
          >
             <div className="flex justify-between items-center w-full">
                <span className="font-heading tracking-widest text-xs uppercase text-secondary">Focus & News</span>
                <span className="text-text-muted font-mono">{expanded ? '−' : '+'}</span>
             </div>
             {!expanded && (
               <p className="text-[15px] font-sans text-text-main leading-relaxed mt-2">
                 Read Data Alchemist in full-screen mode and get a single alert when the weekly article drops. No browser clutter, zero spam.
               </p>
             )}
          </button>
          
          {expanded && (
            <div className="mt-8 flex flex-col gap-8 animate-fade-in border-t border-text-darker/20 pt-8">
              {/* Section A: App */}
              <div className="flex flex-col gap-3">
                <h3 className="font-heading font-medium text-text-main text-lg">Launch from your Home Screen</h3>
                <p className="text-[15px] font-sans text-text-muted leading-relaxed">
                  Skip the browser entirely. Saving the app opens Data Alchemist instantly in a distraction-free, full-screen mode.
                </p>
                <ul className="text-sm font-mono text-text-muted mt-2 space-y-2 list-none">
                  <li className="flex gap-2"><span className="text-secondary">-</span> iOS: Tap the Share icon in Safari, then select Add to Home Screen.</li>
                  <li className="flex gap-2"><span className="text-secondary">-</span> Android: Click Add to Workspace</li>
                </ul>
              </div>

              {/* Section B: Notifications */}
              <div className="flex flex-col gap-3">
                <h3 className="font-heading font-medium text-text-main text-lg">Weekly Articles</h3>
                <p className="text-[15px] font-sans text-text-muted leading-relaxed">
                  Would you like to be notified when a new article is published? I publish exactly once a week. You will receive one direct notification, nothing more. Cancel anytime right here.
                </p>
                
                <button 
                  onClick={handleToggleNotification}
                  className="flex items-start gap-4 mt-4 w-full cursor-pointer group focus:outline-none text-left"
                >
                  <div className={`relative flex-shrink-0 flex items-center justify-center w-5 h-5 border rounded-sm transition-colors mt-[2px] ${notificationsEnabled ? 'border-text-main bg-text-main/10' : 'border-text-main/50 bg-background group-hover:border-text-main'}`}>
                    {notificationsEnabled && (
                      <span className="w-2.5 h-2.5 bg-text-main rounded-sm" />
                    )}
                  </div>
                  <span className={`font-mono text-sm leading-relaxed whitespace-normal break-words transition-colors ${notificationsEnabled ? 'text-text-main' : 'text-text-main/70 group-hover:text-text-main'}`}>
                    Notify me of new weekly articles
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Existing Footer Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-text-darker/30 pt-6">
          <div className="font-heading font-medium text-text-main/60">Data Alchemist © {new Date().getFullYear()}</div>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/pawelprusko/" target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-text-muted hover:text-text-main transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 pb-[max(env(safe-area-inset-bottom),_1rem)] left-1/2 -translate-x-1/2 z-50">
          <div className="bg-[#1a1b1e] border border-text-darker shadow-xl px-5 py-3 rounded-sm flex items-center gap-3 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="font-mono text-xs text-text-main tracking-wide uppercase whitespace-nowrap">{toastMessage}</span>
          </div>
        </div>
      )}
    </footer>
  );
}
