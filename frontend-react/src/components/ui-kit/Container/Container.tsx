import React, { FC, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      {children}
    </div>
  );
};
