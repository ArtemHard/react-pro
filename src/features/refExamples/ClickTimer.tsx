import { useRef } from 'react';

interface ClickData {
  startTime: number | null;
  clickCount: number;
}

export function ClickTimer() {
  const clickDataRef = useRef<ClickData>({
    startTime: null,
    clickCount: 0,
  });

  const handleClick = () => {
    const now = Date.now();
    const data = clickDataRef.current;

    if (data.startTime === null) {
      data.startTime = now;
    }

    data.clickCount += 1;

    console.log(
      `Прошло с первого клика: ${now - data.startTime} мс, всего кликов: ${data.clickCount}`,
    );
  };

  return <button onClick={handleClick}>Клик</button>;
}
