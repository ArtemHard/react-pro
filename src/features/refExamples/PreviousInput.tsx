import { useEffect, useRef, useState } from 'react';

export function PreviousInput() {
  const [value, setValue] = useState('');
  const previousValueRef = useRef('');

  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);

  return (
    <div>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Введите текст"
      />
      <p>Предыдущее значение: {previousValueRef.current}</p>
    </div>
  );
}
