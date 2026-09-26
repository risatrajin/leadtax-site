import { Link } from "react-router";
import { Clock } from "lucide-react";

/** First three other posts in content order. Cards show a gradient instead of a photo. */
export default function RelatedArticles({ posts, currentSlug, title }) {
  const related = posts.filter((post) => post.slug !== currentSlug).slice(0, 3);
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-brand mb-8">{title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {related.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-brand to-brand-subtle" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-brand-subtle text-brand rounded-full text-sm">{post.category}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-brand transition-colors">{post.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
