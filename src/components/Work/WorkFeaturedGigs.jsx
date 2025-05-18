import Image from 'next/image';
import React from 'react';

const featuredGigs = [
  {
    id: 1,
    title: 'Web Design for E-commerce',
    description: 'Create a stunning and functional design for your online store.',
    imageUrl: '/empty.png', // Adjusted image URL
    price: '$500',
  },
  {
    id: 2,
    title: 'SEO Optimization',
    description: 'Improve your website’s visibility on search engines with expert SEO services.',
    imageUrl: '/empty.png', // Adjusted image URL
    price: '$300',
  },
  {
    id: 3,
    title: 'Social Media Marketing',
    description: 'Boost your brand’s presence on social media platforms with strategic marketing.',
    imageUrl: '/empty.png', // Adjusted image URL
    price: '$400',
  },
  {
    id: 4,
    title: 'Mobile App Development',
    description: 'Get a custom mobile app developed for your business needs and goals.',
    imageUrl: '/empty.png', // Adjusted image URL
    price: '$1000',
  },
  {
    id: 5,
    title: 'Content Writing',
    description: 'High-quality content writing services for blogs, articles, and more.',
    imageUrl: '/empty.png', // Adjusted image URL
    price: '$200',
  },
  {
    id: 6,
    title: 'Graphic Design',
    description: 'Professional graphic design services including logos, branding, and more.',
    imageUrl: '/empty.png', // Adjusted image URL
    price: '$250',
  },
];

const FeaturedGigs = () => {
  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8">Featured Gigs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {featuredGigs.map((gig) => (
          <div key={gig.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative">
              <Image
                src={gig.imageUrl}
                alt={gig.title}
                width={400}
                height={200} // Shortened height
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{gig.title}</h3>
              <p className="text-gray-700 mb-4">{gig.description}</p>
              <p className="text-lg font-bold text-green-600 mb-4">{gig.price}</p>
              <a
                href={`/gig/${gig.id}`} // Replace with your actual link
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedGigs;
