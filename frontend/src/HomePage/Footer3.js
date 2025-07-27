import React from 'react';

const Footer3 = () => {
  const footerSections = [
    {
      title: "Get to Know Us",
      links: [
        "About Amazon",
        "Careers",
        "Press Releases",
        "Amazon Science",
      ],
    },
    {
      title: "Connect with Us",
      links: [
        "Facebook",
        "Twitter",
        "Instagram",
      ],
    },
    {
      title: "Make Money with Us",
      links: [
        "Sell on Amazon",
        "Sell under Amazon Accelerator",
        "Protect and Build Your Brand",
        "Amazon Global Selling",
        "Supply to Amazon",
        "Become an Affiliate",
        "Fulfilment by Amazon",
        "Advertise Your Products",
        "Amazon Pay on Merchants",
      ],
    },
    {
      title: "Let Us Help You",
      links: [
        "Your Account",
        "Returns Centre",
        "Recalls and Product Safety Alerts",
        "100% Purchase Protection",
        "Amazon App Download",
        "Help",
      ],
    },
  ];

  return (
    <div className="bg-gray-800 text-white px-10 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {footerSections.map((section, idx) => (
          <div key={idx}>
            <h3 className="font-bold mb-3">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link, i) => (
                <li key={i} className="hover:underline cursor-pointer">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer3;
