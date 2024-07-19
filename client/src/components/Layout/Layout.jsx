import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import Spinner from "../Spinner";

function Layout() {
  return (
    <>
      <div className="2xl:container mx-auto overflow-hidden w-full">
        <div className="py-4 px-4 sm:px-8 flex flex-col gap-8 mb-24">
          <Navbar />
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
