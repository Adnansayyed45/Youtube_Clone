import React, { useEffect, useState } from "react";
import './SearchResults.css'
import { useParams, Link } from "react-router-dom";
import { API_KEY, value_converter } from '../../data';
import moment from "moment";
import "./SearchResults.css";

const SearchResults = () => {
  const { query } = useParams(); // Get the search query from URL params
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&q=${query}&key=${API_KEY}`;
      const response = await fetch(searchUrl);
      const data = await response.json();
      setResults(data.items || []);
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="search-results">
      {results.map((item, index) => (
        <Link to={`/video/${item.id.videoId}`} key={index} className="result-card">
          <img src={item.snippet?.thumbnails?.medium.url} alt={item.snippet?.title} />
          <h2>{item.snippet?.title}</h2>
          <h3>{item.snippet?.channelTitle}</h3>
          <p>{moment(item.snippet?.publishedAt).fromNow()}</p>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
