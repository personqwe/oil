import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { RiHome6Line } from "react-icons/ri";
import { MdOutlineManageSearch } from "react-icons/md";
import { BiMemoryCard } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import CheapestCard from "./shared/card";

export function Main({ user, stations }) {
  useEffect(() => {
    document.querySelector('.home-section').style.scrollbarWidth = 'thin';
    document.querySelector('.home-section').style.scrollbarColor = '#5e5e5e #1e1e1e';
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };

      new window.naver.maps.Map('naver-map', mapOptions);
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <div className="flex h-screen bg-[#0D1117] text-white">
    <div className="flex flex-col w-1/5 h-full bg-[#080808] p-5">
      <div className="flex items-center mb-6">
        <FuelIcon className="mr-3 h-16 w-8 text-purple-500" />
        <span className="text-2xl font-bold">FuelFinde</span>
      </div>
      <div className="flex items-center mb-4">
      <div className="flex items-center justify-center mr-2">
  <img
    src={user.profilePhoto}
    alt="User profile photo"
    className="w-10 h-10 rounded-full bg-blue-400"
  />
</div>
        <div>
          <div className="text-lg font-semibold">{user.nick}</div>
          <div className="text-xs text-gray-400">{user.email}</div>
        </div>
      </div>
      <nav className="mt-4">
  <Link href="/main" className="flex items-center h-14 mb-6 p-2 rounded-lg text-sm bg-[#8585fe] text-white font-bold">
    <RiHome6Line size="1.7em" />
    <span className="ml-3">Home</span>
  </Link>
  <Link href="/search" className="flex items-center h-14 mb-6 p-2 rounded-lg text-sm text-white font-bold">
    <MdOutlineManageSearch size="1.7em" color="#7a75b7"/>
    <span className="ml-3">Search</span>
  </Link>
  <Link href="/recent_search" className="flex items-center h-14 mb-6 p-2 rounded-lg text-sm text-white font-bold">
    <BiMemoryCard size="1.7em" color="#7a75b7"/>
    <span className="ml-3">Recent Search</span>
  </Link>
  <Link href="/favorites" className="flex items-center h-14 mb-6 p-2 rounded-lg text-sm text-white font-bold">
    <MdFavoriteBorder size="1.7em" color="#7a75b7"/>
    <span className="ml-3">Favorites</span>
  </Link>
  <Link href="/profile" className="flex items-center h-14 mb-6 p-2 rounded-lg text-sm text-white font-bold">
    <CgProfile size="1.7em" color="#7a75b7"/>
    <span className="ml-3">Profile</span>
  </Link>
  </nav>
      </div>
      <div className="flex flex-col flex-grow h-full overflow-y-scroll p-14 bg-black home-section">
    <div className="flex items-center mb-5">
      <RiHome6Line size="2.0em" color="#7a75b7" className="mt-1"/>
      <h2 className="text-3xl font-bold ml-3">Home</h2>
    </div>
        <div id="naver-map" style={{ width: '100%', height: 'calc(100vh - 60px)' }}></div>
      </div>
      <div className="flex flex-col w-1/4 h-full bg-black p-4">
        <h2 className="text-3xl font-bold mb-4">Cheapest Gas Stations</h2>
        <div className="flex flex-col gap-4">
          {stations && stations.map((station, index) => (
            <CheapestCard key={index} station={station} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FuelIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" x2="15" y1="22" y2="22" />
      <line x1="4" x2="14" y1="9" y2="9" />
      <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
      <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
    </svg>
  );
}
export default Main;