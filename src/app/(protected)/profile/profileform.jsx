// "use client";

// import React, { useState, useEffect } from "react";
// import authInstance from "@/api/auth/auth.api";
// import { getUserLocal, setUserLocal } from "@/utils/localStorage.util";
// import { toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// export default function ProfileForm() {
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     contact: "",
//     favouriteTeam: "",
//     nationality: "",
//     gender: "",
//     dateOfBirth: "",
//     address: "",
//     postcode: "",
//     avatarUrl: "",
//   });

//   // Team → Nationality mapping (AUTO SET)
//   const TEAM_TO_NATIONALITY = {
//     India: "🇮🇳 Indian",
//     England: "🇬🇧 British",
//     Australia: "🇦🇺 Australian",
//     Pakistan: "🇵🇰 Pakistani",
//     "South Africa": "🇿🇦 South African",
//     "New Zealand": "🇳🇿 New Zealander",
//     "Sri Lanka": "🇱🇰 Sri Lankan",
//     "West Indies": "🌴 West Indian",
//   };

//   const TEAMS = [
//     "India",
//     "England",
//     "Australia",
//     "Pakistan",
//     "South Africa",
//     "New Zealand",
//     "Sri Lanka",
//     "West Indies",
//   ];

//   const NATIONALITIES = [
//     "🇮🇳 Indian",
//     "🇬🇧 British",
//     "🇦🇺 Australian",
//     "🇵🇰 Pakistani",
//     "🇿🇦 South African",
//     "🇳🇿 New Zealander",
//     "🇱🇰 Sri Lankan",
//     "🌍 Other",
//   ];

//   useEffect(() => {
//     const user = getUserLocal();
//     if (user) {
//       setFormData({
//         firstName: user.firstName || "",
//         lastName: user.lastName || "",
//         email: user.email || "",
//         contact: user.contact || "",
//         favouriteTeam: user.favouriteTeam || "",
//         nationality: user.nationality || "",
//         gender: user.gender || "",
//         dateOfBirth: user.dateOfBirth?.split("T")[0] || "",
//         address: user.address || "",
//         postcode: user.postcode || "",
//         avatarUrl: user.profileImage || user.avatarUrl || "",
//       });
//     }
//     setTimeout(() => setLoading(false), 600);
//   }, []);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await authInstance.profileUpdate(formData);
//       if (res?.data?.user) setUserLocal(res.data.user);
//       toast(" Profile Updated Successfully");
//     } catch (err) {
//       toast("❌ Something went wrong");
//     }
//   };

//   // Shimmer loading
//   if (loading) {
//     return (
//       <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-6">
//         {[...Array(8)].map((_, i) => (
//           <div key={i} className="h-10 bg-gray-200 rounded-md"></div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="grid grid-cols-1 md:grid-cols-2 gap-6"
//     >
//       {Object.keys(formData)
//         .filter((key) => key !== "avatarUrl")
//         .map((key, i) => (
//           <div key={i} className="flex flex-col">
//             <label className="text-sm text-gray-600 font-medium mb-1 capitalize">
//   {key === "contact"
//     ? "Phone Number"
//     : key === "postcode"
//     ? "Postcode / Pincode / Zipcode"
//     : key.replace(/([A-Z])/g, " $1")}
// </label>


//             {/* DATE PICKER */}
//             {key === "dateOfBirth" ? (
//               <DatePicker
//                 selected={
//                   formData.dateOfBirth
//                     ? new Date(formData.dateOfBirth)
//                     : null
//                 }
//                 onChange={(date) =>
//                   handleChange({
//                     target: {
//                       name: "dateOfBirth",
//                       value: date.toISOString(),
//                     },
//                   })
//                 }
//                 className="w-full border border-gray-200 bg-gray-50 rounded-md px-3 py-2
//                 text-xs md:text-sm focus:ring-2 focus:ring-[#3E63DD] outline-none"
//                 dateFormat="dd / MM / yyyy"
//               />
//             ) : key === "favouriteTeam" ? (
//               // ⭐ Favourite Team (AUTO nationality)
//               <select
//                 name="favouriteTeam"
//                 value={formData.favouriteTeam}
//                 onChange={(e) => {
//                   const team = e.target.value;
//                   setFormData((prev) => ({
//                     ...prev,
//                     favouriteTeam: team,
//                     nationality:
//                       prev.nationality ||
//                       TEAM_TO_NATIONALITY[team] ||
//                       "",
//                   }));
//                 }}
//                 className="border border-gray-200 bg-gray-50 rounded-md px-3 py-2
//                 text-xs md:text-sm focus:ring-2 focus:ring-[#3E63DD] outline-none"
//               >
//                 <option value="">Select Team</option>
//                 {TEAMS.map((team) => (
//                   <option key={team} value={team}>
//                     {team}
//                   </option>
//                 ))}
//               </select>
//             ) : key === "nationality" ? (
//               // 🌍 Nationality
//               <select
//                 name="nationality"
//                 value={formData.nationality}
//                 onChange={handleChange}
//                 required
//                 className="border border-gray-200 bg-gray-50 rounded-md px-3 py-2
//                 text-xs md:text-sm focus:ring-2 focus:ring-[#3E63DD] outline-none"
//               >
//                 <option value="">Select Nationality</option>
//                 {NATIONALITIES.map((nation) => (
//                   <option key={nation} value={nation}>
//                     {nation}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               // DEFAULT INPUT
//               <input
//                 type="text"
//                 name={key}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 required
//                 className="border border-gray-200 bg-gray-50 rounded-md px-3 py-2
//                 text-xs md:text-sm focus:ring-2 focus:ring-[#3E63DD] outline-none"
//               />
//             )}
//           </div>
//         ))}

