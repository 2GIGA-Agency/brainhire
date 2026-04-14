import React from "react";
import styles from "./TryBanner.module.scss";
import { Typography } from "@/components/ui-kit/Typography";
import { Button } from "@/components/ui-kit/Button";

interface TryBannerProps {
  title: string;
  description: string;
  buttonText: string;
}

export const TryBanner: React.FC<TryBannerProps> = ({
  title,
  description,
  buttonText,
}) => {
  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <Typography variant="h4" className={styles.title}>
          {title}
        </Typography>
        <Typography variant="body-text" className={styles.description}>
          {description}
        </Typography>
        <Button variant="primary" as="link" href="/signup">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
