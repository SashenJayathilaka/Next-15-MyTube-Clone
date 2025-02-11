import { useEffect, useRef, useState } from "react";

export const useIntersectionsObserver = (
  options?: IntersectionObserverInit
) => {
  const [isIntersection, setIsIntersection] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersection(entry.isIntersecting);
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { targetRef, isIntersection };
};