//       {/* Submit */}
//       <button
//         type="submit"
//         className="col-span-1 md:col-span-2 bg-[#00a63e] hover:bg-[#26b95c]
//         text-white py-3 rounded-xl font-semibold w-full shadow-lg transition
//         active:scale-95"
//       >
//         Save Changes
//       </button>
//     </form>
//   );
// }







"use client";

import React, { useState, useEffect } from "react";
import authInstance from "@/api/auth/auth.api";
import { getUserLocal, setUserLocal } from "@/utils/localStorage.util";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ProfileForm() {
  const [loading, setLoading] = useState(true);
  const [fetchingAddress, setFetchingAddress] = useState(false);
  const [availableAddresses, setAvailableAddresses] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    favouriteTeam: "",
    nationality: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    postcode: "",
    avatarUrl: "",
  });

  const TEAM_TO_NATIONALITY = {
    
    England: "🇬🇧 British",
    India: "🇮🇳 Indian",
    Australia: "🇦🇺 Australian",
    Pakistan: "🇵🇰 Pakistani",
    "South Africa": "🇿🇦 South African",
    "New Zealand": "🇳🇿 New Zealander",
    "Sri Lanka": "🇱🇰 Sri Lankan",
    "West Indies": "🌴 West Indian",
  };

  const TEAMS = Object.keys(TEAM_TO_NATIONALITY);

  const NATIONALITIES = [
   
    "🇬🇧 British",
     "🇮🇳 Indian",
    "🇦🇺 Australian",
    "🇵🇰 Pakistani",
    "🇿🇦 South African",
    "🇳🇿 New Zealander",
    "🇱🇰 Sri Lankan",
    "🌍 Other",
  ];

  useEffect(() => {
    const user = getUserLocal();
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        contact: user.contact || "",
        favouriteTeam: user.favouriteTeam || "",
        nationality: user.nationality || "",
        gender: user.gender || "",
        dateOfBirth: user.dateOfBirth || "",
        address: user.address || "",
        postcode: user.postcode || "",
        avatarUrl: user.avatarUrl || user.profileImage || "",
      });
    }
    setTimeout(() => setLoading(false), 600);
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePostcodeChange = async (e) => {
    const postcode = e.target.value;
    setFormData({ ...formData, postcode });

    if (postcode.length >= 5) {
      setFetchingAddress(true);
      try {
        // Using Ideal Postcodes API for detailed house addresses
        const response = await fetch(
          `https://api.ideal-postcodes.co.uk/v1/postcodes/${postcode.replace(/\s/g, "")}?api_key=ak_test`
        );

        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);
          
          if (data.result && data.result.length > 0) {
            // Format addresses with house number, street, locality, town
            const addresses = data.result.map((addr) => {
              const parts = [
                addr.line_1,
                addr.line_2,
                addr.line_3,
                addr.post_town,
                addr.postcode
              ].filter(part => part);
              return parts.join(', ');
            });
            setAvailableAddresses(addresses);
            // toast("✅ Found " + addresses.length + " addresses");
          } else {
            setAvailableAddresses([]);
            // toast("⚠️ No addresses found for this postcode");
          }
        } else {
          const errorData = await response.json();
          console.error('API Error:', response.status, errorData);
          setAvailableAddresses([]);
          // toast(`⚠️ ${errorData.message || 'Postcode not found'}`);
        }
      } catch (error) {
        console.error('Fetch Error:', error);
        setAvailableAddresses([]);
        // toast("⚠️ Could not fetch addresses");
      } finally {
        setFetchingAddress(false);
      }
    } else {
      setAvailableAddresses([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ❌ Exclude avatarUrl from submit
      const { avatarUrl, ...payload } = formData;

      const res = await authInstance.profileUpdate(payload);

      if (res?.data?.user) {
        const oldUser = getUserLocal();

        setUserLocal({
          ...oldUser,
          ...res.data.user,
          avatarUrl: oldUser?.avatarUrl,
          profileImage: oldUser?.profileImage,
        });
      }

      toast(" Profile Updated Successfully");
    } catch (err) {
      toast("❌ Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded-md"></div>
        ))}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {Object.keys(formData)
        .filter((key) => key !== "avatarUrl")
        .map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm text-gray-600 font-medium mb-1 capitalize">
              {key === "nationality" ? "Country of Residence" : key === "postcode" ? "Postcode / Pincode / Zipcode" : key.replace(/([A-Z])/g, " $1")}
            </label>

            {key === "postcode" ? (
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handlePostcodeChange}
                className="border border-gray-200 bg-gray-50 rounded-md px-3 py-2
                text-xs md:text-sm focus:ring-2 focus:ring-[#3E63DD] outline-none"
                placeholder="Enter postcode to auto-fetch address"
              />
            ) : key === "address" && availableAddresses.length > 0 ? (
              <>
                <select
                  name="address"
                  value={formData.address === "manual" ? "manual" : formData.address}
                  onChange={(e) => {
                    if (e.target.value === "manual") {
                      setFormData({ ...formData, address: "" });
                      setAvailableAddresses([]);
                    } else {
                      handleChange(e);
                    }
                  }}
                  className="border border-gray-200 bg-gray-50 rounded-md px-3 py-2
                  text-xs md:text-sm focus:ring-2 focus:ring-[#3E63DD] outline-none"
                >
                  <option value="">Select Address</option>
                  {availableAddresses.map((addr, idx) => (
                    <option key={idx} value={addr}>
                      {addr}
                    </option>
                  ))}
                  <option value="manual">Enter Manually</option>
                </select>
              </>
            ) : key === "address" ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border border-gray-200 bg-gray-50 rounded-md px-3 py-2
                text-xs md:text-sm focus:ring-2 focus:ring-[#3E63DD] outline-none"
                placeholder="Enter address manually"
              />
            ) : key === "dateOfBirth" ? (
              <DatePicker
                selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
                onChange={(date) =>
                  handleChange({
                    target: { name: "dateOfBirth", value: date.toISOString() },
                  })
                }
                className="border border-gray-200 bg-gray-50 rounded-md px-3 py-2
                text-xs md:text-sm focus:ring-2 focus:ring-[#3E63DD] outline-none"
                dateFormat="dd / MM / yyyy"
              />
            ) : key === "favouriteTeam" ? (
              <select
                name="favouriteTeam"
                value={formData.favouriteTeam}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    favouriteTeam: e.target.value,
                    nationality:
                      p.nationality ||
                      TEAM_TO_NATIONALITY[e.target.value] ||
                      "",
                  }))
                }
                className="border border-gray-200 bg-gray-50 rounded-md px-3 py-2
                text-xs md:text-sm focus:ring-2 focus:ring-[#3E63DD] outline-none"
              >
                <option value="">Select Team</option>
                {TEAMS.map((team) => (
                  <option key={team}>{team}</option>
                ))}
              </select>
            ) : key === "nationality" ? (
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="border border-gray-200 bg-gray-50 rounded-md px-3 py-2
                text-xs md:text-sm focus:ring-2 focus:ring-[#3E63DD] outline-none"
              >
                <option value="">Select Country of Residence</option>
                {NATIONALITIES.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="border border-gray-200 bg-gray-50 rounded-md px-3 py-2
                text-xs md:text-sm focus:ring-2 focus:ring-[#3E63DD] outline-none"
              />
            )}
          </div>
        ))}

      {/* Avatar URL */}
    
        <input 
          type="hidden"
          name="avatarUrl"
          value={formData.avatarUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="d-none"
        />

      <button
        type="submit"
        className="md:col-span-2 bg-[#00a63e] hover:bg-[#26b95c]
        text-white py-3 rounded-xl font-semibold"
      >
        Save Changes
      </button>
    </form>
  );
}
