/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import packageJson from '../../../../libs/anglify/package.json';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  exampleFolderURL: 'https://raw.githubusercontent.com/valentingavran/anglify/develop/apps/docs/src/app/examples/',
  applicationLayoutsExampleURLs: {
    base: 'https://github.com/valentingavran/anglify/tree/develop/apps/docs/src/app/layout-examples/base',
    constrained: 'https://github.com/valentingavran/anglify/tree/develop/apps/docs/src/app/layout-examples/constrained',
    tabs: 'https://github.com/valentingavran/anglify/tree/develop/apps/docs/src/app/layout-examples/tabs',
  },
  version: packageJson.version,
  description: packageJson.description,
  keywords: packageJson.keywords,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
