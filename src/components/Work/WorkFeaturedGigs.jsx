import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';

const featuredGigs = [
  {
    id: 1,
    title: 'Web Design for E-commerce',
    description: 'Create a stunning and functional design for your online store.',
    imageUrl: '/empty.png',
    price: '$500',
  },
  {
    id: 2,
    title: 'SEO Optimization',
    description: 'Improve your website\'s visibility on search engines with expert SEO services.',
    imageUrl: '/empty.png',
    price: '$300',
  },
  {
    id: 3,
    title: 'Social Media Marketing',
    description: 'Boost your brand\'s presence on social media platforms with strategic marketing.',
    imageUrl: '/empty.png',
    price: '$400',
  },
  {
    id: 4,
    title: 'Mobile App Development',
    description: 'Get a custom mobile app developed for your business needs and goals.',
    imageUrl: '/empty.png',
    price: '$1000',
  },
  {
    id: 5,
    title: 'Content Writing',
    description: 'High-quality content writing services for blogs, articles, and more.',
    imageUrl: '/empty.png',
    price: '$200',
  },
  {
    id: 6,
    title: 'Graphic Design',
    description: 'Professional graphic design services including logos, branding, and more.',
    imageUrl: '/empty.png',
    price: '$250',
  },
];

const FeaturedGigs = () => {
  const router = useRouter();
  
  return (
    <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Featured Gigs
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto md:mx-0 mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto md:mx-0">
            Explore our most popular services offered by talented freelancers
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {featuredGigs.map((gig) => (
            <div 
              key={gig.id} 
              className="bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-all duration-300 border border-gray-100 hover:border-yellow-200 cursor-pointer"
              onClick={() => router.push(`/gig/${gig.id}`)}
            >
              <div className="relative h-48 sm:h-52 md:h-56 w-full">
                <Image
                  src={gig.imageUrl}
                  alt={gig.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                  POPULAR
                </div>
              </div>
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-1">{gig.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{gig.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-green-600">{gig.price}</p>
                  <button
                    className="bg-green-500 text-white px-3 py-1.5 text-sm rounded hover:bg-green-600 transition duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* <div className="mt-10 text-center">
          <button 
            onClick={() => router.push('/search')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
          >
            Explore All Gigs
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default FeaturedGigs;
