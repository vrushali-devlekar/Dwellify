'use client';

import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
export default function Header() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };
  
  return (
    <header className='bg-transparent shadow-lg'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link href='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-rose-400'>D</span>
            <span className='text-rose-600'>WELLIFY</span>
          </h1>
        </Link>
        <form
          className='bg-white-100 p-3 rounded-lg flex items-center border-gray-900 shadow-sm text-gray-800'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-white focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-white bg-rose-500 h-6 w-6 rounded-xl p-1 hover:text-rose-500 hover:bg-white active:bg-white' />
          </button>
        </form>
        <ul className='flex gap-7 mr-6 items-center'>
          <Link href='/'>
            <li className='hidden md:inline text-slate-900 hover:text-rose-600 hover:border-b-2 font-semibold transition duration-200'>
              Home
            </li>
          </Link>
          <Link href='/about'>
            <li className='hidden md:inline text-slate-700 hover:text-rose-600 hover:border-b-2 font-semibold transition duration-200'>
              About
            </li>
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href='/sign-in'>
              <li className='hidden md:inline text-slate-700 hover:text-rose-600 hover:border-b-2 font-semibold transition duration-200'>
                Sign In
              </li>
            </Link>
          </SignedOut>
        </ul>
      </div>
    </header>
  );
}