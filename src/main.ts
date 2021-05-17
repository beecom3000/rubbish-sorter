import Aurelia, { RouterConfiguration } from 'aurelia';
import { App } from './app';
import { BlobToUrl } from './resources/value-converters/blob-to-url';

Aurelia
  // .register(RouterConfiguration)
  // To use HTML5 pushState routes, replace previous line with the following
  // customized router config.
  .register(
      // Registration.singleton(ApiService),
      RouterConfiguration.customize({ useUrlFragmentHash: false }),
      BlobToUrl
  )
  .app(App)
  .start();
