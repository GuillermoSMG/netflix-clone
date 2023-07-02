import React from 'react';

interface NavbatItemPRops {
  labels: string[];
}

const NavbarItem: React.FC<NavbatItemPRops> = ({ labels }) => {
  return (
    <>
      {labels.map(label => (
        <div
          key={label}
          className='text-white cursor-pointer hover:text-gray-300 transition'
        >
          {label}
        </div>
      ))}
    </>
  );
};
export default NavbarItem;
