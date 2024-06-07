import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from 'react';
import { handleKakaoLogin, loginSubmit, checkLoginStatus } from '../handlers/LoginHandlers';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkLoginStatus().then(isLoggedIn => {
      if (isLoggedIn) {
        router.replace('/main');
      }
    });
  }, []);
  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 flex items-center justify-center bg-[#000000] text-white">
        <div className="w-full max-w-md px-8">
          <div className="mb-8 text-center">
            <div className="flex justify-center items-center">
              <FuelIcon className="h-12 w-12 text-purple-500" />
              <h1 className="ml-3 text-4xl font-bold text-lightblue-500">FuelFinder</h1>
            </div>
            <div className="mt-7">
              <h2 className="text-2xl font-bold">Log in to your account</h2>
              <p className="mt-2 text-gray-400">Welcome back! Please enter your details.</p>
            </div>
          </div>
          <form className="flex flex-col gap-4" onSubmit={(e) => loginSubmit(e, { email, password })}>
            <div className="flex flex-col">
              <label className="mb-2" htmlFor="email">Email</label>
              <Input className="rounded-md bg-[#1f1f21] py-3 px-4 border-none"                     
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col">
              <label className="mb-2" htmlFor="password">Password</label>
              <Input className="rounded-md bg-[#1f1f21] py-3 px-4 border-none"                     
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button className="mt-4 rounded-md bg-[#7a7ae9] py-3 px-4">Login</Button>
            <div className="relative flex items-center justify-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative z-10 px-4 bg-[#000000] text-xs text-gray-400">OR</div>
            </div>

            <Button
      className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
      type="button"
      onClick={handleKakaoLogin}>
      Kakao Login
    </Button>
          </form>
          <div className="mt-6 text-center">
            <span>Don't have an account? </span>
            <Link className="text-purple-500" href="/join">Sign up</Link>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-[#1e1e1e] bg-cover bg-center" style={{ backgroundImage: 'url("/LoginImage.png")' }}>
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

export default login;