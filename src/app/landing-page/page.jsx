"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import "./landing.css";

const LandingPage = () => {
  const router = useRouter();

  const flagBalls = [
    { name: "zimbabwe", code: "zw", duration: 8 },
    { name: "bangladesh", code: "bd", duration: 9 },
    { name: "sri lanka", code: "lk", duration: 10 },
    { name: "pakistan", code: "pk", duration: 7 },
    { name: "india", code: "in", duration: 11 },
    { name: "england", code: "gb-eng", duration: 8.5 },
    { name: "australia", code: "au", duration: 9.5 },
    { name: "new zealand", code: "nz", duration: 10.5 },
    { name: "south africa", code: "za", duration: 7.5 },
    { name: "west indies", code: "bd", duration: 11.5 },
    { name: "ireland", code: "ie", duration: 8 },
    { name: "afghanistan", code: "af", duration: 9 },
  ];

  // Generate random path for each ball - full viewport coverage
  const generateRandomPath = (ballIndex) => {
    const numPoints = 8;
    const positions = [];
    const seed = ballIndex * 137.508;
    
    // Safe viewport coverage accounting for ball size
    const minPos = 0;
    const maxPos = 88;
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (seed + i * 360 / numPoints) % 360;
      const radiusX = 45 + (Math.sin(ballIndex + i) * 25);
      const radiusY = 45 + (Math.cos(ballIndex + i) * 25);
      
      const x = 50 + radiusX * Math.cos((angle * Math.PI) / 180);
      const y = 50 + radiusY * Math.sin((angle * Math.PI) / 180);
      
      positions.push({
        x: Math.max(minPos, Math.min(maxPos, x)),
        y: Math.max(minPos, Math.min(maxPos, y)),
      });
    }
    
    positions.push(positions[0]);
    return positions;
  };

  return (
    <section className="landing-page-container">
      {/* Ping Pong Bouncing Balls - Random Paths */}
      {flagBalls.map((ball, index) => {
        const path = generateRandomPath(index);

        return (
          <motion.div
            key={ball.code}
            className="flag-ball"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.6, delay: index * 0.1 },
              scale: { duration: 0.6, delay: index * 0.1 },
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <motion.div
              animate={{
                x: path.map(pos => `${pos.x}vw`),
                y: path.map(pos => `${pos.y}vh`),
              }}
              transition={{
                duration: ball.duration,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.2,
              }}
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              <div className="flag-ball-wrapper ">
                <img
                  src={`/assets/flags/${ball.code}.png`}
                  alt={ball.name}
                  className="flag-ball-image bg-white"
                />
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Center Content */}
      <div className="central-content">
        <motion.div
          className="logo-section"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/assets/Logo.png"
            alt="Cricket Lovers Global"
            className="main-logo"
          />
        </motion.div>

        <motion.div
          className="button-group"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button className="btn-primary" onClick={() => router.push("/")}>
            VISIT WEBSITE
          </button>
          <button
            className="btn-secondary"
            onClick={() => router.push("/membership")}
          >
            SIGN UP FOR A MEMBERSHIP
          </button>
          <button
            className="btn-secondary"
            onClick={() => router.push("/events")}
          >
              JOIN EVENT 
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingPage;