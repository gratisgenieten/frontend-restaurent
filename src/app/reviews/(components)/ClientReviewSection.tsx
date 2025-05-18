import Image from 'next/image';
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const reviews = [
  {
    name: 'Touseeq Ijaz',
    username: '@touseeqjazweb',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    stars: 4,
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quaerat quis? Provident temporibus architecto asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam tenetur voluptates incidunt blanditiis sed atque cumque.',
  },
  {
    name: 'J.K Rowling',
    username: '@jkrowling',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    stars: 5,
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quaerat quis? Provident temporibus architecto asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam tenetur voluptates incidunt blanditiis sed atque cumque.',
  },
  {
    name: 'Harry Potter',
    username: '@DanielRedclief',
    image: 'https://randomuser.me/api/portraits/men/23.jpg',
    stars: 4,
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quaerat quis? Provident temporibus architecto asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam tenetur voluptates incidunt blanditiis sed atque cumque.',
  },
  {
    name: 'Oliva',
    username: '@Olivaaward',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
    stars: 5,
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quaerat quis? Provident temporibus architecto asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam tenetur voluptates incidunt blanditiis sed atque cumque.',
  },
];

const StarRating = ({ count }: { count: number }) => {
  return (
    <div className="flex gap-1 text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) =>
        i < count ? <FaStar key={i} /> : <FaRegStar key={i} />
      )}
    </div>
  );
};

const ClientReviewSection = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">Comments</h2>
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Clients Says</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-left flex flex-col space-y-3 hover:shadow-lg transition duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                {/* Left section: Image + name + username */}
                <div className="flex items-center space-x-4">
                  <Image src={r.image} alt={r.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{r.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{r.username}</p>
                  </div>
                </div>

                {/* Right section: Star Rating */}
                <div className="ml-4">
                  <StarRating count={r.stars} />
                </div>
              </div>

              {/* Review text */}
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{r.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>


  );
};

export default ClientReviewSection;