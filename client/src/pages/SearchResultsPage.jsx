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
      } finally {
        setLoading(false);
      }
    }

    fetchPatterns();
  }, [query]);

  return (
    <section className="search-page bg-[#f4f1ee] px-6 flex-col items-center justify-center py-8 min-h-dvh overflow-y-auto pb-28">
      <nav className="breadcrumb pb-0">
        <Link to="/" className="text-mainMauve">
          Home
        </Link>

        <span className="font-bold"> › Search: {query}</span>
      </nav>

      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1>Results for “{query}”</h1>

      {loading && <p>Loading patterns...</p>}

      <div className="grid grid-cols-2 gap-4">
        {patterns.map((pattern) => (
          <div
            key={pattern.id}
            className=" bg-mainMauve rounded-2xl pb-3 cursor-pointer"
          >
            {pattern.first_photo?.small_url && (
              <img
                src={pattern.first_photo.small_url}
                alt={pattern.name}
                className="w-full h-40 object-cover rounded-t-xl "
              />
            )}

            <div className="ravelry-card-content px-1 ">
              <div className="flex justify-items-start px-2 leading-0">
                <h3 className="font-bold text-xl mt-2 rounded-lg  text-accentLight">
                  {pattern.name}
                </h3>
              </div>
              <p className="px-2 text-primary font-bold">
                {pattern.designer?.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
