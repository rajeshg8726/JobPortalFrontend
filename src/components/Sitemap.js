import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Sitemap = () => {
  const [sitemap, setSitemap] = useState("");
  const backendURL = process.env.REACT_APP_API_URL;


  useEffect(() => {
    // Fetch the sitemap from the backend
    axios
      .get(`${backendURL}/api/sitemap.xml`, {
        headers: { Accept: "application/xml" },
      })
      .then((response) => setSitemap(response.data))
      .catch((error) => console.error("Error fetching sitemap:", error));
  }, []);

  return (
    <div>
      <pre>{sitemap}</pre>
    </div>
  );
};

export default Sitemap;
