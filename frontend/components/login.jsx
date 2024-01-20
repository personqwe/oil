import Link from "next/link"
import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { handleKakaoLogin, loginSubmit, checkLoginStatus } from '../handlers/loginHandlers';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkLoginStatus().then(isLoggedIn => {
      if (isLoggedIn) {
        router.replace('/main'); // 로그인 상태이면 /main으로 리디렉션
      }
    });
  }, []);
  return (
    (<div className="bg-white">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <nav
          className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            href="#">
            <FuelIcon className="w-6 h-6" />
            <span className="sr-only">Gas Station Finder</span>
          </Link>
          <Link className="font-bold" href="#">
            Home
          </Link>
        </nav>
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="flex-1 ml-auto sm:flex-initial">
            <div className="relative">
              <SearchIcon
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Search for gas stations within radius..."
                type="search" />
            </div>
          </form>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mb-4">
          <FuelIcon className="w-24 h-24" />
        </div>
        <h1 className="text-4xl font-bold mb-8">FuelFinder</h1>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Login</CardTitle>
              <UserIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
            <form onSubmit={(e) => loginSubmit(e, { email, password })}>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <Input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <Input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit">
                    Sign In
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-4">
                <Button
      className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
      type="button"
      onClick={handleKakaoLogin}>
      Kakao Login
    </Button>
                </div>
                <div className="flex items-center justify-between mt-4">
                <Link href="/join">
                    <span className="text-blue-500 hover:text-blue-800" style={{ cursor: 'pointer' }}>
                        Don't have an account? Sign Up
                    </span>
                </Link>
            </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>)
  );
}


function FuelIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="3" x2="15" y1="22" y2="22" />
      <line x1="4" x2="14" y1="9" y2="9" />
      <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
      <path
        d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
    </svg>)
  );
}

function SearchIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>)
  );
}


function UserIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>)
  );
}

export default login;;