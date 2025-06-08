import { useState, useRef } from "react";

import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate, createSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css fileo

import useOutsideClick from "../../hooks/useOutsideClick.js";

function Header() {
  const navigate = useNavigate();

  // === State for input field ===
  const [destination, setDestination] = useState("");

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);

  const [guestOptions, setGuestOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [isGuestOptionsOpen, setIsGuestOptionsOpen] = useState(false);

  // === Handle increase/decrease of guest/room options ===
  const handleGuestOptions = (name, operation) => {
    setGuestOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "inc" ? prev[name] + 1 : Math.max(0, prev[name] - 1),
      };
    });
  };

  // === Perform search and navigate to /hotels with query params ===
  const handleSearch = () => {
    // Create query params from user input (destination, dates, guest options)
    const encodedParams = createSearchParams({
      destination,
      startDate: date[0].startDate.toISOString(),
      endDate: date[0].endDate.toISOString(),
      guestOptions: JSON.stringify(guestOptions),
    });

    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <header className="header">
      <div className="headerSearch">
        {/* Destination Input */}
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

        {/* Date Picker */}
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div
            className="dateDropDown"
            id="calendarDropDown"
            onClick={() => setIsDateRangeOpen((prev) => !prev)}
          >
            {/* Show selected date range */}
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
          </div>
          <DateRangeDropDown
            date={date}
            setDate={setDate}
            isDateRangeOpen={isDateRangeOpen}
            setIsDateRangeOpen={setIsDateRangeOpen}
          />
          <span className="seperator"></span>
        </div>

        {/* Guest & Room Options */}
        <div className="headerSearchItem">
          <div
            id="optionsDropDown"
            onClick={() => setIsGuestOptionsOpen((prev) => !prev)}
          >
            {`${guestOptions.adult} adult • ${guestOptions.children} children • ${guestOptions.room} room`}
          </div>
          <GuestOptionsList
            isGuestOptionsOpen={isGuestOptionsOpen}
            setIsGuestOptionsOpen={setIsGuestOptionsOpen}
            guestOptions={guestOptions}
            handleGuestOptions={handleGuestOptions}
          />
          <span className="seperator"></span>
        </div>

        {/* Search button */}
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

/*
 * DateRangeDropDown: Renders a calendar dropdown to select date range
 * Closes automatically when clicking outside the calendar area
 */
function DateRangeDropDown({
  date,
  setDate,
  setIsDateRangeOpen,
  isDateRangeOpen,
}) {
  const dateRangeRef = useRef();
  useOutsideClick(dateRangeRef, "calendarDropDown", () =>
    setIsDateRangeOpen(false),
  );
  return (
    isDateRangeOpen && (
      <div ref={dateRangeRef}>
        <DateRange
          className="date"
          ranges={date}
          onChange={(item) => setDate([item.selection])}
          minDate={new Date()}
          moveRangeOnFirstSelection={true}
        />
      </div>
    )
  );
}

/*
 * GuestOptionsList: Component for rendring guest/room selection
 * Automatically closes when clicking outside of area
 */
function GuestOptionsList({
  isGuestOptionsOpen,
  setIsGuestOptionsOpen,
  guestOptions,
  handleGuestOptions,
}) {
  // === Guest options types: used to render the counter items dynamically ===
  const guestOptionTypes = [
    {
      type: "adult",
      minLimit: "1",
    },
    {
      type: "children",
      minLimit: "0",
    },
    {
      type: "room",
      minLimit: "1",
    },
  ];

  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionsDropDown", () =>
    setIsGuestOptionsOpen(false),
  );
  return (
    isGuestOptionsOpen && (
      <div className="guestOptions" ref={optionsRef}>
        {guestOptionTypes.map((option) => (
          <GuestOptionItem
            key={option.type}
            guestOptions={guestOptions}
            minLimit={option.minLimit}
            type={option.type}
            handleGuestOptions={handleGuestOptions}
          />
        ))}
      </div>
    )
  );
}

/**
 * Reusable counter component for guests/rooms
 */
function GuestOptionItem({ guestOptions, type, minLimit, handleGuestOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <button
        className="optionCounterBtn"
        disabled={guestOptions[type] <= minLimit}
        onClick={() => handleGuestOptions(type, "dec")}
      >
        <HiMinus className="icon" />
      </button>
      <span className="optionCounter">{guestOptions[type]}</span>
      <button
        className="optionCounterBtn"
        onClick={() => handleGuestOptions(type, "inc")}
      >
        <HiPlus className="icon" />
      </button>
    </div>
  );
}
