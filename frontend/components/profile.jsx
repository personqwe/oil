import Link from "next/link";
import { RiHome6Line } from "react-icons/ri";
import { MdOutlineManageSearch } from "react-icons/md";
import { BiMemoryCard } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from 'react';
import { updateNick } from '../handlers/UserHandlers'; // UserHandlers에서 updateNick 함수 가져오기

export function Profile() {
  const [user, setUser] = useState(null);
  const [newNick, setNewNick] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleNicknameChange = async () => {
    try {
      const response = await updateNick(newNick);
      if (response.data === 'success') {
        // 닉네임 변경 성공 시 로컬 스토리지와 상태 업데이트
        const updatedUser = { ...user, nick: newNick };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setNewNick("");
        alert('닉네임이 성공적으로 변경되었습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('닉네임 변경에 실패했습니다.');
    }
  };

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
          <Link href="/favorites" className="flex items-center h-14 mb-6 p-2 rounded-lg text-sm text-white font-bold">
            <MdFavoriteBorder size="1.7em" color="#7a75b7"/>
            <span className="ml-3">Favorites</span>
          </Link>
          <Link href="/profile" className="flex items-center h-14 mb-6 p-2 rounded-lg text-sm bg-[#8585fe] text-white font-bold">
            <CgProfile size="1.7em"/>
            <span className="ml-3">Profile</span>
          </Link>
          <Link href="/logout" className="flex items-center h-14 mb-6 p-2 rounded-lg text-sm text-white font-bold">
            <BiMemoryCard size="1.7em" color="#7a75b7"/>
            <span className="ml-3">Logout</span>
          </Link>
        </nav>
      </div>
      <div className="flex flex-grow h-full overflow-y-scroll p-14 home-section bg-black">
        <div className="flex flex-col gap-4">
          <div className="flex items-center mb-6">
            <CgProfile size="2.0em" color="#7a75b7" className="mt-1"/>
            <h2 className="text-3xl font-bold ml-3">Profile</h2>
          </div>

          <div className="bg-gray-700 p-4 rounded-md shadow-lg">
            <h3 className="text-2xl font-bold mb-4">User Information</h3>
            <div className="flex items-center mb-4">
              <img
                src={userprofilePhoto}
                alt="User profile photo"
                className="w-20 h-20 rounded-full bg-blue-400 mr-4"
              />
              <div>
                <p className="text-lg font-semibold">Name: {userName}</p>
                <p className="text-lg text-gray-400">Email: {userEmail}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-md shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Change Nickname</h3>
            <input
              className="bg-gray-600 rounded-md p-2 mt-2 text-white w-full mb-4"
              placeholder="Enter new nickname"
              type="text"
              value={newNick}
              onChange={(e) => setNewNick(e.target.value)}
            />
            <button className="bg-purple-500 rounded-md p-2 text-white w-full" onClick={handleNicknameChange}>
              Update Nickname
            </button>
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
