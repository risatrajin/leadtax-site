import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { posts } from "../content/blog/posts.json";
import blog from "../content/pages/blog.json";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import PostHeader from "../sections/blog/PostHeader.jsx";
import PostBody from "../sections/blog/PostBody.jsx";
import PostCta from "../sections/blog/PostCta.jsx";
import RelatedArticles from "../sections/blog/RelatedArticles.jsx";

const copy = blog.post;

/**
 * Article page. Sets no page-specific SEO (known issue); unknown slugs show a
 * "not found" message with a normal 200 response.
 */
export default function BlogPostPage() {
  const { slug } = useParams();
  const post = slug ? posts.find((candidate) => candidate.slug === slug) : null;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{copy.notFound.title}</h1>
            <p className="text-gray-600 mb-8">{copy.notFound.text}</p>
            <Link to="/blog" className="inline-flex items-center gap-2 text-brand hover:underline font-bold">
              <ArrowLeft className="w-4 h-4" />
              {copy.backLabel}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PostHeader post={post} backLabel={copy.backLabel} />
        <article className="py-12 md:py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <PostBody content={post.content} />
            <PostCta cta={copy.cta} />
          </div>
        </article>
        <RelatedArticles posts={posts} currentSlug={post.slug} title={copy.relatedTitle} />
      </main>
      <Footer />
    </div>
  );
}
