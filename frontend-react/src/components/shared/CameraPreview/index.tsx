import React from 'react';
import styles from './CameraPreview.module.scss';

export const CameraPreview: React.FC<{videoRef: React.RefObject<HTMLVideoElement | null>}> = ({ videoRef }) => {

  return (
    <div className={styles.container}>
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        muted
        playsInline
      />
    </div>
  );
};
