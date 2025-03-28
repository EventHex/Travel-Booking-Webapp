import React from "react";

export const TabMenu = ({ tabs }) => {
  return (
    <div className="flex w-full max-w-[566px] items-center gap-6 text-lg font-medium tracking-[-0.11px] flex-wrap py-3.5 border-[rgba(134,140,152,1)] border-b max-md:max-w-full">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`self-stretch relative flex items-center gap-1.5 ${
            tab.isActive
              ? "text-[rgba(10,13,20,1)]"
              : "text-[rgba(82,88,102,1)]"
          } whitespace-nowrap justify-center my-auto`}
        >
          <img
            src={tab.icon}
            alt={tab.label}
            className="aspect-[1] object-contain w-5 self-stretch z-0 shrink-0 my-auto"
          />
          <div className="self-stretch z-0 gap-1 my-auto">{tab.label}</div>
          {tab.isActive && (
            <div className="absolute z-0 shrink-0 h-0 w-[73px] border-[rgba(55,93,251,1)] border-solid border-2 -bottom-3.5 inset-x-0" />
          )}
        </div>
      ))}
    </div>
  );
};