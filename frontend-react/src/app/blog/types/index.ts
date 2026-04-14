export type PostsResponse = Post[];

export interface Post {
  id: number;
  category: Category;
  subcategory: Category | null;
  comments: Comment[];
  related_posts: Post[];
  postname: string;
  slug: string;
  image_url: string;
  image: string;
  image_alt: string | null;
  image_title: string | null;
  image_caption: string | null;
  content: string;
  time_published: string;
  last_modified: string;
  likes: number;
  views: number;
  user: number;
  meta_title: string | null;
  meta_description: string;
  canonical_url: string | null;
  noindex_nofollow: boolean;
  read_time: number
  first_name: string
  last_name: string
  photo?: string
  
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  meta_title: string | null;
  meta_description: string;
  last_modified: string;
}
