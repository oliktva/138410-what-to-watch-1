import React, {FunctionComponent} from 'react';

import PageWrapper from 'src/components/page-wrapper/page-wrapper';
import Header from 'src/components/header/header';
import Footer from 'src/components/footer/footer';

const Error: FunctionComponent = () => (
  <PageWrapper>
    <div className="user-page">
      <Header />
      <div className="page-content">
        <h1>Internal server error</h1>
        <p>Please try again later</p>
        <Footer />
      </div>
    </div>
  </PageWrapper>
);

export default Error;
