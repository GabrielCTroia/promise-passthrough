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
  // If the Promise resolves, bypass it's return and send back the arg,
  // If the promise rejects, this will ensure the chain interrupts.
  return Promise.resolve(fn.call(fn, arg)).then(() => arg);
};

/**
 * Same as PassThrough, except it waits for fn() to resolve!
 */
export const passThroughAwait = <T>(fn: (a: T) => void) => (arg: T) => {
  return Promise.resolve(fn.call(fn, arg)).then(() => arg);
};
