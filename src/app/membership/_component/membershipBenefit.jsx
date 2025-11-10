"use client";
import React, { useRef, useEffect } from "react";
import {
  Newspaper,
  Shirt,
  Tag,
  Users,
  Baby,
  KeyRound,
  Ticket,
  Camera,
  Star,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { Imgabout, Imgmembership } from "@/shared/images";

const blogs = [
  {
    icon: <Ticket size={28} />,
    title: "Ticket Priority",
    desc: "Including international matches from the allocation received by Cricket Lovers Global",
    img: Imgabout.imgVision2,
  },
  {
    icon: <Shirt size={28} />,
    title: "CLG Merchandise",
    desc: "At a preferential rate",
    img: Imgabout.imgVision1,
  },
  {
    icon: <Tag size={28} />,
    title: "Discounts",
    desc: "Preferential rates on partner vendor products",
    img: Imgabout.imgVision2,
  },
  {
    icon: <Users size={28} />,
    title: "Annual Meetings",
    desc: "Entry to Cricket Lovers Global Annual Meet",
    img: Imgabout.imgVision1,
  },
  {
    icon: <Baby size={28} />,
    title: "Junior Meets",
    desc: "Entry to the Annual Junior Meets",
    img: Imgabout.imgVision2,
  },
  {
    icon: <KeyRound size={28} />,
    title: "Member Access",
    desc: "Dedicated CLG member area access on website",
    img: Imgabout.imgVision1,
  },
  {
    icon: <Camera size={28} />,
    title: "Experiences",
    desc: "Ability to participate in online/virtual events and watch matches in the company of fellow fans",
    img: Imgabout.imgVision2,
  },
  {
    icon: <Star size={28} />,
    title: "Up Close",
    desc: "Opportunity to meet your favourite cricket icons.",
    img: Imgabout.imgVision2,
  },
  {
    icon: <Newspaper size={28} />,
    title: "Newsletter",
    desc: "Stay updated with the latest cricket news and announcements.",
    img: Imgabout.imgVision1,
  },
  {
    icon: <Shirt size={28} />,
    title: "Member Content",
    desc: "Get access to premium member-only content, behind-the-scenes stories, and exclusive cricket insights.",
    img: Imgabout.imgVision2,
  },
  {
    icon: <Users size={28} />,
    title: "Competition Entry",
    desc: "Participate in fun challenges, prediction contests, and exciting competitions to win amazing prizes.",
    img: Imgabout.imgVision1,
  },
  {
    icon: <Plus size={28} />,
    title: "More to Come",
    desc: "We’re just getting started! Stay tuned for more exciting member benefits and upcoming features.",
    img: Imgabout.imgVision2,
  },
];

const MembershipBenefit = () => {
  // const blogs = [
  //   { icon: <Ticket size={28} />,
  //     title: "Ticket Priority",
  //     date: "January 8, 2025",
  //     category: "Training Tips",
  //     img: Imgabout.imgVision2,
  //   },
  //   {
  //     title: "Perfect Your Swing Technique",
  //     date: "April 4, 2025",
  //     category: "Training Tips",
  //     img: Imgabout.imgVision2,
  //   },
  //   {
  //     title: "Smarter Strategy, Better Wins",
  //     date: "May 6, 2025",
  //     category: "Training Tips",
  //     img: Imgabout.imgVision1,
  //   },
  //   {
  //     title: "Smarter Strategy, Better Wins",
  //     date: "May 6, 2025",
  //     category: "Training Tips",
  //     img: Imgabout.imgVision2,
  //   },
  //   {
  //     title: "Smarter Strategy, Better Wins",
  //     date: "May 6, 2025",
  //     category: "Training Tips",
  //     img: Imgabout.imgVision1,
  //   },
  //   {
  //     title: "Smarter Strategy, Better Wins",
  //     date: "May 6, 2025",
  //     category: "Training Tips",
  //     img: Imgabout.imgVision2,
  //   },
  //   {
  //     title: "Smarter Strategy, Better Wins",
  //     date: "May 6, 2025",
  //     category: "Training Tips",
  //     img: Imgabout.imgVision1,
  //   },
  //   {
  //     title: "Smarter Strategy, Better Wins",
  //     date: "May 6, 2025",
  //     category: "Training Tips",
  //     img: Imgabout.imgVision2,
  //   },
  //   {
  //     title: "Smarter Strategy, Better Wins",
  //     date: "May 6, 2025",
  //     category: "Training Tips",
  //     img: Imgabout.imgVision1,
  //   }
  // ];
  const scrollRef = useRef(null);

  //  Auto Slide Logic
  useEffect(() => {
    const container = scrollRef.current;
    let scrollAmount = 0;

    const interval = setInterval(() => {
      if (!container) return;

      scrollAmount += 320; // Card width + gap
      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });

      if (scrollAmount >= container.scrollWidth - container.clientWidth) {
        scrollAmount = 0;
        setTimeout(() => {
          container.scrollTo({ left: 0, behavior: "smooth" });
        }, 0.6);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section>
      {/* section slider  */}
      <section
        className="bg-white-50
 py-12 sm:py-14 md:py-16 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col gap-10 sm:gap-10"
      >
        {/* Header */}
        <div className="text-center sm:text-left mb-6 sm:mb-10 max-w-3xl mx-auto sm:mx-0">
          <p className="text-[#4154f1] font-semibold uppercase tracking-wider text-base sm:text-lg md:text-xl">
            Membership Benefits
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#0b1441] mt-2">
            What you can expect when <br className="hidden md:block" />
            you join us
          </h2>
        </div>
      </section>
      <section className="py-10">
        <div
  ref={scrollRef}
  className="
    flex 
    gap-6 
    overflow-x-auto 
    no-scrollbar 
    scroll-smooth 
    snap-x 
    snap-mandatory
    px-4
  "
>
  {blogs.map((item, idx) => (
    <div
      key={idx}
      className="
        flex-shrink-0
        w-[90%]          /* ✅ MOBILE: exact 1 card visible */
        sm:w-[300px]
        mx-auto           /* ✅ ALWAYS CENTER IN VIEWPORT */
        bg-gradient-to-t from-[#e8ebf0] to-[#f3f5f8]
        rounded-3xl 
        border border-gray-300 
        shadow-sm 
        snap-center        /* ✅ CENTER LOCK */
        transition duration-300
        overflow-hidden 
        cursor-pointer 
        hover:shadow-lg
      "
    >
      {/* Image */}
      <div className="h-[180px] w-full relative">
        <Image
          src={item.img}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-gray-500 text-[13px] mb-2">{item.desc}</p>
        <h3 className="text-xl font-bold leading-snug">
          {item.title} {item.icon}
        </h3>
      </div>
    </div>
  ))}
</div>


      </section>
    </section>
  );
};

export default MembershipBenefit;
