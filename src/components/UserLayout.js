import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function UserLayout(props) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // <-- scrolls to top on every route change

  return (
    <div>
      <Header setSearchedJobs={props.setSearchedJobs} />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;
