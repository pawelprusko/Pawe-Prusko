import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-text-darker/30 pt-10 pb-[max(env(safe-area-inset-bottom),_3rem)] px-6 relative">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-heading font-medium text-text-main/60">Paweł Prusko © {new Date().getFullYear()}</div>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/pawelprusko/" target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-text-muted hover:text-text-main transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
