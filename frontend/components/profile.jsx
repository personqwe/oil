import Link from "next/link";
import { RiHome6Line } from "react-icons/ri";
import { MdOutlineManageSearch } from "react-icons/md";
import { BiMemoryCard } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from 'react';

export function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  const userName = user ? user.nick : 'Guest';
  const userEmail = user ? user.email : '@';
  const userprofilePhoto = user ? user.profilePhoto : '/';
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
    src={userprofilePhoto}
    alt="User profile photo"
    className="w-10 h-10 rounded-full bg-blue-400"
  />
</div>
        <div>
          <div className="text-lg font-semibold">{userName}</div>
          <div className="text-xs text-gray-400">{userEmail}</div>
        </div>
      </div>
      <nav className="mt-4">
  <Link href="/main" className="flex items-center h-14 mb-6 p-2 rounded-lg text-sm text-white font-bold">
    <RiHome6Line size="1.7em" color="#7a75b7" />
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
  <Link href="/profile" className="flex items-center h-14 mb-6 p-2 rounded-lg text-sm bg-[#8585fe] text-white font-bold">
    <CgProfile size="1.7em"/>
    <span className="ml-3">Profile</span>
  </Link>
</nav>
    </div>
    <div className="flex flex-grow h-full overflow-y-scroll p-14 home-section bg-black">
        <div className="flex flex-col gap-4">
          <div className="flex items-center mb-6"> 
            <CgProfile size="2.0em" color="#7a75b7" className="mt-1"/>
            <h2 className="text-3xl font-bold ml-3">Profile</h2>
          </div>

          <div className="bg-gray-700 p-4 rounded-md"> 
            <h3 className="text-2xl font-bold">User Information</h3>
            <p className="text-gray-400">Name: John Doe</p>
            <p className="text-gray-400">Email: john.doe@example.com</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-md">
            <h3 className="text-2xl font-bold">Change Nickname</h3>
            <input
              className="bg-gray-600 rounded-md p-2 mt-2 text-white"
              placeholder="Enter new nickname"
              type="text"
            />
            <button className="bg-purple-500 rounded-md p-2 mt-2 text-white">Update Nickname</button>
          </div>
        </div>
      </div>
    </div>
  )
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
export default Profile;