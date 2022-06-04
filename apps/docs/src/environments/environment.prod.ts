/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import packageJson from '../../../../libs/anglify/package.json';

export const environment = {
  production: true,
  exampleFolderURL: 'https://raw.githubusercontent.com/valentingavran/anglify/master/apps/docs/src/app/examples/',
  applicationLayoutsExampleURLs: {
    base: 'https://github.com/valentingavran/anglify/tree/master/apps/docs/src/app/pages/layout-examples/base',
    constrained: 'https://github.com/valentingavran/anglify/tree/master/apps/docs/src/app/pages/layout-examples/constrained',
  },
  version: packageJson.version,
  description: packageJson.description,
  keywords: packageJson.keywords,
};
