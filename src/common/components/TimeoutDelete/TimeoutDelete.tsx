import { useEffect, useState, ReactNode } from 'react';

type Props = {
  ttl?: number; // in milliseconds, default 5 seconds, 5000 ms
  children: ReactNode;
};

const TimeoutDelete = ({ ttl = 5000, children }: Props) => {
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLive(false);
    }, ttl);
    return () => clearTimeout(timer);
  }, [ttl]);

  return isLive ? <div>{children}</div> : null;
};

export default TimeoutDelete;
