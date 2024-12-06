// "use client";

import Button from "@/components/button";
import Head from "next/head";


export default function Home() {



  // Handlers for button navigation
  return (
    <>
      <Head>
        <title>My Product</title>
        <meta
          name="description"
          content="Super product with free shipping."
          key="desc"
        />
       <script type="application/ld+json">
    {`${{
      "@context": "https://schema.org/",
      "@type": "ImageObject",
      "contentUrl": "https://example.com/photos/1x1/black-labrador-puppy.jpg",
      "license": "https://example.com/license",
      "acquireLicensePage": "https://example.com/how-to-use-my-images",
      "creditText": "Labrador PhotoLab",
      "creator": {
        "@type": "Person",
        "name": "Brixton Brownstone"
       },
      "copyrightNotice": "Clara Kent"
    }}`}
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
