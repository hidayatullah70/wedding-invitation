import { useEffect, useState } from 'react';

function calculateRemaining(targetTimestamp) {
  const diff = targetTimestamp - Date.now();
  if (Number.isNaN(targetTimestamp) || diff <= 0) {
    return {
      isPast: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    isPast: false,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function useCountdown(targetDateIso) {
  const targetTimestamp = Date.parse(targetDateIso);
  const [timeLeft, setTimeLeft] = useState(() =>
    calculateRemaining(targetTimestamp)
  );

  useEffect(() => {
    setTimeLeft(calculateRemaining(targetTimestamp));
    if (Number.isNaN(targetTimestamp) || targetTimestamp <= Date.now()) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      const next = calculateRemaining(targetTimestamp);
      setTimeLeft(next);
      if (next.isPast) {
        window.clearInterval(timer);
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetTimestamp]);

  return timeLeft;
}
