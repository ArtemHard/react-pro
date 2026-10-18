import { useEffect, useRef } from 'react';
import type { ChangeEvent } from 'react';

export function DebouncedLogger() {
  const timeoutRef = useRef<number | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    const value = event.target.value;

    timeoutRef.current = window.setTimeout(() => {
      console.log(value);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return <input onChange={handleChange} placeholder="Введите текст" />;
}
