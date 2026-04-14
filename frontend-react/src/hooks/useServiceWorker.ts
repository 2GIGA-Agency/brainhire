import { useEffect } from 'react';

export const useServiceWorker = () => {
    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            const swUrl = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/sw.js`;

            if (process.env.NODE_ENV === 'development') {
                // Проверяем доступность SW в dev-режиме
                navigator.serviceWorker.getRegistrations().then(registrations => {
                    if (registrations.length > 0) {
                        registrations.forEach(reg => reg.unregister());
                    }

                    fetch(swUrl)
                        .then(response => {
                            if (response.status === 200) {
                                registerSW(swUrl);
                            }
                        })
                        .catch(() => {
                            console.log('No Service Worker found');
                        });
                });
            } else {
                // В production просто регистрируем
                registerSW(swUrl);
            }
        }

        function registerSW(swUrl: string) {
            navigator.serviceWorker
                .register(swUrl)
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }, []);
};