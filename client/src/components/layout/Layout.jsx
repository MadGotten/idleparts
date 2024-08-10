import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import Spinner from '@/components/Spinner';
const Footer = lazy(() => import('../Footer'));

function Layout() {
  return (
    <>
      <div className="2xl:container mx-auto overflow-hidden w-full">
        <div className="py-4 px-4 sm:px-8 flex flex-col gap-8 mb-24">
          <Navbar />
          <Suspense
            fallback={
              <div className="mx-auto mt-12">
                <Spinner />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
