import { useState } from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const locations = [
  "All Locations",
  "Mumbai",
  "Bangalore",
  "Delhi",
  "Goa",
  "Hyderabad",
  "Pune",
];

const Section01 = ({setSearchQuery, setSelectedCity }) => {
    const [activeLocation, setActiveLocation] = useState("All Locations");
    const [searchText, setSearchText] = useState("");


    const handleCityChange = (city) => {
    setActiveLocation(city);
    setSelectedCity(city);   
  };

    const handleSearch = () => {
    setSearchQuery(searchText);   
  };

  return (
    <Parallax speed={-10}>
      <section
        className="d-flex align-items-center text-center text-white"
        style={{
          minHeight: "90vh",
          background: "linear-gradient(135deg, #2b3cff, #2a0a6c)",
        }}
      >
        <div className="container">

          {/* Heading */}
          <motion.h1
            className="fw-bold display-4 mb-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Amazing Events <br className="d-none d-md-block" />
            Near You
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="lead mb-5 text-light opacity-75"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            From concerts to conferences, find and book the best experiences
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="row justify-content-center mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="col-12 col-md-10 col-lg-8">
              <div className="input-group input-group-lg shadow rounded-pill overflow-hidden">
                <span className="input-group-text bg-white border-0">
                  <FaSearch className="text-primary" />
                </span>
                <input
  type="text"
  className="form-control border-0"
  placeholder="Search by city or event"
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
/>
<button
  className="btn btn-primary px-4"
  onClick={handleSearch}
>
  Search
</button>

              </div>
            </div>
          </motion.div>

          {/* Location Buttons */}
          <motion.div
            className="d-flex flex-wrap justify-content-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {locations.map((city) => (
              <button
                key={city}
               onClick={() => handleCityChange(city)}
                className={`btn rounded-pill px-3 ${
                  activeLocation === city
                    ? "btn-primary"
                    : "btn-outline-primary text-white border-primary"
                }`}
              >
                <FaMapMarkerAlt className="me-1" />
                {city}
              </button>
            ))}
          </motion.div>

        </div>
      </section>
    </Parallax>
  );
};

export default Section01;
