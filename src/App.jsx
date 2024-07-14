import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link ,useLocation} from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import Weather from "./Weather";
import News from "./News";
import "./App.css";

function App() {
  const [searchData, setSearchData] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noContent, setNoContent] = useState(false);

  const fetchNews = async () => {
    if (!searchData) return;
    setLoading(true);
    setNoContent(false);
    try {
      const newsURL = `https://newsapi.org/v2/everything?q=${searchData}&from=2024-06-14&sortBy=publishedAt&apiKey=c508d9edb039432c96f3784aae09a676`;
      const response = await fetch(newsURL);
      const data = await response.json();
      if (data.articles && data.articles.length > 0) {
        setNewsData(data.articles);
        setNoContent(false);
      } else {
        setNewsData([]);
        setNoContent(true);
      }
      setLoading(false);
      console.log("newsdata is:", data.articles);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching news:", error);
    }
  };

  // Custom hook to get current location
  function useCurrentLocation() {
    return useLocation();
  }

  // BannerImage component
  function BannerImage() {
    const location = useCurrentLocation();
    return (
      location.pathname === '/' && (
        <img src="uiimage1.png" alt="Banner" className="banner-image" />
      )
    );
  }

  return (
    <BrowserRouter>
      <div className="main-container">
        <div className="navbar">
          <ul>
            <li>
              <Link to="/weather" style={{ textDecoration: 'none', color: 'inherit' }}>Weather</Link>
            </li>
            <li>
              <Link to="/news" style={{ textDecoration: 'none', color: 'inherit' }}>News</Link>
            </li>
          </ul>
          <div className="searchdiv">
            <input
              type="text"
              value={searchData}
              placeholder="Enter some text"
              onChange={(e) => setSearchData(e.target.value)}
              className="searchbox"
            />
            <button className="buttonclass" onClick={fetchNews}>
              <BiSearch size={24} style={{ marginRight: "8px" }} />
              Search
            </button>
          </div>
        </div>
        <Routes>
          <Route
            path="/weather"
            element={<Weather searchData={searchData} />}
          />
          <Route
            path="/news"
            element={
              <>
                <News
                  searchData={searchData}
                  newsData={newsData}
                  loading={loading}
                  noContent={noContent}
                />
              </>
            }
          />
          <Route
            path="/"
            element={<BannerImage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
