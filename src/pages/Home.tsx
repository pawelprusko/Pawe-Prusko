import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SceneCard from '../components/SceneCard';
import { getLatestArticles, getScenes } from '../lib/api';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { id: 'data-alchemist-journal', number: '01', title: 'Data Alchemist Journal', desc: 'Deep, philosophical essays exploring organizational physics, transforming how we navigate information through unexpected metaphors and Data Experience Design.' },
  { id: 'data-architecture-scrolls', number: '02', title: 'Data Architecture Scrolls', desc: 'Pragmatic thought experiments diagnosing the hidden cognitive debt and system friction within modern AI-augmented data architectures.' },
  { id: 'data-psychology-notes', number: '03', title: 'Data Psychology Notes', desc: 'Concise observations exploring data products as interconnected ecosystems, blending cognitive psychology with advanced UX philosophy.' },
  { id: 'data-ecology-memos', number: '04', title: 'Data Ecology Memos', desc: 'Architectural reflections on how modern data systems impact cognitive bandwidth, designed to protect human focus.' },
  { id: 'data-brand-diary', number: '05', title: 'Data Brand Diary', desc: 'Systemic deconstructions of modern personal branding, analyzed through a rigorous Data Experience Design and cognitive psychology lens.' }
];

export default function Home() {
  const articles = getLatestArticles();
  const scenes = getScenes();
  const heroArticle = articles[0];
  const recentArticles = articles.slice(1, 6); // up to 5 articles
  
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30 selection:text-text-main">
      <Header />

      <main className="max-w-3xl mx-auto px-6 pt-16 pb-20">
        {/* Section 0: Author */}
        <section className="mb-20 mt-6">
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

        {/* Section 3: The Hero Article */}
        {heroArticle && (
          <Link to={`/article/${heroArticle.categoryId}/${heroArticle.slug}`} className="mb-20 group cursor-pointer block">
            <div className="relative aspect-square w-full overflow-hidden bg-text-darker/20 mb-8">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent z-10" />
              <img
                src={heroArticle.heroImageUrl}
                alt={heroArticle.title}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
              />
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-text-main mb-6 leading-tight group-hover:text-secondary transition-colors duration-500">
              {heroArticle.title}
            </h1>
            <p className="text-lg text-text-muted leading-relaxed font-serif mb-6 line-clamp-3">
              {heroArticle.content.replace(/<[^>]+>/g, '')}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold tracking-wide text-text-main border-b border-text-main/30 pb-0.5 group-hover:border-secondary group-hover:text-secondary transition-all">Read More</span>
            </div>
          </Link>
        )}

        {/* Section 4: Recent Archive */}
        {recentArticles.length > 0 && (
          <section className="mb-20">
            <h2 className="text-xs font-mono tracking-widest text-text-muted mb-6 uppercase">
              Last Articles
            </h2>
            <div className="flex flex-col gap-6">
              {recentArticles.map((article) => (
                <Link key={article.id} to={`/article/${article.categoryId}/${article.slug}`} className="group cursor-pointer flex flex-col md:flex-row gap-2 md:gap-8 items-baseline py-4 border-b border-text-darker/40 last:border-0 transition-colors">
                  <div className="w-32 flex-shrink-0 text-xs font-mono text-text-muted">
                    {article.date ? new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'May 24, 2026'}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl text-text-main group-hover:text-secondary transition-colors mb-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs font-mono uppercase text-secondary group-hover:text-secondary/80 transition-colors">
                      {article.category}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Categories as Accordions */}
        <section className="mb-20">
          <h2 className="text-xs font-mono tracking-widest text-text-muted mb-6 uppercase">
            Article Genres
          </h2>
          <div className="flex flex-col divide-y divide-text-darker/40 border-t border-text-darker/40">
            {CATEGORIES.map((cat) => {
              const isExpanded = expandedCategory === cat.id;
              return (
                <div key={cat.id} className="flex flex-col">
                  <button 
                    onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                    className="flex items-baseline md:items-center py-6 text-left group gap-4 md:gap-8"
                  >
                    <span className="font-heading text-4xl font-light text-text-muted/60 group-hover:text-text-muted/30 transition-colors w-16 flex-shrink-0 italic">
                      {cat.number}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-heading text-2xl text-secondary group-hover:text-secondary/70 transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-sm font-sans text-text-muted mt-1">
                        {cat.desc}
                      </p>
                    </div>
                    <span className="text-text-main/30 group-hover:text-text-main transition-colors text-2xl font-light font-sans">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="pb-8 pl-4 md:pl-24 pr-4">
                      <div className="flex flex-col gap-4 text-sm font-sans">
                        {articles.filter(a => a.categoryId === cat.id).slice(0, 3).map((article, i) => (
                          <Link key={i} to={`/article/${article.categoryId}/${article.slug}`} className="flex flex-col gap-1 py-3 group/link">
                            <span className="font-heading text-lg text-text-main/90 group-hover/link:text-secondary transition-colors">{article.title}</span>
                            <span className="text-text-muted line-clamp-1">{article.content.replace(/<[^>]+>/g, '')}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 6: Services (Anti-Sales) */}
        <section id="about" className="mb-0">
          <h2 className="text-xs font-mono tracking-widest text-text-muted mb-6 uppercase">
            Practice
          </h2>
          <div className="text-text-muted font-sans leading-relaxed text-[15px]">
            <p className="mb-4">
              I help enterprises architect high-resonance Data Brands, protect corporate BI budgets and eliminate cognitive noise by validating data logic before engineering begins. My practice bridges the final millimeter where machine logic meets human cognition through Data Experience Architecture.
            </p>
            <p className="mb-4">
              Available for selective, high-stakes collaborations: Data Brand positioning, architectural audits, infrastructure consultations, and direct logic validation via <strong className="text-text-main font-semibold">Vibe Prototyping</strong>.
            </p>
            <p>
              I operate without sales funnels or intermediaries. If your system is inducing strategic friction, reach my personal inbox at <a href="mailto:pruskopawel@gmail.com" className="text-text-main font-semibold underline hover:text-secondary transition-colors">pruskopawel@gmail.com</a> or connect directly on <a href="https://www.linkedin.com/in/pawelprusko/" target="_blank" rel="noopener noreferrer" className="text-text-main font-semibold underline hover:text-secondary transition-colors">LinkedIn</a>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
