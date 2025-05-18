import { useStateProvider } from "../../../context/StateContext";
import { GET_SELLER_ORDERS_ROUTE } from "../../../utils/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [{ userInfo }] = useStateProvider();

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const {
          data: { orders },
        } = await axios.get(GET_SELLER_ORDERS_ROUTE, { withCredentials: true });
        setOrders(orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (userInfo) getOrders();
  }, [userInfo]);

  const OrderSkeleton = () => (
    <ContentLoader
      speed={2}
      width="100%"
      height={80}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="20" y="20" rx="4" ry="4" width="80%" height="16" />
      <rect x="20" y="50" rx="3" ry="3" width="40%" height="10" />
    </ContentLoader>
  );

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-6 lg:px-32">
      <h3 className="m-5 text-2xl font-semibold text-gray-800">All your Orders</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white dark:bg-gray-800">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Order Id</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Delivery Time</th>
              <th scope="col" className="px-6 py-3">Ordered By</th>
              <th scope="col" className="px-6 py-3">Order Date</th>
              <th scope="col" className="px-6 py-3">Send Message</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="bg-white dark:bg-gray-800">
                    <td colSpan="8">
                      <OrderSkeleton />
                    </td>
                  </tr>
                ))
              : orders.map((order) => (
                  <tr
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                    key={order.id}
                  >
                    <th scope="row" className="px-6 py-4 text-gray-900 dark:text-white">
                      {order.id}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {order.gig.title}
                    </td>
                    <td className="px-6 py-4">{order.gig.category}</td>
                    <td className="px-6 py-4">{order.price}</td>
                    <td className="px-6 py-4">{order.gig.deliveryTime}</td>
                    <td className="px-6 py-4">
                      {order.buyer.fullName} ({order.buyer.username})
                    </td>
                    <td className="px-6 py-4">{order.createdAt.split("T")[0]}</td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/seller/orders/messages/${order.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Send
                      </Link>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
