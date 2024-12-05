// "use client";

import Button from "@/components/button";


export default function Home() {

  // Handlers for button navigation
  return (
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
  );
}
