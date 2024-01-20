import React, { useState } from 'react';
import Link from "next/link"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { joinSubmit } from "@/handlers/joinHandlers"

export function join() {
  const [nick, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
          <Link href="/">
            <span className="font-bold" href="#">
            Home
            </span>
          </Link>
        </nav>
      </header>
      <main
        className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Sign Up</CardTitle>
              <UserIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
            <form onSubmit={(e) => joinSubmit(e, { nick, email, password, confirmPassword })}>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="nick">
                    Nickname
                  </label>
                  <Input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="nick"
                    placeholder="Enter your Nickname"
                    type="nick"
                    value={nick}
                    onChange={(e) => setNickname(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <Input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    placeholder="Enter your Email"
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
                    placeholder="Enter your Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-bold mb-2" htmlFor="confirm-password">
                    Confirm Password
                  </label>
                  <Input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="confirm-password"
                    placeholder="Confirm your password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="flex items-center justify-between">
            <Button type="submit">Sign Up</Button>
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
export default join;