import { Link } from "react-router";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

const initials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("");

export default function PostHeader({ post, backLabel }) {
  return (
    <div className="bg-gradient-to-br from-brand to-brand-strong text-white py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-brand-subtle hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </Link>
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <span className="px-4 py-1.5 bg-brand-subtle text-brand rounded-full text-sm font-bold">{post.category}</span>
          <div className="flex items-center gap-2 text-brand-subtle">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{post.date}</span>
          </div>
          <div className="flex items-center gap-2 text-brand-subtle">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{post.readTime}</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-brand-subtle rounded-full flex items-center justify-center">
            <span className="text-brand font-bold text-lg">{initials(post.author)}</span>
          </div>
          <div>
            <p className="font-bold">{post.author}</p>
            <p className="text-sm text-brand-subtle">{post.authorRole}</p>
          </div>
        </div>
        {post.image && (
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img src={post.image} alt={post.title} className="w-full h-64 md:h-96 object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}
