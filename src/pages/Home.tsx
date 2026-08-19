import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SceneCard from '../components/SceneCard';
import { getScenes } from '../lib/api';
import { useState } from 'react';

const ENGINE_FEATURES = [
  { number: '01', title: 'Variable Injection Architecture', desc: 'Preserving brand DNA and a consistent Quiet Luxury aesthetic while seamlessly introducing new product contexts, backgrounds, and styling props.' },
  { number: '02', title: 'Anatomical & Physical Realism', desc: 'Rigorous control over fluid micro-movements, steam dynamics, and natural hand anatomy, completely eliminating traditional AI artifacts.' },
  { number: '03', title: 'Static-to-Motion Pairing', desc: 'A seamless 1:1 workflow where every static frame has an exact video counterpart featuring identical composition, lighting, and atmosphere.' }
];

const FRAMEWORKS = [
  {
    number: '01',
    title: 'Pitch & Concept Assets',
    target: 'Advertising agencies and production houses during competitive pitch stages.',
    output: '5–10 static concept frames + 1–3 micro-loop videos (48–72h turnaround).',
    application: 'Storyboards, visual decks, and pitch presentations designed to win budgets without costly test shoots.'
  },
  {
    number: '02',
    title: 'Core Retainer',
    target: 'Premium brands seeking a consistent, elevated presence across digital touchpoints.',
    output: '3–5 editorial scenes per month (9–15 high-res stills + 3–5 seamless 9:16 video loops).',
    application: 'A continuous flow of high-end visual assets for Instagram, TikTok, and web storefronts.'
  },
  {
    number: '03',
    title: 'Campaign Scale',
    target: 'Scaling brands executing major product launches and multi-channel advertising campaigns.',
    output: '6–10 hybrid scenes per month (18–30 static stills + 6–10 videos + B-roll variations for Paid Ads).',
    application: 'End-to-end visual coverage for the full sales funnel (E-commerce, Meta/TikTok Ads, Lookbooks).'
  },
  {
    number: '04',
    title: 'Bespoke Production',
    target: 'Custom enterprise projects, high-volume production (10+ scenes), and dedicated art direction.',
    output: 'Tailored scene volumes, custom display formats (e.g., digital billboards), and full exclusive commercial licensing.',
    application: 'Flagship global launches, corporate rebrandings, and bespoke brand activations.'
  }
];

export default function Home() {
  const scenes = getScenes();
  const [expandedFramework, setExpandedFramework] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30 selection:text-text-main">
      <Header />

      <main className="max-w-3xl mx-auto px-6 pt-16">
        {/* Section 0: Author */}
        <section className="mb-24 mt-6">
          <h2 className="text-xs font-mono tracking-widest text-text-muted mb-6 uppercase">01 / Statement</h2>
          <div className="text-[22px] md:text-[36px] text-text-main font-mono leading-[1.4] md:leading-[1.4]">
           Taste beyond limits. AI Culinary Art Director crafting high-fashion, editorial food visuals & motion. Eliminating physical studio constraints and overhead to deliver campaign-ready assets in days, not weeks.
          </div>
        </section>

        {/* Section 2: Selected Scenes */}
        <section className="mb-24">
          <h2 className="text-xs font-mono tracking-widest text-text-muted mb-6 uppercase">02 / Selected Scenes</h2>
          <div className="flex flex-col gap-20 md:gap-28">
            {scenes.map((scene) => (
              <SceneCard
                key={scene.id}
                videoSrc={scene.videoUrl}
                title={scene.title}
                desc={scene.desc}
              />
            ))}
          </div>
        </section>

        {/* Section 3: The Engine */}
        <section className="mb-24">
          <h2 className="text-xs font-mono tracking-widest text-text-muted mb-6 uppercase">03 / The Engine</h2>
          <div className="flex flex-col gap-8 md:gap-12">
            {ENGINE_FEATURES.map((feat) => (
              <div key={feat.number} className="flex flex-col md:flex-row items-baseline md:items-start gap-2 md:gap-6">
                <span className="font-heading text-4xl font-light text-text-muted/60 w-16 flex-shrink-0 italic mt-[-4px]">
                  {feat.number}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-2xl text-secondary mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm font-sans text-text-muted leading-relaxed max-w-2xl">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Frameworks */}
        <section className="mb-24">
          <h2 className="text-xs font-mono tracking-widest text-text-muted mb-6 uppercase">04 / Frameworks</h2>
          <p className="text-lg text-text-main font-sans mb-8 leading-relaxed max-w-2xl">
            Bespoke content pipelines tailored to launch schedules and campaign calendars.
          </p>
          <div className="flex flex-col divide-y divide-text-darker/40 border-y border-text-darker/40 mb-8">
            {FRAMEWORKS.map((fw) => {
              const isExpanded = expandedFramework === fw.number;
              return (
                <div key={fw.number} className="flex flex-col">
                  <button 
                    onClick={() => setExpandedFramework(isExpanded ? null : fw.number)}
                    className="flex items-center justify-between w-full py-4 text-left group gap-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-heading text-2xl text-secondary group-hover:text-[#886944] transition-colors">
                        {fw.title}
                      </h3>
                    </div>
                    <span className="text-text-main/30 group-hover:text-text-main transition-colors text-2xl font-light font-sans">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="pb-8 pl-4 pr-4">
                      <div className="flex flex-col gap-4 text-sm font-sans text-text-muted leading-relaxed">
                        <p><strong className="text-text-main font-semibold">Target:</strong> {fw.target}</p>
                        <p><strong className="text-text-main font-semibold">Output:</strong> {fw.output}</p>
                        <p><strong className="text-text-main font-semibold">Application:</strong> {fw.application}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-sm text-text-muted font-sans leading-relaxed max-w-2xl">
            To maintain direct founder access and uncompromised visual quality, active retainer capacity is strictly managed. All frameworks can be aligned with your internal campaign calendar.
          </p>
        </section>

        {/* Section 5: Direct Access */}
        <section id="contact" className="mb-24">
          <h2 className="text-xs font-mono tracking-widest text-text-muted mb-6 uppercase">05 / Direct Access</h2>
          <div className="flex flex-col">
            <p className="text-lg text-text-main font-sans leading-relaxed max-w-lg mb-4">
              Available for global commissions, agency pitches, and monthly brand retainers.
            </p>
            <a href="mailto:hello@pawelprusko.com" className="font-heading text-3xl md:text-5xl lg:text-6xl text-secondary hover:text-[#886944] transition-colors inline-block w-max">
              hello@pawelprusko.com
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
