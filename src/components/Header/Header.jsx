import { useState, useRef } from "react";

import { MdLocationOn } from "react-icons/md";
import { HiCalendar } from "react-icons/hi";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css fileo

import useOutsideClick from "../../hooks/useOutsideClick.js";

function Header() {
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
          <span className="seperator"></span>
        </div>

        {/* Search button */}
        <div className="headerSearchItem"></div>
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
