import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Clock, Search } from "lucide-react";
import { posts } from "../content/blog/posts.json";
import blog from "../content/pages/blog.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero, { actionProps } from "../components/ui/PageHero.jsx";
import Button from "../components/ui/Button.jsx";
import { cx } from "../lib/cx.js";

const copy = blog.listing;
const listedPosts = posts.filter((post) => post.excerpt);
const ALL = copy.allLabel;
const categories = [ALL, ...new Set(listedPosts.map((post) => post.category))];

/** Category, date and read time in one quiet line. */
function Meta({ post, className }) {
  return (
    <p className={cx("flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500", className)}>
      <span>{post.date}</span>
      {post.readTime && (
        <>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden="true" className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </>
      )}
    </p>
  );
}

function CategoryPill({ children }) {
  return <span className="inline-flex rounded-full bg-brand-subtle px-3 py-1 text-xs font-semibold text-brand">{children}</span>;
}

/** The newest post as a wide card: photo on the left, text on the right. */
function Featured({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl transition duration-300 hover:shadow-2xl lg:h-[30rem] lg:grid-cols-[1.15fr_1fr]"
    >
      <div className="overflow-hidden">
        <img
          src={post.image ?? post.cardImage}
          alt=""
          className="h-64 w-full object-cover transition duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100 sm:h-80 lg:h-full"
        />
      </div>
      <div className="flex flex-col justify-center p-8 md:p-12">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand">{copy.featuredLabel}</span>
          <CategoryPill>{post.category}</CategoryPill>
        </div>
        <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-gray-900 group-hover:text-brand md:text-4xl">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-lg text-gray-600">{post.excerpt}</p>
        {post.author && (
          <p className="mt-6 font-semibold text-gray-900">
            {post.author}
            {post.authorRole && <span className="font-normal text-gray-500"> · {post.authorRole}</span>}
          </p>
        )}
        <Meta post={post} className="mt-1" />
        <span className="mt-8 inline-flex items-center gap-2 self-start border-b-2 border-gray-900 pb-1 font-semibold text-gray-900 transition-colors group-hover:border-brand group-hover:text-brand">
          {copy.readLabel}
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function PostCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group flex h-full flex-col">
      <div className="overflow-hidden rounded-2xl">
        <img
          src={post.cardImage ?? post.image}
          alt=""
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <div>
          <CategoryPill>{post.category}</CategoryPill>
        </div>
        <h3 className="mt-3 text-xl font-semibold leading-snug text-gray-900 transition-colors group-hover:text-brand">{post.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-gray-600">{post.excerpt}</p>
        <Meta post={post} className="mt-4" />
      </div>
    </Link>
  );
}

/**
 * Blog index in the style of Calendly's blog: a hero with search, the newest post as a wide
 * featured card, category filter pills, a three-column grid of posts and a closing panel.
 * Lists only posts that have an excerpt. The title and intro are unchanged.
 */
export default function BlogPage() {
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState("");
  const [featured, ...rest] = listedPosts;

  const filtering = category !== ALL || query.trim() !== "";
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return listedPosts.filter(
      (post) =>
        (category === ALL || post.category === category) &&
        (!needle || `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(needle)),
    );
  }, [category, query]);
  const grid = filtering ? results : rest;
  const { cta } = blog.post;

  return (
    <PageShell>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} text={copy.intro} decor>
        <label className="relative mx-auto mt-8 block max-w-xl">
          <span className="sr-only">{copy.searchLabel}</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchLabel}
            className="min-h-14 w-full rounded-full border-0 bg-white py-3 pl-14 pr-6 text-gray-900 shadow-xl placeholder:text-gray-400"
          />
        </label>
      </PageHero>

      <section className="bg-white px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          {!filtering && <Featured post={featured} />}

          <div className={cx("flex flex-wrap items-center gap-2", !filtering && "mt-16")}>
            {categories.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={category === name}
                onClick={() => setCategory(name)}
                className={cx(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  category === name ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                )}
              >
                {name}
              </button>
            ))}
          </div>

          {grid.length > 0 ? (
            <ul className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {grid.map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-16 text-center text-lg text-gray-500">{copy.emptyLabel}</p>
          )}
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
        <div className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-3xl bg-hero-blue p-10 text-center text-white shadow-2xl md:p-16">
          <div aria-hidden="true" className="absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{cta.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">{cta.text}</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            {cta.actions.map((action) => (
              <Button key={action.label} {...actionProps(action)} variant={action.variant}>
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
