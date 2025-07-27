import React from 'react';

const ListSection = ({ title, items }) => {
  return (
    <div className="w-48"> {/* Set a fixed width to match 2nd image layout */}
      <h3 className="font-semibold text-sm mb-1">{title}</h3>
      <ul className="text-sm space-y-1"> {/* Reduce vertical spacing */}
        {items.map((item, index) => (
          <li
            key={index}
            className="hover:underline cursor-pointer leading-tight"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListSection;
