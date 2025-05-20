import Image from 'next/image';
import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import img from "@/images/pic-2.jpg";

const reviews = [
  {
    name: 'John Deo',
    image: img,
    rating: 5,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sunt fugiat dolore ipsum id est maxime ad tempore quasi tenetur.',
  },
  {
    name: 'John Deo',
    image: img,
    rating: 4.5,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sunt fugiat dolore ipsum id est maxime ad tempore quasi tenetur.',
  },
  {
    name: 'John Deo',
    image: img,
    rating: 5,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sunt fugiat dolore ipsum id est maxime ad tempore quasi tenetur.',
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="flex justify-center gap-1 mt-2 text-orange-400">
      {Array.from({ length: fullStars }, (_, i) => (
        <FaStar key={i} />
      ))}
      {hasHalfStar && <FaStarHalfAlt />}
    </div>
  );
};

const CustomerReviews = () => {
  return (
    <section className="py-14 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-10">
          <span className="text-gray-800 dark:text-white">Customer&apos; </span>
          <span className="bg-green-600 text-white px-4 py-1 rounded-tr-xl rounded-bl-xl">Review</span>
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm px-6 py-6 rounded-lg flex flex-col justify-between text-center h-[310px] hover:shadow-md transition"
            >
              <Image
                src={review.image}
                alt={review.name}
                 width={64}
                 height={64}
                className="mx-auto rounded-full w-16 h-16 object-cover mb-3 border-2 border-green-400"
              />
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{review.text}</p>
              <h3 className="font-semibold text-md text-gray-800 dark:text-white mb-1">{review.name}</h3>
              <StarRating rating={review.rating} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;