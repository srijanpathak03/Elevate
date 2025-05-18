import "../globals.css";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useEffect, lazy, Suspense } from "react";
import { StateProvider } from "../context/StateContext";
import reducer, { initialState } from "../context/StateReducers";

// Lazy load the Navbar component
const LazyNavbar = lazy(() => import("../components/Navbar"));

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [cookies] = useCookies();

  useEffect(() => {
    if (
      router.pathname.includes("/seller") ||
      router.pathname.includes("/buyer")
    ) {
      if (!cookies.jwt) {
        router.push("/");
      }
    }
  }, [cookies, router]);

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Elevate</title>
      </Head>
      <div className="relative flex flex-col h-screen justify-between">
        <Suspense fallback={<div>Loading...</div>}>
          <LazyNavbar />
        </Suspense>
        <div
          className={`${
            router.pathname !== "/" ? "mt-36" : ""
          } mb-auto w-full mx-auto`}
        >
          <Component {...pageProps} />
        </div>
        {/* <Footer /> */}
      </div>
    </StateProvider>
  );
}
