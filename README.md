# Promise Passthrough

See this short [article](https://medium.com/@gabrielctroia/side-effects-in-js-promise-chains-7db50b6302f3) for a few usecase examples.

## Install

`npm install promise-passthrough --save`

## Dependencies

- javascript es6
- or a globally available Promise (maybe this [polyfill](https://www.npmjs.com/package/promise-polyfill))

## Usage

```
import { passThrough } from 'promise-passthrough';

const cacheData = (response) => cacheStore.put('user', response);               // => undefined
const parseUserResponse = (response) => response.data.user;                     // => user
const updateLocalDatabase = (user) => localDB.update('user', user);             // => undefined
const refreshUserCreditCards = (user) => wallet.update('credits', user.credits) // => undefined

httpClient.get('https://facebook.com/user/' + id) // => response
  .then(passThrough(cacheData))                   // => response
  .then(responseToUser)                           // => user
  .then(passThroughAwait(updateLocalDatabase))    // => user
  .then(passThrough(refreshUserCredits))          // => user
  .then((user) => {
    // Even though 'updateLocalDatabase' and 'refreshUserCredits' return undefined,
    // by wrapping them in the passThrough/passThroughAwait functions, 
    // the User is ensured to be returned and fed into the next line of the Promise chain.

    console.log(`Hello ${user.name}`);
  });
```

## Licence 

MIT © [Gabriel C. Troia](https://github.com/GabrielCTroia)
