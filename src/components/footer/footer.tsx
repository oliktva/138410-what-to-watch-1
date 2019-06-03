import React, {FunctionComponent, ReactElement} from 'react';

import Logo from 'src/components/logo/logo';

const Footer: FunctionComponent = (): ReactElement => (
  <footer className="page-footer">
    <Logo />
    <div className="copyright">
      <p>© 2019 What to watch Ltd.</p>
    </div>
  </footer>
);

export default Footer;
