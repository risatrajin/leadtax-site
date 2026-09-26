import { Link } from "react-router";
import { posts } from "../content/blog/posts.json";
import blog from "../content/pages/blog.json";
import PageShell from "../components/layout/PageShell.jsx";

const copy = blog.listing;
const listedPosts = posts.filter((post) => post.excerpt);

/** Blog index. Lists only posts that have an excerpt; sets no page-specific SEO (known issue). */
export default function BlogPage() {
  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand mb-4">{copy.title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{copy.intro}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listedPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img src={post.cardImage ?? post.image} alt={post.title} className="h-48 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-brand-subtle text-brand rounded-full text-sm">{post.category}</span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-brand transition-colors">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <span className="text-brand font-medium hover:underline">{copy.readMoreLabel}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
