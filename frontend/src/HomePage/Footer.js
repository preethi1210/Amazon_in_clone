import React from 'react';

// Reusable Box Component
const FooterBox = ({ title, line1, line2 }) => (
  <div>
    <h1 className="font-semibold">{title}</h1>
    <p>{line1}</p>
    <p>{line2}</p>
  </div>
);

// Data for the footer
const footerData = [
  { title: 'AbeBooks', line1: 'Books, art', line2: '& collectibles' },
  { title: 'Amazon Web Services', line1: 'Scalable Cloud', line2: 'Computing Services' },
  { title: 'Audible', line1: 'Download', line2: 'Audio Books' },
  { title: 'IMDb', line1: 'Movies, TV', line2: '& Celebrities' },
  { title: 'Shopbop', line1: 'Designer', line2: 'Fashion Brands' },
  { title: 'Amazon Business', line1: 'Everything For', line2: 'Your Business' },
  { title: 'Prime Now', line1: '2-Hour Delivery', line2: 'on Everyday Items' },
  { title: 'Amazon Prime Music', line1: '100 million songs, ad-free', line2: 'Over 15 million podcast episodes' },
];

const Footer = () => {
  return (
    <div className="bg-gray-900 text-gray-100 text-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        {footerData.map((item, index) => (
          <FooterBox
            key={index}
            title={item.title}
            line1={item.line1}
            line2={item.line2}
          />
        ))}
      </div>

      {/* Legal Footer Bottom Section */}
      <div className="text-center py-4 border-t border-gray-700 text-xs">
        <p>Conditions of Use & Sale · Privacy Notice · Interest-Based Ads</p>
        <p>© 1996–2025, Amazon.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
};

export default Footer;
