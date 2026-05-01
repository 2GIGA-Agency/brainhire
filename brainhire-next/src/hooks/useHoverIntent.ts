"use client";

import { useCallback, useEffect, useRef } from "react";

type Options = {
  onOpen: () => void;
  onClose: () => void;
  closeDelay?: number;
};

/**
 * Hover-intent: открытие без задержки, закрытие с timer'ом.
 * Если курсор уходит и возвращается до закрытия — отменяет close.
 * Соответствует поведению pages/shared/header.html (closeDelay = 120мс).
 */
export function useHoverIntent({ onOpen, onClose, closeDelay = 120 }: Options) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleEnter = useCallback(() => {
    cancelClose();
    onOpen();
  }, [cancelClose, onOpen]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    timerRef.current = setTimeout(() => {
      onClose();
      timerRef.current = null;
    }, closeDelay);
  }, [cancelClose, onClose, closeDelay]);

  useEffect(() => {
    return () => cancelClose();
  }, [cancelClose]);

  return { handleEnter, scheduleClose, cancelClose };
}
