import React from 'react';
import styles from './Divider.module.scss';

interface DividerProps {
  text?: string;
}

export const Divider: React.FC<DividerProps> = ({ text }) => {
  return text ? (
    <div className={styles.dividerWithText}>
      <span className={styles.line}></span>
      <span className={styles.text}>{text}</span>
      <span className={styles.line}></span>
    </div>
  ) : (
    <div className={styles.divider}></div>
  );
};
