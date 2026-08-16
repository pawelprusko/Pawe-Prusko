import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getLatestArticles } from '../lib/api';

export default function ArticleView() {
  const { categoryId, slug } = useParams<{ categoryId: string; slug: string }>();
  
  const allArticles = getLatestArticles();
  
  // Find current article
  const currentArticle = allArticles.find(a => a.categoryId === categoryId && a.slug === slug);
  
  if (!currentArticle) {
    return (
      <div className="min-h-screen bg-background text-text-main flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p>Article not found.</p>
        </main>
      </div>
    );
  }

  // Get other articles from the same category
  const otherArticles = allArticles.filter(a => a.categoryId === categoryId && a.id !== currentArticle.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30 selection:text-text-main">
      <Header categoryTitle={currentArticle.category} />

      <main className="max-w-3xl mx-auto px-6 pt-12 pb-20">
        
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-4 text-xs font-mono tracking-widest text-text-muted uppercase">
          <Link to="/" className="flex items-center gap-2 hover:text-text-main transition-colors group">
            <span className="text-lg leading-none group-hover:-translate-x-1 transition-transform">←</span>
            Back
          </Link>
          <span className="opacity-40">/</span>
          <span>{currentArticle.category}</span>
        </div>

        {/* Hero Banner */}
        <section className="mb-12 group block">
          <div className="relative aspect-square w-full overflow-hidden bg-text-darker/20 mb-8">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent z-10" />
            <div className="absolute inset-0 mix-blend-overlay opacity-30 z-10" style={{ backgroundImage: 'radial-gradient(circle, #F3EFE9 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            <img
              src={currentArticle.heroImageUrl}
              alt={currentArticle.title}
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
            />
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-text-main mb-8 leading-tight">
            {currentArticle.title}
          </h1>
        </section>

        {/* Content */}
        <section className="prose prose-invert prose-p:text-text-main prose-p:font-sans prose-p:leading-relaxed prose-p:text-[17px] mb-24 max-w-none">
          <div dangerouslySetInnerHTML={{ __html: currentArticle.content }} />
        </section>

        {/* More from this series */}
        <section className="mb-12 pt-16 border-t border-text-darker/40">
          <h2 className="text-xs font-mono tracking-widest text-text-muted mb-8 uppercase">
            More from this series
          </h2>
          {otherArticles.length > 0 ? (
            <div className="flex flex-col gap-0 text-sm font-sans">
              {otherArticles.map((article, i) => (
                <Link key={i} to={`/article/${article.categoryId}/${article.slug}`} className="group cursor-pointer flex flex-col md:flex-row gap-2 md:gap-8 items-baseline py-6 border-b border-text-darker/40 last:border-0 transition-colors">
                  <div className="w-32 flex-shrink-0 text-xs font-mono text-text-muted">
                    {article.date ? new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'May 24, 2026'}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl text-text-main group-hover:text-secondary transition-colors mb-2">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 border-t border-dashed border-text-darker/30 text-center flex flex-col items-center justify-center">
              <p className="text-text-main/80 font-sans text-[15px] max-w-sm">
                More articles coming to this series soon. Check back later.
              </p>
            </div>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}
