"use client";
import paymentApi from "@/api/payment.api";
import productApi from "@/api/product.api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "./popupmodel";
import ProductDetails from "../[eventId]/product";
import React from "react";
import { getTokenLocal } from "@/utils/localStorage.util";
import { useSelector } from "react-redux";

// Enhanced MembershipPopup Modal
const MembershipPopup = ({ isOpen, onClose, onBuy }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-white via-gray-50 to-white p-10 sm:p-12 rounded-3xl shadow-2xl w-full max-w-2xl text-center transform transition-all animate-slideUp relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-30 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-30 -ml-20 -mb-20"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Icon */}
        <div className="relative mb-8 flex justify-center">
          <div className="bg-gradient-to-br from-green-100 to-blue-100 p-6 rounded-full">
            <svg
              className="w-16 h-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="relative text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Membership Required
        </h2>

        {/* Description */}
        <p className="relative text-base sm:text-lg text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto">
          To purchase event tickets and unlock exciting features, join Cricket
          Lovers Global today or sign in to continue.
        </p>

        {/* Buttons */}
        <div className="relative flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
          <button
            onClick={onBuy}
            className="group flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Buy Membership
          </button>

          <button
            onClick={() => (window.location.href = "/login")}
            className="group flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            Already Member
          </button>
        </div>

        {/* Helper Text */}
        <p className="relative mt-8 text-sm text-gray-500">
          Need help? Contact our support team
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default function EventDetailsPage(event) {
  console.log("event----------------", event, event?.event?.tickets);

  const [qty, setQty] = useState(1);
  const [showOptions, setShowOptions] = useState(false);
  const [option, setOption] = useState("");
  const [products, setProducts] = useState([]);
  // const [open, setOpen] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]); // { product, quantity }
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [getEvent, setGetEvent] = useState(null);
  const [ticketQuantities, setTicketQuantities] = useState({});
  const [showMembershipPopup, setShowMembershipPopup] = useState(false);
  const membershipActive = useSelector(
    (state) => state.user.userInfo?.showMembership
  );

  // helper: total tickets selected
  const totalTicketsSelected = Object.values(ticketQuantities).reduce(
    (s, v) => s + (Number(v) || 0),
    0
  );

  // helper: total selected product units
  const totalProductUnits = selectedProducts.reduce(
    (s, p) => s + (p.quantity || 0),
    0
  );

  const handleSelectClick = () => setOpen(false);

  // add a product (or increment its quantity). Enforce total units <= totalTicketsSelected
  const handleAddProduct = (product) => {
    if (totalTicketsSelected === 0) {
      return toast.error("Select tickets before adding products");
    }

    setSelectedProducts((prev) => {
      const idx = prev.findIndex((p) => p.product._id === product._id);

      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = {
          ...copy[idx],
          quantity: copy[idx].quantity + 1,
        };
        return copy;
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  // set product quantity (used by + / - controls)
  // const setProductQuantity = (productId, qty) => {
  //   const q = Math.max(0, Number(qty) || 0);
  //   // ensure not exceed ticket limit
  //   const otherUnits = selectedProducts.reduce(
  //     (s, p) => s + (p.product._id === productId ? 0 : p.quantity),
  //     0
  //   );
  //   const allowed = Math.max(0, totalTicketsSelected - otherUnits);
  //   const finalQty = Math.min(q, allowed);

  //   setSelectedProducts(
  //     (prev) =>
  //       prev
  //         .map((p) =>
  //           p.product._id === productId ? { ...p, quantity: finalQty } : p
  //         )
  //         .filter((p) => p.quantity > 0) // remove zero-qty
  //   );
  // };
  const setProductQuantity = (productId, qty) => {
    const finalQty = Math.max(0, Number(qty) || 0);

    setSelectedProducts((prev) =>
      prev
        .map((p) =>
          p.product._id === productId ? { ...p, quantity: finalQty } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const removeSelectedProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.filter((p) => p.product._id !== productId)
    );
  };

  const fetchProducts = async () => {
    try {
      const res = await productApi.getAllProducts();
      if (res.status?.toLowerCase() === "success") {
        setProducts(res.data);
      }
    } catch (error) {
      console.log("Product fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    setGetEvent(event?.event);
  }, [event]);
  // console.log("get by id of event data:", products, getEvent, ticketQuantities);

  // const getTotalWithOption = () => {
  //   const ticketPrice = event?.tickets?.[0]?.price || 0;
  //   const productPrice = selectedProduct?.price || 0;
  //   return Math.round(qty * ticketPrice + qty * productPrice);
  // };
  function getTotalWithOption() {
    let total = 0;

    // tickets
    getEvent?.tickets?.forEach((ticket) => {
      const qty = Number(ticketQuantities?.[ticket.type] || 0);
      total += (Number(ticket.price) || 0) * qty;
    });

    // products (use selectedProducts)
    selectedProducts.forEach(({ product, quantity }) => {
      total += (Number(product.price) || 0) * Number(quantity || 0);
    });

    return Number(total.toFixed(2));
  }

  const handleConfirm = () => {
    // const token = getTokenLocal();

    // if (!token) {
    //   toast("Please login to confirm your purchase.");
    //   window.location.href = "/login";
    //   return;
    // }
    if (!membershipActive) {
      setShowMembershipPopup(true);
      return;
    }
    if (totalProductUnits < totalTicketsSelected) {
      return toast.error(
        `Please select at least ${totalTicketsSelected} product(s).`
      );
    }

    if (totalTicketsSelected === 0)
      return toast.error("Select at least one ticket");

    // require that product units === tickets selected — change as needed

    // build products array
    const productsPayload = selectedProducts.map((p) => ({
      id: p.product._id,
      quantity: p.quantity,
    }));

    const payload = {
      eventId: getEvent?._id,
      products: productsPayload,
      ticketDetail: Object.keys(ticketQuantities).map((type) => ({
        type,
        quantity: Number(ticketQuantities[type] || 0),
      })),
    };

    // call payment
    handlePayment(payload);
  };

  const handlePayment = async (payload) => {
    try {
      const res = await paymentApi.createPayment(payload);
      if (!res || res?.status?.toLowerCase() !== "success") {
        return toast.error(res?.message);
      }
      window.location.href = res.data.url;
    } catch (error) {
      console.log("error --------", error);

      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong ";

      toast.error(backendMessage);
    }
  };

  const handleTicketClick = () => setShowOptions(true);

  function formatEventTime(startStr, endStr) {
    const start = new Date(startStr);
    const end = new Date(endStr);

    const date = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const startTime = start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

    const endTime = end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

    return `${date} @ ${startTime.toLowerCase()} - ${endTime.toLowerCase()}`;
  }
  useEffect(() => {
    if (getEvent?.tickets) {
      const initial = {};
      getEvent.tickets.forEach((t) => {
        initial[t.type] = 0;
      });
      setTicketQuantities(initial);
    }
  }, [getEvent]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Top Section (Responsive Text) */}
      <section className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-10 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide">
          EXPERIENCE THE THRILL LIVE IN THE STADIUM!
        </h1>

        <p className="text-gray-600 mt-2 text-xs sm:text-sm">
          GET YOUR TICKETS TO WATCH YOUR FAVORITE TEAM IN ACTION.
        </p>

        <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-8 text-sm sm:text-lg font-semibold">
          <p>{formatEventTime(getEvent?.startDate, getEvent?.endDate)}</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {getEvent?.tickets?.map((ticket, index) => (
              <p
                key={index}
                className="text-sm sm:text-base text-gray-800 flex items-center gap-1"
              >
                <span className="font-medium capitalize">
                  {ticket.type} Ticket Price:
                </span>

                <span className="font-bold text-green-700">
                  £{Number(ticket.price).toFixed(2)}
                </span>
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ How to Buy & Benefits */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 px-3 sm:px-4 py-8 sm:py-10">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">HOW TO BUY:</h2>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700">
            <li>✅ PURCHASE ONLINE THROUGH OUR OFFICIAL WEBSITE.</li>
            <li>✅ BUY FROM AUTHORIZED TICKETING PARTNERS.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            BENEFITS OF BUYING OFFICIAL TICKETS:
          </h2>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700">
            <li>✅ GUARANTEED ENTRY TO THE STADIUM.</li>
            <li>✅ ACCESS TO EXCLUSIVE FAN EVENTS.</li>
            <li>✅ PRIORITY FOR HIGH-DEMAND MATCHES AND FINALS.</li>
          </ul>
        </div>
      </section>
      {/* ✅ Tickets Section */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-3 sm:px-4 py-8 sm:py-10">
        {/* ✅ Ticket Card */}
        <div className="md:col-span-2 bg-white shadow-md p-4 sm:p-6 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-5">
            TICKETS
          </h2>

          {/* Venue */}
          <p className="text-gray-600 text-xs sm:text-sm mb-2">
            <span className="font-bold capitalize">VENUE:</span>
            {getEvent?.venue}
          </p>

          {/* Event Title + Price */}
          <div className="py-3 sm:py-4 ">
            {/* ✅ EVENT TITLE */}
            <div className="py-3 sm:py-4">
              {/* ✅ EVENT TITLE */}
              <p className="font-bold text-base sm:text-lg mb-2">
                {getEvent?.title}
              </p>

              {/* ✅ DYNAMIC TICKET TYPES */}
              <div className="flex flex-col gap-1 text-sm sm:text-base">
                {getEvent?.tickets?.length > 0 ? (
                  getEvent.tickets.map((ticket, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTicket(ticket)}
                      className={`
          flex justify-between items-center w-full p-2   
          transition 
          ${
            selectedTicket?.type === ticket.type
              ? "border-green-600 bg-green-50"
              : "border-gray-300 bg-white"
          }
        `}
                    >
                      <span className="font-medium capitalize text-gray-700">
                        {ticket.type} Ticket Price:
                      </span>

                      <span className="font-semibold text-green-700">
                        £{ticket.price}
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="text-green-600 font-semibold">Free Entry</p>
                )}
              </div>
            </div>
          </div>

          {/* ✅ Quantity Selector */}
          {/* <div className="flex justify-between items-center py-4 sm:py-6">
            <p className="font-bold text-gray-700 text-sm sm:text-base">
              ADULT QUANTITY: {event?.event[0]?.quantity || qty}
            </p>

            <div className="flex items-center gap-2 sm:gap-3">
              
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="border px-2 sm:px-3 py-1 rounded text-base sm:text-lg  transition cursor-pointer"
              >
                -
              </button>

              <span className="font-bold text-base sm:text-lg">{qty}</span>

              
              <button
                onClick={() => setQty(qty + 1)}
                className="border px-2 sm:px-3 py-1 rounded text-base sm:text-lg  transition cursor-pointer"
              >
                +
              </button>
            </div>
          </div> */}
          <div className="flex flex-col gap-4 py-4 sm:py-6">
            {getEvent?.tickets?.map((ticket, index) => {
              const isChild = ticket.type.toLowerCase().includes("child");
              const adultTickets = Object.keys(ticketQuantities).reduce(
                (sum, type) => {
                  if (!type.toLowerCase().includes("child")) {
                    return sum + (ticketQuantities[type] || 0);
                  }
                  return sum;
                },
                0
              );
              const isChildDisabled = isChild && adultTickets === 0;

              return (
                <div
                  key={index}
                  className={`flex flex-col p-3 bg-white shadow-sm rounded-lg border ${
                    isChildDisabled
                      ? "border-yellow-300 bg-yellow-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    {/* ✅ LEFT SIDE TEXT */}
                    <div className="flex flex-col">
                      <p className="font-bold text-gray-700 text-sm sm:text-base uppercase">
                        {ticket.type} QUANTITY:
                      </p>

                      {/* <p className="text-xs sm:text-sm text-gray-500">
                        Available: {ticket.quantity}
                      </p> */}
                    </div>

                    {/* ✅ RIGHT SIDE QTY SELECTOR */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      {/* Minus */}
                      <button
                        onClick={() =>
                          setTicketQuantities((prev) => ({
                            ...prev,
                            [ticket.type]: Math.max(
                              0,
                              (prev[ticket.type] || 0) - 1
                            ),
                          }))
                        }
                        disabled={isChildDisabled}
                        className={`border px-2 sm:px-3 py-1 rounded text-base sm:text-lg transition ${
                          isChildDisabled
                            ? "opacity-40 cursor-not-allowed"
                            : "cursor-pointer hover:bg-gray-100"
                        }`}
                      >
                        -
                      </button>

                      {/* Current Quantity */}
                      <span className="font-bold text-base sm:text-lg">
                        {ticketQuantities?.[ticket.type] || 0}
                      </span>

                      {/* Plus */}
                      <button
                        onClick={() =>
                          setTicketQuantities((prev) => ({
                            ...prev,
                            [ticket.type]:
                              (prev[ticket.type] || 0) < ticket.quantity
                                ? (prev[ticket.type] || 0) + 1
                                : prev[ticket.type],
                          }))
                        }
                        className={`border px-2 sm:px-3 py-1 rounded text-base sm:text-lg transition 
        ${
          (ticketQuantities?.[ticket.type] || 0) >= ticket.quantity ||
          isChildDisabled
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-100"
        }`}
                        disabled={
                          (ticketQuantities?.[ticket.type] || 0) >=
                            ticket.quantity || isChildDisabled
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* ✅ CHILD AGE NOTE */}
                  {isChild && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <div className="flex items-start gap-2">
                        <svg
                          className="w-4 h-4 text-blue-600 mt-0 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div className="text-xs text-gray-600">
                          <p className="font-semibold text-blue-700">
                            Note: Child age should be under 16
                          </p>
                          {isChildDisabled && (
                            <p className="text-yellow-700 font-medium mt-1">
                              ⚠️ Please select adult tickets first
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ✅ PRODUCT SECTION (improved UI) */}
          <div className="mt-4">
            {/* Header: progress + summary */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="text-sm font-semibold">Products</div>

                <div className="text-xs text-gray-600">
                  <span className="font-bold">{totalProductUnits}</span> /{" "}
                  <span className="font-medium">{totalTicketsSelected}</span>{" "}
                  tickets
                </div>
              </div>

              {/* small progress bar */}
              <div className="w-full sm:w-64">
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-500 transition-all"
                    style={{
                      width:
                        totalTicketsSelected === 0
                          ? "0%"
                          : `${Math.min(
                              (totalProductUnits / totalTicketsSelected) * 100,
                              100
                            )}%`,
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* If no products selected -> empty state */}
            {selectedProducts.length === 0 && (
              <div className="w-full sm:w-2/3 p-4 border rounded-2xl bg-gradient-to-t from-white to-gray-50 shadow-sm flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 text-sm text-gray-700">
                  <div className="font-semibold mb-1">
                    No products added yet
                  </div>
                  <p className="text-xs text-gray-500">
                    Add a product for each ticket — you can choose the same
                    product multiple times.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (totalTicketsSelected === 0)
                        return toast.error("Select tickets first");
                      setOpen(true);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-green-700 transition"
                  >
                    Add Product
                  </button>

                  <button
                    onClick={() => {
                      // quick open to product modal without errors
                      setOpen(true);
                    }}
                    className="bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs hover:shadow transition"
                  >
                    Browse
                  </button>
                </div>
              </div>
            )}

            {/* Selected products list */}
            {selectedProducts.length > 0 && (
              <div className="flex flex-col gap-3 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProducts.map(({ product, quantity }) => {
                    const lineTotal = (
                      (Number(product.price) || 0) * (Number(quantity) || 0)
                    ).toFixed(2);
                    return (
                      <div
                        key={product._id}
                        className="p-3 border rounded-2xl bg-white shadow-sm flex items-center gap-3"
                        role="group"
                        aria-label={`${product.name} selected`}
                      >
                        <img
                          src={product.coverImage}
                          alt={product.name}
                          className="w-14 h-14 rounded-lg object-cover border"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <div className="truncate">
                              <p className="text-sm font-semibold truncate">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {product.category || product.brandName}
                              </p>
                            </div>

                            <div className="text-right">
                              <p className="text-sm font-semibold">
                                £{Number(product.price).toFixed(2)}
                              </p>
                              <p className="text-xs text-gray-400">
                                £{Number(lineTotal).toFixed(2)}
                              </p>
                            </div>
                          </div>

                          {/* quantity controls */}
                          <div className="mt-3 flex items-center gap-2">
                            <button
                              aria-label={`Decrease quantity for ${product.name}`}
                              onClick={() =>
                                setProductQuantity(
                                  product._id,
                                  Math.max(0, quantity - 1)
                                )
                              }
                              className="w-8 h-8 grid place-items-center rounded-md border hover:bg-gray-50 transition"
                            >
                              −
                            </button>

                            {/* editable quantity input for keyboard users */}
                            <input
                              type="number"
                              aria-label={`Quantity for ${product.name}`}
                              value={quantity}
                              min={0}
                              max={totalTicketsSelected}
                              onChange={(e) => {
                                const v = Math.max(
                                  0,
                                  Number(e.target.value) || 0
                                );
                                setProductQuantity(product._id, v);
                              }}
                              className="w-16 h-8 text-center rounded-md border px-2 py-1 text-sm"
                            />

                            <button
                              aria-label={`Increase quantity for ${product.name}`}
                              onClick={() =>
                                setProductQuantity(product._id, quantity + 1)
                              }
                              className="w-8 h-8 grid place-items-center rounded-md border hover:bg-gray-50 transition"
                            >
                              +
                            </button>

                            <button
                              onClick={() => removeSelectedProduct(product._id)}
                              className="ml-2 text-red-600 text-xs hover:underline"
                              aria-label={`Remove ${product.name}`}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Actions: change/add more, clear, total per products */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setOpen(true)}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-blue-700 transition"
                    >
                      Change / Add more
                    </button>

                    <button
                      onClick={() => setSelectedProducts([])}
                      className="bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-red-700 transition"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="text-sm font-semibold">
                    Products total: £
                    {selectedProducts
                      .reduce(
                        (s, p) =>
                          s +
                          (Number(p.product.price) || 0) *
                            (Number(p.quantity) || 0),
                        0
                      )
                      .toFixed(2)}
                  </div>
                </div>
              </div>
            )}

            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-black">
                  Select Product
                </h2>

                {/* Close button INSIDE header */}
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-600 hover:text-black text-xl"
                >
                  ✖
                </button>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4 max-h-[60vh] overflow-auto">
                {products.map((item) => (
                  <ProductDetails
                    key={item._id}
                    product={item}
                    onAdd={() => handleAddProduct(item)}
                  />
                ))}
              </div>
            </Modal>
          </div>

          {/* ✅ TOTAL + GET TICKETS BUTTON (responsive) */}
          <div className="w-full mt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 sm:pb-6 border-b">
              {/* LEFT: Total */}
              <div className="flex items-baseline gap-3 min-w-0">
                <p className="font-bold text-sm sm:text-base truncate">
                  TOTAL: £ {getTotalWithOption().toFixed(2)}
                </p>

                {/* mobile-only helper: products progress shown inline under total on smallest screens */}
                <div className="sm:hidden text-xs text-gray-600">
                  <span className="font-semibold">{totalProductUnits}</span> /{" "}
                  <span className="font-semibold">{totalTicketsSelected}</span>{" "}
                  products
                </div>
              </div>

              {/* RIGHT: Actions (stack on mobile, row on tablet+) */}
              <div className="w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
                  {/* Progress + Add Product (on larger screens show inline; on mobile this becomes first full-width button) */}
                  <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
                    {/* Progress pill (hidden on smallest screens since we show it under total) */}
                    <div className="hidden sm:inline-flex items-center gap-2 text-xs text-gray-700 bg-gray-50 border rounded-full px-3 py-1">
                      <span>Products</span>
                      <span className="font-bold">{totalProductUnits}</span>
                      <span>/</span>
                      <span className="font-bold">{totalTicketsSelected}</span>
                    </div>

                    {/* Add Product (primary action) */}
                    {totalProductUnits < totalTicketsSelected && (
                      <button
                        className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 text-xs sm:text-sm transition"
                        onClick={() => {
                          setOpen(true);
                          handleTicketClick();
                        }}
                        aria-label="Add product"
                      >
                        Add Product
                      </button>
                    )}

                    {/* if no slots and 0 tickets, show disabled CTA */}
                    {totalTicketsSelected === 0 && (
                      <button
                        className="w-full sm:w-auto bg-gray-200 text-gray-600 px-4 py-2 rounded-md text-xs sm:text-sm"
                        disabled
                        aria-disabled
                      >
                        Select tickets first
                      </button>
                    )}
                  </div>

                  {/* Confirm + Change (shown only when there are selected products) */}
                  {selectedProducts.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                      {/* Open product modal / change */}
                      <button
                        onClick={() => setOpen(true)}
                        className="w-full sm:w-auto bg-white border border-gray-200 text-gray-800 px-3 py-2 rounded-md text-xs sm:text-sm hover:shadow-sm transition"
                        aria-label="Change or add more products"
                      >
                        Change / Add more
                      </button>

                      {/* Confirm: green, disabled until units match tickets */}
                      {/* <button
                        className={`w-full sm:w-auto px-3 py-2 rounded-md font-bold text-xs sm:text-sm transition
                ${totalProductUnits === totalTicketsSelected
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-green-200 text-green-800 opacity-80 cursor-not-allowed"
                          }`}
                        onClick={handleConfirm}
disabled={totalProductUnits < totalTicketsSelected}
aria-disabled={totalProductUnits < totalTicketsSelected}

                      >
                        Confirm
                      </button> */}
                      <button
                        className={`w-full sm:w-auto px-3 py-2 rounded-md font-bold text-xs sm:text-sm transition
    ${
      totalTicketsSelected > 0 && totalProductUnits >= totalTicketsSelected
        ? "bg-green-600 text-white hover:bg-green-700"
        : "bg-green-200 text-green-800 opacity-80 cursor-not-allowed"
    }`}
                        onClick={handleConfirm}
                        disabled={
                          totalTicketsSelected === 0 ||
                          totalProductUnits < totalTicketsSelected
                        }
                        aria-disabled={
                          totalTicketsSelected === 0 ||
                          totalProductUnits > totalTicketsSelected
                        }
                      >
                        Confirm
                      </button>
                    </div>
                  )}
                </div>

                {/* MODAL kept inside same block so markup is nearby — modal content unchanged */}
                <Modal isOpen={open} onClose={() => setOpen(false)}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-black">
                      Select Product
                    </h2>

                    {/* Close button INSIDE header */}
                    <button
                      onClick={() => setOpen(false)}
                      className="text-gray-600 cursor-pointer hover:text-black text-xl"
                    >
                      ✖
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 sm:gap-4 max-h-[60vh] overflow-auto">
                    {products.map((item) => (
                      <ProductDetails
                        key={item._id}
                        product={item}
                        onAdd={() => {
                          handleAddProduct(item);
                          // keep modal open to add multiple
                        }}
                      />
                    ))}
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
        {/* ✅ Ticket Details Sidebar */}
        <div
          className="
          bg-white shadow-md p-5 sm:p-8 rounded-lg 
          w-full                 
          lg:w-[360px]           
        "
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            TICKET DETAILS
          </h2>

          <div className="space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed">
            <p>
              <span className="font-bold">TIME:</span>{" "}
              {formatEventTime(getEvent?.startDate, getEvent?.endDate)}
            </p>

            <p>
              <span className="font-bold">COST:</span> £{" "}
              {getTotalWithOption().toFixed(2)}
            </p>

            <p>
              <span className="font-bold">EVENT CATEGORY:</span>{" "}
              {getEvent?.category}
            </p>
          </div>
        </div>
        <MembershipPopup
          isOpen={showMembershipPopup}
          onClose={() => setShowMembershipPopup(false)}
          onBuy={() => (window.location.href = "/membership")}
        />
      </section>
    </div>
  );
}
