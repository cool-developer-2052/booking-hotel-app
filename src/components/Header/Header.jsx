import { useState } from "react";
import { MdLocationOn } from "react-icons/md";

function Header() {
  // === State for input field ===
  const [destination, setDestination] = useState("");

  return (
    <header className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            className="headerSearchInput"
            type="text"
            name="destination"
            id="destination"
            placeholder="Where to go?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <span className="seperator"></span>
        </div>
      </div>
    </header>
  );
}

export default Header;
