"use client";

import React, { use, useEffect, useState } from "react";
import eventApi from "@/api/events.api";
import EventDetailsPage from "../_component/details";
import { getTokenLocal } from "@/utils/localStorage.util";

export default function TicketPage({ params }) {
  const [selectedEvent, setSelectedEvent] = useState({});
  // params.id will hold the dynamic value (e.g., "123")
  const { eventId } = React.use(params);
  useEffect(() => {
    if (getTokenLocal() == null || getTokenLocal() == "" || getTokenLocal() == undefined) {
      alert("Please login to purchase ticket details.");
      window.location.href = "/login";
      return;
    }
    getEventByID(eventId);
  }, [eventId]);

  const getEventByID = async (id) => {
    try {
      const res = await eventApi.getEventById(id);
      if (res?.status.toLowerCase() != "success") return alert(res?.message || "Something went wrong, please try again later❌");
      const currentEvent=res?.data
      setSelectedEvent(currentEvent);
    } catch (error) {
      console.error("Error fetching event by ID:", error);
    }
  }
  return (
    <div >
      <EventDetailsPage event={selectedEvent} />
    </div>
  );
}