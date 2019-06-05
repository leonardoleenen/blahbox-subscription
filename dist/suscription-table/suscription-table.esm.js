import { a as patchBrowser, b as globals, c as bootstrapLazy } from './suscription-table-f9ff2b59.js';

patchBrowser().then(resourcesUrl => {
  globals();
  return bootstrapLazy([["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["suscription-table",[[1,"suscription-table",{"monthlyBilling":[32]}]]]], { resourcesUrl });
});
