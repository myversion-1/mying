"use client";

import { BlogPostCard } from "./BlogPostCard";
import type { BlogPost } from "../content/types/blog";

type BlogGridProps = {
  posts: BlogPost[];
  showFeatured?: boolean;
};

export function BlogGrid({ posts, showFeatured = true }: BlogGridProps) {
  const featuredPost = showFeatured ? posts.find((p) => p.featured) : null;
  const regularPosts = showFeatured
    ? posts.filter((p) => !p.featured)
    : posts;

  return (
    <div className="space-y-8">
      {/* Featured Post */}
      {featuredPost && (
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Featured Article
          </h2>
          <BlogPostCard post={featuredPost} featured={true} />
        </div>
      )}

      {/* Regular Posts Grid */}
      {regularPosts.length > 0 && (
        <div>
          {featuredPost && (
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Latest Articles
            </h2>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
















