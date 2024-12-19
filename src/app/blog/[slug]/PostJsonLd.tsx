import { JsonLdDocument } from "jsonld";
import { getPost } from "../utils";
import { formatDate } from "@/components/utils";

export default async function PostJsonLd({ slug }: { slug: string }) {
  const post = await getPost(slug);

  const jsonLd: JsonLdDocument = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://dushni.la/blog/${post.slug}`,
    },
    headline: "",
    image: "",
    author: {
      "@type": "Person",
      givenName: "Ігор",
      familyName: "Кузьменко",
    },
    publisher: {
      "@type": "Organization",
      name: "https://dushni.la",
      logo: {
        "@type": "ImageObject",
        url: "https://dushni.la/logo.png",
      },
    },
    datePublished: formatDate(post.last_edited_time),
    dateModified: formatDate(post.last_edited_time),
  };

  return (
    <section>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
