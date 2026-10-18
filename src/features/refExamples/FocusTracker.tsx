import { useRef } from 'react';
import type { FocusEvent } from 'react';

export function FocusTracker() {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);
  const focusCountRef = useRef(0);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (event.relatedTarget) {
      focusCountRef.current += 1;
      console.log(`Количество переходов фокуса: ${focusCountRef.current}`);
    }
  };

  const focusFirst = () => {
    firstInputRef.current?.focus();
  };

  return (
    <div>
      <input
        ref={firstInputRef}
        onFocus={handleFocus}
        placeholder="Первое поле"
      />
      <input
        ref={secondInputRef}
        onFocus={handleFocus}
        placeholder="Второе поле"
      />
      <button onClick={focusFirst}>Сфокусировать на первом</button>
    </div>
  );
}
