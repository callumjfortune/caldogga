'use client';
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CoreContextInterface {
  data: string[];
  animate: (value: string) => void;
  addData?: (value: string) => void;
}

const CoreContext = createContext<CoreContextInterface | undefined>(undefined);

export const CoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<string[]>([]);

  const animate = (value: string) => {
    console.log(`Animating with ${value}`);
  };

  const addData = (value: string) => {
    console.log("Adding data:", value);
    setData((prevData) => {
      const newData = [...prevData, value];
      console.log("New data array:", newData); // Debug output
      return newData;
    });
  };

  return (
    <CoreContext.Provider value={{ data, animate, addData }}>
      {children}
    </CoreContext.Provider>
  );
};

export const useCoreContext = () => {
  const context = useContext(CoreContext);
  if (context === undefined) {
    throw new Error("useCoreContext must be used within a CoreProvider");
  }
  return context;
};
