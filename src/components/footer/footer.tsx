import React from 'react';

import Logo from 'src/components/logo/logo';

const Footer = (): JSX.Element => (
  <footer className="page-footer">
    <Logo />
    <div className="copyright">
      <p>© 2019 What to watch Ltd.</p>
    </div>
  </footer>
);

export default Footer;
