import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import ContactForm from "./Components/Contactform/ContactForm";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./Components/loader/Loader";
import SearchResults from "./Components/SearchResults/SearchResults";
import Feed from "./Components/Feed/Feed";
import PlayVideo from "./Components/PlayVideo/PlayVideo";
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer";


const App = () => {
  const [loading, setLoading] = useState(true);
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  console.log(user, "user");

  const [sidebar, setSidebar] = useState(true);
  
  useEffect(() => {
    // Simulate loading with a timeout, or replace with actual data loading logic
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (loading) {
    return <Loader />;
  }

  // PrivateRoute component to protect the Home route
  function PrivateRoute({ children }) {
    return isAuthenticated ? children : <Navigate to="/" />;
  }

  return (
    <div>
      {/* Navbar with login/logout */}
      <Navbar setSidebar={setSidebar} />

      {/* Authentication Section */}
      {/* <div>
        {isAuthenticated ? (
          <div>
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >

            </button>
          </div>
        ) : (
          <button onClick={() => loginWithRedirect()}></button>
        )}
      </div> */}

      {/* Application Routes */}
      <Routes>
        {/* Protected Home Route */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home sidebar={sidebar} />
            </PrivateRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/" element={<Feed category="1" />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/video/:categoryId/:videoId" element={<PlayVideo />} />
        <Route path="/video/:videoId" element={<VideoPlayer />} /> {/* Updated route */}
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
    </div>
  );
};

export default App;
