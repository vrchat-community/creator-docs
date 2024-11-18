import React, { ReactNode, CSSProperties } from 'react';
// Import clsx library for conditional classes.
import clsx from 'clsx'; 

interface ColumnProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}
// Define the Column component as a function 
// with children, className, style as properties
// Look https://infima.dev/docs/ for learn more.
// Style only affects the element inside the column, but we could have also made the same distinction as for the classes.
export default function Column({ children, className, style }: ColumnProps) {
  return (
  
      <div className={clsx('col', className)} style={style}>
        {children}
      </div>
  
  );
}