import { GET_USER_GIGS_ROUTE } from "../../../utils/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Index() {
  const [gigs, setGigs] = useState([]);
  useEffect(() => {
    const getUserGigs = async () => {
      try {
        const {
          data: { gigs: gigsData },
        } = await axios.get(GET_USER_GIGS_ROUTE, {
          withCredentials: true,
        });
        setGigs(gigsData);
      } catch (err) {
        console.log(err);
      }
    };
    getUserGigs();
  }, []);

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h3 className="m-5 text-3xl font-bold text-gray-800 dark:text-black">Your Gigs</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery Time
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {gigs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500 dark:text-gray-400">
                  No gigs available
                </td>
              </tr>
            ) : (
              gigs.map(({ title, category, price, deliveryTime, id }) => {
                return (
                  <tr
                    className="border-b hover:bg-gray-100 dark:hover:bg-gray-600"
                    key={id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {title}
                    </th>
                    <td className="px-6 py-4">{category}</td>
                    <td className="px-6 py-4">${price}</td>
                    <td className="px-6 py-4">{deliveryTime} days</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/seller/gigs/${id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <button className="ml-4 font-medium text-red-600 dark:text-red-500 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Index;
