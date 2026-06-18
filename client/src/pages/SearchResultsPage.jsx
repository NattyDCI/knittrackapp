import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_BASE } from "../config";

export default function SearchResultsPage() {
  const { query } = useParams();
  const navigate = useNavigate();

  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPatterns() {
      setLoading(true);

      try {
        console.log("API_BASE =", API_BASE);

        const response = await fetch(
          `${API_BASE}/api/ravelry/patterns?q=${encodeURIComponent(query)}`,
        );

        console.log("STATUS =", response.status);

        const text = await response.text();

        console.log("RAW RESPONSE =", text);

        const data = JSON.parse(text);

        setPatterns(data.patterns || []);
      } catch (error) {
        console.error("FETCH ERROR =", error);
      }
    }

    fetchPatterns();
  }, [query]);

  return (
    <section className="search-page">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <span>Search: {query}</span>
      </nav>

      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1>Results for “{query}”</h1>

      {loading && <p>Loading patterns...</p>}

      <div className="ravelry-grid">
        {patterns.map((pattern) => (
          <article key={pattern.id} className="ravelry-card">
            {pattern.first_photo?.small_url && (
              <img src={pattern.first_photo.small_url} alt={pattern.name} />
            )}

            <div className="ravelry-card-content">
              <h3>{pattern.name}</h3>
              <p>{pattern.designer?.name}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
