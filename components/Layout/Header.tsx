import React from 'react';
import Link from 'next/link';

import './Header.scss';

const Header = () => {
  return (
    <header className="Header">
      <h1 className="Header__title">
        <Link href="/">
          <a>
            <img alt="Logo: stylized letters 'BRN'" src="/images/logo.svg" />
          </a>
        </Link>
      </h1>
    </header>
  );
};

export default Header;
