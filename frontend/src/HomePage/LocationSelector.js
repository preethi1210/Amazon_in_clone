import React, { useState, useRef, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png",
});

const LocationSelector = () => {
  const [location, setLocation] = useState("Guntur, Andhra Pradesh 522509");
  const [coords, setCoords] = useState({ lat: 16.3067, lon: 80.4365 }); // default
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Detect current location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const city = data.address.city || data.address.town || data.address.village || "";
          const state = data.address.state || "";
          const postcode = data.address.postcode || "";
          setLocation(`${city}, ${state} ${postcode}`);
          setShowDropdown(false);
        } catch (err) {
          alert("Failed to get address from location.");
          console.error(err);
        }
      },
      (error) => alert("Unable to detect location: " + error.message)
    );
  };

  // Custom component to handle map click
  const LocationMarker = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setCoords({ lat, lon: lng });
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await response.json();
          const city = data.address.city || data.address.town || data.address.village || "";
          const state = data.address.state || "";
          const postcode = data.address.postcode || "";
          setLocation(`${city}, ${state} ${postcode}`);
        } catch (err) {
          console.error(err);
        }
      },
    });

    return <Marker position={[coords.lat, coords.lon]}></Marker>;
  };

  return (
    <div className="relative">
      {/* Location Button */}
      <div
        className="flex items-center gap-1 border border-transparent hover:border-white rounded-sm transition duration-200 group px-2 py-1 cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <CiLocationOn className="text-xl" />
        <div className="text-sm leading-tight">
          <p className="text-gray-300">Delivering to</p>
          <b className="text-white">{location}</b>
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 mt-1 w-96 text-black p-4 rounded shadow-md"
          style={{ background: "white", zIndex: 9999 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-semibold mb-2">Select Location</h3>
          <button
            onClick={detectLocation}
            className="bg-yellow-400 px-3 py-2 rounded hover:bg-yellow-500 mb-2 w-full font-semibold text-lg"
          >
            Use Current Location
          </button>

          <p className="text-sm mb-2">Or click on map to choose location:</p>

          <MapContainer
            center={[coords.lat, coords.lon]}
            zoom={13}
            scrollWheelZoom={false}
            className="w-full h-64 rounded"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
