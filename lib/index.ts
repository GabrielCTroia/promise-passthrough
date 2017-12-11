
import { Promise } from 'es6-promise';

/**
 * PassThrough takes a function "fn" as an argument and returns
 * a thunk that takes an argument "a".
 * 
 * When the thunk is invoked, it calls the fn() but doesn't wait for it 
 * to run/return, instead it returns the given argument "a".
 *
 * Works pretty well in monadic chains, such as promises,
 * when you need to chain a function that creates a side effect!
 */
export const passThrough = <T>(fn: (a: T) => void) => (arg: T) => {
  // Invoke fn but return the passed arg right away.
  try {
    fn(arg);
    return arg;
  } catch (e) {
    // If there's an error make sure the Promise Chain stops.
    throw e;
  }
};

/**
 * Same as PassThrough, except it waits for fn() to resolve!
 */
export const passThroughAwait = <T>(fn: (a: T) => void) => (arg: T) => {
  return Promise.resolve(fn.call(fn, arg)).then(() => arg);
};
