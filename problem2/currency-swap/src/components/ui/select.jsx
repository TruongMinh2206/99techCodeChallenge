import React from "react";

export function Select({ children, ...props }) {
    return <select className="border p-2 rounded w-full" {...props}>{children}</select>;
  }
  
  export function SelectItem({ value, children }) {
    return <option value={value}>{children}</option>;
  }
  