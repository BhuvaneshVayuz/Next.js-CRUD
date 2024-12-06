// "use client";

import Button from "@/components/button";
import Head from "next/head";


export default function Home() {

  // Handlers for button navigation
  return (
    <>
    <Head>
        <title>Welcome to My Blog</title>
        <meta name="description" content="Welcome to my personal blog, where I share insights on various topics, including technology, lifestyle, and more." />
        <meta property="og:title" content="Welcome to My Blog" />
        <meta property="og:description" content="Welcome to my personal blog, where I share insights on various topics, including technology, lifestyle, and more." />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
        
        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "WebPage",
            "name": "Welcome to My Blog",
            "description": "Welcome to my personal blog, where I share insights on various topics, including technology, lifestyle, and more.",
            "url": "https://next-js-crud-pearl.vercel.app",
            "publisher": {
              "@type": "Organization",
              "name": "My Blog",
              "logo": "https://example.com/logo.png"
            },
            "mainEntityOfPage": {
              "@type": "Article",
              "headline": "The Future of Web Development",
              "datePublished": "2024-12-06T12:00:00Z",
              "author": {
                "@type": "Person",
                "name": "John Doe"
              },
              "publisher": {
                "@type": "Organization",
                "name": "My Blog"
              },
              "image": "https://example.com/article-image.jpg"
            }
          })}
        </script>
      </Head>
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 sm:p-20 font-sans">
      <h1 className="text-4xl font-bold mb-10 text-blue-600">Stay inside the line</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        Meet me outside the palace, dont need no approval gal u r valid
      </p>
      <div className="flex space-x-6">
        <Button route={'/categories'} name={'categories'}/>
        <Button route={'/blogs'} name={'blogs'}/>
      </div>
    </div>
    </>
  );
}
