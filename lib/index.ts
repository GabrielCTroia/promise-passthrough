
import { Promise, Thenable } from 'es6-promise';

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
export function passThrough<T>(fn: (a?: T) => any): (arg?: T) => T;
export function passThrough<T, R>(fn: (a?: T) => R): (arg?: T) => T;
export function passThrough<T, R>(fn: (a?: T) => R): (arg?: T) => T | void {
  return (arg?: T) => {
    // Invoke fn but return the passed arg right away.
    try {
      fn(arg);
      return arg;
    } catch (e) {
      // If there's an error make sure the Promise Chain stops.
      throw e;
    }
  }
};

/**
 * Same as PassThrough, except it waits for fn() to resolve!
 */

export function passThroughAwait<T>(fn: (a: T) => Thenable<any>): () => T;
export function passThroughAwait<T>(fn: (a: T) => Thenable<any>) {
  return (arg: T) => Promise.resolve(fn.call(fn, arg)).then(() => arg);
}


// // export type PassThroughAwait =
// //   <T>(fn: ICallback<PromisesAPlus.Thenable<any>>) =>
// //     (a?: T) => PromisesAPlus.Thenable<T>;

// export const passThroughAwait =
//   <T>(fn: (a?: T) => Promise.Thenable<any> | any) =>
//     (arg?: T): Promise.Thenable<T> => {
//       return Promise.resolve(fn.call(fn, arg)).then(() => arg);
//     };