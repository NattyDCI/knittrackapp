import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscBellDot } from "react-icons/vsc";
import { IoMdSearch } from "react-icons/io";


import {
  logoImg,
  socksImg,
  shawlImg,
  sweaterImg,
  scarf,
} from "../assets";
import "../style.css";

export default function Homepage() {


  const navigate = useNavigate();
  const [patternSearch, setPatternSearch] = useState("");

  const categories = [
    { name: "SOCKS", query: "socks", image: socksImg },
    { name: "SHAWLS", query: "shawl", image: shawlImg },
    { name: "SWEATERS", query: "sweater", image: sweaterImg },
    { name: "BAGS", query: "bag", image: scarf },
  ];

  function handleSearch(event) {
    event.preventDefault();

    const query = patternSearch.trim();
    if (!query) return;

    navigate(`/search/${encodeURIComponent(query)}`);
  }

  return (
    <section className="bg-[#f4f1ee] px-6 justify-center py-8 min-h-dvh pb-28">
    
      
        <header className="flex items-start justify-between mb-8">
          <div>
            <img src={logoImg} alt="KnitTrack" className="w-32 mb-2" />
            <p className="text-xl text-blackfont-extrabold">Hello Joanna,</p>
          </div>

          <div className="flex gap-4">
            <button className="w-14 h-14 rounded-full bg-[#726a6a] flex items-center justify-center text-2xl">
              <VscBellDot color="white" />
            </button>

            <div className="w-14 h-14 rounded-full bg-mainMauve border-4 border-accentLight ">
              <img src={socksImg} alt="" className="w-full h-full rounded-full" />
             
            </div>
          </div>
        </header>

        <form
          onSubmit={handleSearch}
          className="bg-mainMauve rounded-2xl justify-between pl-5 flex items-center"
        >
          <span className="text-2xl mr-2 text-amber-50">☰</span>

          <input
            value={patternSearch}
            onChange={(e) => setPatternSearch(e.target.value)}
            placeholder="Search new Patterns..."
            className="flex-1 bg-[#c1a6a6] text-lg placeholder:text-[#eae0e5] "
            
          />

          <button type="submit" className="text-2xl  rounded-full cursor-pointer ">
           <IoMdSearch color="white" size="30"/>

          </button>

        </form>

        <p className="text-left text-lg mb-4 mt-5">
          Let’s knit something cozy today!
        </p>

        <img
          src={shawlImg}
          alt="Knitting inspiration"
          className="w-full h-56 object-cover mb-5 mx-0 px-0"
        />

        <div className="flex justify-center gap-8 mb-10">
          <button
            onClick={() => navigate("/new-project")}
            className="border-2 border-primary rounded-lg px-5 py-3 font-semibold cursor-pointer"
          >
            + New Project
          </button>

          <button
            onClick={() => navigate("/projectspage")}
            className="bg-primary text-white rounded-lg px-5 py-3 font-semibold cursor-pointer"
          >
            Go to Projects
          </button>
        </div>

        <h2 className="text-center text-lg mb-6">
          Want to browse categories?
        </h2>

        <div className="grid grid-cols-2 gap-5">
          {categories.map((category) => (
            <button
              key={category.query}
              onClick={() => navigate(`/search/${category.query}`)}
              className="bg-mainMauve cursor-pointer rounded-lg overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-32 object-cover rounded-lg"
              />

              <p className="py-3 text-base text-light font-manrope font-semibold">
                {category.name}
              </p>
            </button>
          ))}
          
        </div>
   
    </section>
  );
}
