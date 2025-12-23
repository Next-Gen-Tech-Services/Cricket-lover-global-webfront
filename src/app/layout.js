"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { usePathname } from "next/navigation";
import Footer from "./_layout/footer";
import Navbar from "./_layout/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider, useSelector } from "react-redux";
import { store } from "@/redux/redux-store/store";
import { OrganizationSchema, WebsiteSchema } from "@/component/StructuredData";


/* 🔔 POPUP ADD */
import { useEffect, useState } from "react";
import { getProfileCompletion } from "@/utils/profileCompletion.util";
import ProfileReminderPopup from "./popup/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/*  Wrapper needed because useSelector must be inside Provider */
function LayoutWithPopup({ children, hideNavFooter }) {
  const pathname = usePathname(); //  ADD THIS LINE
  const [showPopup, setShowPopup] = useState(false);

const userData = useSelector((state) => state.user.userInfo);
const token = useSelector((state) => state.user.token);
const isLoggedIn = !!(token && userData);




  useEffect(() => {
  //  Not logged in → never show popup
  if (!isLoggedIn) {
    setShowPopup(false);
    return;
  }

  //  Auth / profile pages → never show
  if (
    hideNavFooter ||
    pathname === "/profile" ||
    pathname === "/logout"
  ) {
    setShowPopup(false);
    return;
  }

  const { percent } = getProfileCompletion(userData);

  setShowPopup(percent < 80);
}, [isLoggedIn, userData, pathname, hideNavFooter]);



  const handleClose = () => {
  setShowPopup(false);
};


  // const percent = getProfileCompletion(userData).percent;
const percent =
  isLoggedIn ? getProfileCompletion(userData).percent : 0;


  return (
    <>
      {!hideNavFooter && <Navbar />}

      <main>
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </main>

      {!hideNavFooter && <Footer />}

      {/* 🔔 PROFILE REMINDER POPUP */}
      <ProfileReminderPopup
  isOpen={showPopup}
  onClose={handleClose}
  percent={percent}
/>

    </>
  );
}

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavFooter =
    pathname === "/login" || pathname === "/signup" || pathname === "/success";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={`https://www.cricketloversglobal.com${pathname}`} />
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <LayoutWithPopup hideNavFooter={hideNavFooter}>
            {children}
          </LayoutWithPopup>
        </Provider>
      </body>
    </html>
  );
}
