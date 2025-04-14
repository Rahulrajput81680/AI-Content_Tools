import {
  Type,
  Layout,
  BookText,
  Share2,
  Megaphone,
  Video,
  Briefcase,
} from "lucide-react";

const homeLinks = [
  {
    path: "/blog-title",
    icon: Type,
    title: "Blog Title Generator",
    description: "Create captivating blog titles.",
  },
  {
    path: "/blog-content",
    icon: Layout,
    title: "Blog Content Generator",
    description: "Turn ideas into full blog posts.",
  },
  {
    path: "/blog-summary",
    icon: BookText,
    title: "Blog Summarizer",
    description: "Make short summaries of long blogs.",
  },
  {
    path: "/social-post",
    icon: Share2,
    title: "Social Post Generator",
    description: "Generate social media captions.",
  },
  {
    path: "/advertisement",
    icon: Megaphone,
    title: "Advertisement Generator",
    description: "Make catchy ad lines and promos.",
  },
  {
    path: "/video-description",
    icon: Video,
    title: "Video Description Generator",
    description: "Get SEO-friendly video descriptions.",
  },
  {
    path: "/video-title",
    icon: Type,
    title: "Video Title Generator",
    description: "Make titles that get clicks.",
  },
  {
    path: "/job-description",
    icon: Briefcase,
    title: "Job Description Generator",
    description: "Write job roles professionally.",
  },
];

export default homeLinks;
