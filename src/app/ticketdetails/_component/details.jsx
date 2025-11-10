"use client";
import paymentApi from "@/api/payment.api";
import productApi from "@/api/product.api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "./popupmodel";
import ProductDetails from "../[eventId]/product";
import React from "react";

export default function EventDetailsPage({ event }) {
  const [qty, setQty] = useState(1);
  const [showOptions, setShowOptions] = useState(false);
  const [option, setOption] = useState("");
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  const handleAddProduct = (product) => {
    setSelectedProduct(product);
    setTotalPrice(qty * product.price);
  };

  const handleSelectClick = () => setOpen(false);

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

  const getTotalWithOption = () => {
    const ticketPrice = event?.tickets?.[0]?.price || 0;
    const productPrice = selectedProduct?.price || 0;
    return Math.round(qty * ticketPrice + qty * productPrice);
  };

  const handlePayment = async () => {
    const payload = {
      eventId: event?._id,
      productId: selectedProduct,
      quantity: qty,
      price: getTotalWithOption(),
    };

    try {
      const res = await paymentApi.createPayment(payload);
      if (!res || res?.status?.toLowerCase() !== "success") {
        return toast.error(res?.message || "Payment failed");
      }
      toast.success("Payment Successful");
      window.location.href = res.data.url;
    } catch (error) {
      console.log("Payment Error:", error);
      toast.error("Something went wrong ❌");
    }
  };

  const handleConfirm = () => {
    if (!selectedProduct) return toast("Please select a product");

    toast(`✅ Ticket Added\nOption: ${selectedProduct}\nQty: ${qty}`);
    setShowOptions(false);
    setOption("");
    handlePayment();
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
          <p>{formatEventTime(event?.startDate, event?.endDate)}</p>
          <p>
            PRICE :{" "}
            <span className="font-bold">
              &euro; {event?.tickets?.[0]?.price}
            </span>
          </p>
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

          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-5">TICKETS</h2>

          {/* Venue */}
          <p className="text-gray-600 text-xs sm:text-sm mb-2">
            <span className="font-bold">VENUE:</span> {event?.venue}
          </p>

          {/* Event Title + Price */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 sm:py-4 border-b gap-2 sm:gap-0">
            <p className="font-bold text-base sm:text-lg">{event?.title}</p>

            <p className="font-bold text-base sm:text-lg">
              &euro;{" "}
              {event?.eventType?.toLowerCase() === "paid"
                ? 0
                : event?.tickets?.[0]?.price}
            </p>
          </div>

          {/* ✅ Quantity Selector */}
          <div className="flex justify-between items-center py-4 sm:py-6">
            <p className="font-bold text-gray-700 text-sm sm:text-base">
              QUANTITY: {qty}
            </p>

            <div className="flex items-center gap-2 sm:gap-3">

              {/* Minus */}
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="border px-2 sm:px-3 py-1 rounded text-base sm:text-lg  transition cursor-pointer"
              >
                -
              </button>

              <span className="font-bold text-base sm:text-lg">{qty}</span>

              {/* Plus */}
              <button
                onClick={() => setQty(qty + 1)}
                className="border px-2 sm:px-3 py-1 rounded text-base sm:text-lg  transition cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* ✅ TOTAL + GET TICKETS BUTTON */}
          <div className="flex justify-between items-center pb-4 sm:pb-6 border-b">

            <p className="font-bold text-sm sm:text-base">
              TOTAL: &euro; {getTotalWithOption()}
            </p>

            {!showOptions ? (
              <button
                className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg font-semibold hover:bg-green-700 text-xs sm:text-sm  transition cursor-pointer"
                onClick={() => {
                  setOpen(true);
                  handleTicketClick();
                }}
              >
                GET TICKETS
              </button>
            ) : (
              <div className="flex flex-col gap-3 w-36 sm:w-48">
                
                {/* ✅ PRODUCT LIST POPUP */}
                <Modal isOpen={open} onClose={() => setOpen(false)}>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-black">
                    Select Product
                  </h2>

                  <div className="flex flex-col gap-3 sm:gap-4">

                    {products.map((item) => (
                      <ProductDetails
                        key={item._id}
                        product={item}
                        onAdd={() => handleAddProduct(item)}
                        onSelect={handleSelectClick}
                      />
                    ))}

                  </div>
                </Modal>

                {/* ✅ CONFIRM BUTTON */}
                <button
                  className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded font-bold hover:bg-green-700 text-xs sm:text-sm  transition cursor-pointer"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>
        {/* ✅ Ticket Details Sidebar */}
        <div className="
  bg-white shadow-md p-5 sm:p-8 rounded-lg 
  w-full                 
  lg:w-[360px]           
">

          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            TICKET DETAILS
          </h2>

          <div className="space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed">

            <p>
              <span className="font-bold">TIME:</span>{" "}
              {formatEventTime(event?.startDate, event?.endDate)}
            </p>

            <p>
              <span className="font-bold">COST:</span> &euro; {getTotalWithOption()}
            </p>

            <p>
              <span className="font-bold">EVENT CATEGORY:</span>{" "}
              {event?.category}
            </p>

          </div>
        </div>

      </section>
    </div>
  );
}

