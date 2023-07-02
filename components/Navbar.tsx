import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs';

import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';

const labels: string[] = [
  'Home',
  'Series',
  'Films',
  'New & Popular',
  'My List',
  'Browse by languages',
];

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY >= TOP_OFFSET);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(curr => !curr);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu(curr => !curr);
  }, []);

  return (
    <nav className='w-full fixed z-40'>
      <div
        className={`px-4 md:px-16 py-6 flex items-center transition duration-500 ${
          showBackground ? 'bg-zinc-900/90' : ''
        }`}
      >
        <Image
          src='/images/logo.webp'
          alt='Logo'
          width={86}
          height={46}
        />
        <div className='ml-8 gap-7 hidden lg:flex'>
          <NavbarItem labels={labels} />
        </div>
        <div
          onClick={toggleMobileMenu}
          className='lg:hidden flex items-center gap-2 ml-8 cursor-pointer relative'
        >
          <p className='text-white text-sm'>Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? 'rotate-180' : ''
            }`}
          />
          <MobileMenu
            labels={labels}
            visible={showMobileMenu}
          />
        </div>
        <div className='flex ml-auto gap-7 items-center'>
          <div className='text-gray-200 hover:text-gray:300 cursor-pointer'>
            <BsSearch />
          </div>
          <div className='text-gray-200 hover:text-gray:300 cursor-pointer'>
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className='flex items-center gap-2 cursor-pointer relative'
          >
            <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
              <img
                src='/images/default-slate.webp'
                alt=''
              />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? 'rotate-180' : ''
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
