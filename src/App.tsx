/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import SceneView from './pages/SceneView';
import ScrollToTop from './components/ScrollToTop';

import { Analytics } from '@vercel/analytics/react';

export default function App() {
  useEffect(() => {
      // [FIX] Hack układu naprawiający błędy mobilnego Safe Area / 100vh
      const nudgeLayout = () => {
          const root = document.getElementById('root');
          if (root) {
              root.style.height = '100.1vh';
              root.style.minHeight = '100.1vh';
              
              window.scrollTo(0, 1);
              
              setTimeout(() => {
                  root.style.height = '100%';
                  root.style.minHeight = '100dvh';
              }, 200);
          }
      };

      nudgeLayout();
      setTimeout(nudgeLayout, 500);

      // Hide splash screen after app mounts
      setTimeout(() => {
        document.body.classList.add('app-loaded');
      }, 300); // Small delay to let the UI settle
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scene/:id" element={<SceneView />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}
