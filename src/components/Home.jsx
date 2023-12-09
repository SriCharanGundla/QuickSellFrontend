import React from "react";
import { useState, useEffect } from "react";
import Column from "./Column";

function Home() {
  const getUniqueGroupingValues = (tickets, groupingOption) => {
    const uniqueValuesSet = new Set(
      tickets.map((ticket) => ticket[groupingOption])
    );
    return Array.from(uniqueValuesSet);
  };

  function hideDiv() {
    var x = document.getElementsByClassName("homeHeading");
    var displayStyle = window
      .getComputedStyle(x[0])
      .getPropertyValue("display");
    if (displayStyle === "none") {
      x[0].style.display = "block";
    } else {
      x[0].style.display = "none";
    }
  }

  const [groupingOption, setGroupingOption] = useState("status");
  const [sortingOption, setSortingOption] = useState("priority");
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  const handleGroupingChange = (event) => {
    const selectedGroupingOption = event.target.value;
    setGroupingOption(selectedGroupingOption);
  };

  const handleSortingChange = (event) => {
    const selectedSortingOption = event.target.value;
    setSortingOption(selectedSortingOption);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      const { tickets, users } = data;

      setTickets(tickets);
      setUsers(users);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="displayHeading">
        <div className="display">
          <button onClick={hideDiv} className="displayButton">
            Display
          </button>
        </div>
        <div className="homeHeading" hidden>
          <div className="selectHeading">
            <p>Grouping</p>
            <select
              name="group"
              id="group"
              value={groupingOption}
              onChange={handleGroupingChange}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="selectHeading">
            <p>Ordering</p>
            <select
              name="order"
              id="order"
              value={sortingOption}
              onChange={handleSortingChange}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>
      <div className="homeBody">
        {getUniqueGroupingValues(tickets, groupingOption).map((group) => (
          <Column
            key={group}
            tickets={tickets}
            users={users}
            groupingOption={groupingOption}
            sortingOption={sortingOption}
            groupValue={group}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
