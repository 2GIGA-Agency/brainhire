
import { BaseSpinner } from "@/components/shared/BaseSpinner/BaseSpinner";
import styles from "./ContentSpinner.module.scss";

export const ContentSpinner = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.loader}>
                    <BaseSpinner />
                </div>
            </div>
        </div>
    );
}