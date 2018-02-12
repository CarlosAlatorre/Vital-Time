// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyCUTkbsZrjh5wIdEjF3klZ1w97OjPNrj2g',
        authDomain: 'vital-time.firebaseapp.com',
        databaseURL: 'https://vital-time.firebaseio.com',
        projectId: 'vital-time',
        storageBucket: 'vital-time.appspot.com',
        messagingSenderId: '50084638803'
    }
};
