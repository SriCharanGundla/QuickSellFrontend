import React from "react";
import Card from "./Card";

function Column({ tickets, users, groupingOption, sortingOption, groupValue }) {
  const getFilteredAndSortedTickets = () => {
    let filteredTickets = [...tickets];

    switch (groupingOption) {
      case "user":
        filteredTickets.sort((a, b) => a.userId.localeCompare(b.userId));
        break;
      case "priority":
        filteredTickets.sort((a, b) => {
          const priorityOrder = { 4: 0, 3: 1, 2: 2, 1: 3, 0: 4 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
        break;
      case "status":
        const statusOrder = ["Backlog", "Todo", "In progress", "Done", "Canceled"];
        filteredTickets.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
        break;
      default:
        break;
    }

    filteredTickets = filteredTickets.filter((ticket) => {
      return ticket[groupingOption] === groupValue;
    });

    filteredTickets = filteredTickets.map((ticket) => ({
      ...ticket,
      priorityText: getPriorityText(ticket.priority),
    }));

    return filteredTickets;
  };

  const filteredAndSortedTickets = getFilteredAndSortedTickets();

  return (
    <div className="col">
      <div className="colHeading">{getPriorityText(groupValue)}</div>
      {filteredAndSortedTickets.map((ticket) => (
        <Card key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}

function getPriorityText(priorityLevel) {
  switch (priorityLevel) {
    case 4:
      return "Urgent";
    case 3:
      return "High";
    case 2:
      return "Medium";
    case 1:
      return "Low";
    case 0:
      return "No priority";
    default:
      return priorityLevel;
  }
}

export default Column;