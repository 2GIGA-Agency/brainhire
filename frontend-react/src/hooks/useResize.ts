import { useEffect, useState } from "react";

export const useResize = (step = 10) => {
    const [size, setSize] = useState([0, 0]);

    useEffect(() => {
        const handleResize = () => {
            const [prevWidth, prevHeight] = size;
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            // Обновляем состояние только если изменение >= step (10px)
            if (
                Math.abs(newWidth - prevWidth) >= step ||
                Math.abs(newHeight - prevHeight) >= step
            ) {
                setSize([newWidth, newHeight]);
            }
        };

        // Первоначальный вызов
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [size, step]); // Зависимость от size и step

    return size;
};