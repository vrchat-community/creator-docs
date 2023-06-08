import React from 'react';
import { YbugProvider } from "ybug-react";
import Footer from '@theme-original/DocItem/Footer';

export default function FooterWrapper(props) {
  return (
    <>
      <YbugProvider ybugId="m75w56k2rbn8szkgjfwb">
        <Footer {...props} />
      </YbugProvider>
    </>
  );
}