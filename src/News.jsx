// import "./newstyles.css"
function News({ searchData, newsData, loading, noContent }) {
  return (
    <div className="newscontainer">
      {loading ? (
        <h3>......Loading</h3>
      ) : noContent ? (
        <h2>......There is no content</h2>
      ) : (
        Array.isArray(newsData) &&
        newsData.map((item, index) => (
          <div key={index} className="articlecontainer">
            <img src={item.urlToImage} alt={item.title} />
            <h3> Source: {item.source.name || "No source"}</h3>
            <h3> Title: {item.title}</h3>
            <p> Description: {item.description}</p>
            <p> Author: {item.author}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default News;
