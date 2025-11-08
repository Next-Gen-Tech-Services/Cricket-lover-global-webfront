"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  CalendarDays,
  MapPin,
} from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";
import eventApi from "@/api/events.api";
import { useRouter } from "next/navigation";

const EventPage = () => {
  const router = useRouter();

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sliderEvents, setSliderEvents] = useState([]); // only first 4 upcoming

  const [filterType, setFilterType] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [page] = useState(1);
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((current + 1) % events.length);
  const prevSlide = () =>
    setCurrent((current - 1 + events.length) % events.length);
  const goToSlide = (index) => setCurrent(index);

  useEffect(() => {
    fetchEvents();
  }, []);

  //  Auto Slide
  useEffect(() => {
    if (sliderEvents.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderEvents.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderEvents]);

  const fetchEvents = async (searchValue = "") => {
    try {
      if (searchValue === "") searchValue = searchText;

      const res = await eventApi.getAllEvents({
        page,
        limit: 10,
        search: searchValue,
      });

      if (res?.status.toLowerCase() !== "success")
        return alert(res?.message || "Something went wrong ❌");

      setEvents(res.data);
      // new logic
      // ✅ Show all events in grid
setEvents(res.data);

// ✅ Filter only first 4 upcoming for slider
const today = new Date();

const upcomingEvents = res.data
  .filter((event) => new Date(event.startDate) >= today)
  .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
  .slice(0, 5);

setSliderEvents(upcomingEvents.length > 0 ? upcomingEvents : res.data.slice(0, 5));

    } catch (error) {
      console.log("Error fetching events:", error);
    }
  };
  // console.log("bannerimage------------",images)

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    fetchEvents(value);
  };

  const handleFilterChange = (value) => {
    setFilterType(value);
    const filtered =
      value === "free"
        ? events.filter((event) => event.eventType?.toLowerCase() !== "paid")
        : value === "paid"
        ? events.filter((event) => event.eventType?.toLowerCase() === "paid")
        : events;

    setEvents(filtered);
  };
  console.log("image-------", events[current]?.bannerImage);

  return (
    <section className="min-h-full bg-white px-4 md:px-16 py-10 text-gray-800 relative">
        {/* ✅ Slider Section */}
      <section>
        {sliderEvents.length > 0 && (
          <div className="w-full bg-gradient-to-b from-gray-200 to-white py-10 mt-10 mb-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
              <div className="flex-1">
                <p className="text-m font-semibold mb-2 text-gray-700 flex items-center gap-2">
                  <CalendarDays size={18} className="text-gray-700" />
                  {sliderEvents[current]?.startDate &&
                    new Date(events[current]?.startDate).toDateString()}
                </p>

                <h1 className="text-4xl font-extrabold leading-tight mb-3">
                  {sliderEvents[current]?.title}
                </h1>
                <p className="text-lg text-gray-600 mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-red-500" />
                  {sliderEvents[current]?.venue}
                </p>

                <p className="text-lg font-semibold mb-6">
                  
                  {/* {events[current]?.price || "€—"} */}
                  €{sliderEvents[current]?.tickets?.[0]?.price|| " 0"}
                            {/* ₹{event?.tickets?.[0]?.price || "—"} onwards */}

                </p>

                <button
                  onClick={() =>
                    router.push(`/ticketdetails/${sliderEvents[current]._id}`)
                  }
                  className="bg-black text-white px-7 py-2 rounded-lg text-lg font-semibold"
                >
                  Buy tickets
                </button>
              </div>

              <div className="relative flex-1 flex justify-center py-14">
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                >
                  <ChevronLeft />
                </button>

                {/* {events[current]?.bannerImage || events[current]?.[0] */}
                <img
                  src={
                    sliderEvents[current]?.bannerImage ||
                   sliderEvents[current]?.images?.[0] ||
                    "/placeholder.png"
                  }
                  width={350}
                  height={200}
                  alt="Event poster"
                  className="rounded-2xl shadow-xl object-cover  "
                />

                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>

            <div className="flex justify-center mt-6 gap-2">
              {sliderEvents.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-2 h-2 rounded-full ${
                    idx === current ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </section>
      

      {/* ✅ Search Box */}
      <div className="flex flex-col md:flex-row items-center justify-between border border-gray-300 rounded-lg shadow-sm py-3 px-4 gap-4">
        <div className="flex items-center w-full md:w-2/3 border border-gray-300 rounded-lg px-3 py-2">
          <Search className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search for events"
            className="w-full outline-none text-sm md:text-base"
          />
        </div>

        <button
          className="bg-[#551FFF] text-white px-5 py-2 rounded-md text-sm md:text-base hover:bg-[#4513e0] transition cursor-pointer"
          onClick={() => fetchEvents("")}
        >
          Find Events
        </button>
      </div>
      {/* ✅ Filters & Calendar */}
      <div className="flex items-center justify-between mt-6 border-b border-gray-300 pb-2 relative">
        <div className="flex items-center gap-4">
          <button className="p-1 rounded-full hover:bg-gray-100">
            <ChevronLeft size={20} />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <ChevronRight size={20} />
          </button>

          <select
            className="bg-[#551FFF] text-white px-2 py-2  rounded-md text-sm md:text-base hover:bg-[#4513e0] transition cursor-pointer"
            value={filterType}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="all">Filter -</option>
            <option value="free">Free Entry</option>
            <option value="paid">Paid Entry</option>
          </select>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer relative"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <h2 className="text-xl md:text-2xl sm:m font-semibold">Upcoming</h2>
          <CalendarDays size={20} className="text-gray-600" />
          <span className="text-gray-500 text-lg">
            {showCalendar ? "▴" : "▾"}
          </span>

          {showCalendar && (
            <div className="absolute top-10 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2">
              <Calendar onChange={setSelectedDate} value={selectedDate} />
            </div>
          )}
        </div>
      </div>
      <section>
        {/* ✅ Events Grid Section */}
        <div className="mt-14 max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Events</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.length === 0 ? (
  // 🔄 Shimmer Loading Cards (4)
  [...Array(4)].map((_, i) => (
    <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-80"></div>
  ))
) : (
  events.map((event) => (
    <div
      key={event?._id}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer flex flex-col relative group"
      onClick={() => router.push(`/ticketdetails/${event?._id}`)}
    >
      {/* ❤️ Favorite icon */}
      {/* <button
        onClick={(e) => e.stopPropagation()}
        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow opacity-80 hover:opacity-100"
      >
        ❤️
      </button> */}

      <img
        src={
          event?.bannerImage ||
          event?.images?.[0] ||
          "/placeholder.png"
        }
        alt={event.title}
        className="w-full h-60 object-cover group-hover:scale-105 transition duration-300"
      />

      <div className="p-4 flex flex-col h-full">
        <p className="text-xs font-medium text-emerald-600 mb-1">
          {new Date(event?.startDate).toDateString()}
        </p>

        <h3 className="font-semibold text-[16px] leading-tight line-clamp-2 mb-1">
          {event.title}
        </h3>

        <p className="text-gray-500 text-sm">{event.venue}</p>

        <p className="text-[15px] font-semibold mt-2 text-gray-900">
          ₹{event?.tickets?.[0]?.price || "—"} onwards
        </p>

        {/* 🎟️ Buy Button Fixed Bottom */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/ticketdetails/${event._id}`);
          }}                                                                  
          className="bg-black text-white px-3 py-2 rounded-md text-sm font-semibold mt-auto group-hover:scale-105 transition duration-300 cursor-pointer"
        >
          Buy tickets
        </button>
      </div>
    </div>
  ))
)}

          </div>
        </div>
      </section>
    </section>
  );
};

export default EventPage;
