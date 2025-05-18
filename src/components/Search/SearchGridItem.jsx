import { HOST, IMAGES_URL } from "../../utils/constants";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FaStar, FaRobot } from "react-icons/fa";

function SearchGridItem({ gig }) {
  const router = useRouter();

  const calculateRatings = () => {
    const { reviews } = gig;
    let rating = 0;
    if (!reviews?.length) {
      return 0;
    }
    reviews.forEach((review) => {
      rating += review.rating;
    });
    return (rating / reviews.length).toFixed(1);
  };

  return (
    <div
      className="max-w-[300px] flex flex-col gap-3 p-4 cursor-pointer mb-8 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      onClick={() => router.push(`/gig/${gig.id}`)}
    >
      <div className="relative w-64 h-40 rounded-xl overflow-hidden">
        <Image
          src={`${IMAGES_URL}/${gig.images[0]}`}
          alt="gig"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex items-center gap-3">
        {gig.createdBy.profileImage ? (
          <Image
            src={HOST + "/" + gig.createdBy.profileImage}
            alt="profile"
            height={30}
            width={30}
            className="rounded-full"
          />
        ) : (
          <div className="bg-purple-500 h-8 w-8 flex items-center justify-center rounded-full">
            <span className="text-lg text-white font-semibold">
              {gig.createdBy.email[0].toUpperCase()}
            </span>
          </div>
        )}
        <span className="text-md font-semibold">
          {gig.createdBy.username}
        </span>
      </div>
      <div>
        <p className="line-clamp-2 text-[#404145]">{gig.title}</p>
      </div>
      <div className="flex items-center gap-1 text-yellow-500">
        <FaStar />
        <span className="font-semibold">{calculateRatings()}</span>
        <span className="text-sm text-[#74767e]">({gig.reviews.length})</span>
      </div>
      <div>
        <strong className="font-semibold">From ${gig.price}</strong>
      </div>
      <div className="mt-auto flex justify-end">
        <button
          className="bg-yellow-500 text-white text-sm py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
          onClick={(e) => {
            e.stopPropagation(); // Prevents the card click event
            router.push("/premium");
          }}
        >
          <FaStar />
          AI Analyze
          🪄
        </button>
      </div>
    </div>
  );
}

export default SearchGridItem;
