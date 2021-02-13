import { useEffect, useRef } from 'react';

export function useUnmount(cb) {
  useEffect(() => {
    return () => {
      console.log('calling cb in useUnmount');
      cb();
    };
  }, []);
}

export function useMount(cb) {
  useEffect(() => {
    console.log('calling cb in useMount');
    cb();
  }, []);
}

export function useSetup(cb) {
  const tearDownRef = useRef();

  // console.log(1, tearDownRef.current);
  useEffect(() => {
    tearDownRef.current = cb();
    // console.log(2, tearDownRef.current);
    return tearDownRef.current;
  }, []);

  return tearDownRef.current;
}
