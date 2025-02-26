// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'dev',
  firebase:{
    config : {
      apiKey: "AIzaSyCj6AbaI9Lvl-Tt-nLz8Z629ShZ6fz-eXQ",
      authDomain: "edificacion-app-6cf84.firebaseapp.com",
      projectId: "edificacion-app-6cf84",
      storageBucket: "edificacion-app-6cf84.firebasestorage.app",
      messagingSenderId: "226434616268",
      appId: "1:226434616268:web:4cb91445b7c5cb4520ab69"
    }
  },
  url: 'http://localhost:5000/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
