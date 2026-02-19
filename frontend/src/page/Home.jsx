import Section01 from "../components/Home/Section01.jsx";
import Section02 from "../components/Home/Section02.jsx";
import Section03 from "../components/Home/Section03.jsx";
import { useState } from "react";

const Home = () => {
  const [selectedCity, setSelectedCity] = useState("All Locations");
  const [searchQuery, setSearchQuery] = useState("");   // 🔥 new state

  return (
    <>
      <Section01
        setSelectedCity={setSelectedCity}
        setSearchQuery={setSearchQuery}   // 🔥 pass kar diya
      />
      <Section02
        selectedCity={selectedCity}
        searchQuery={searchQuery}   // 🔥 pass kar diya
      />
      <Section03 />
    </>
  );
};

export default Home;
