import { a as patchBrowser, b as globals, c as bootstrapLazy } from './suscription-table-f9ff2b59.js';

patchBrowser().then(resourcesUrl => {
  globals();
  return bootstrapLazy([["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["suscription-table",[[1,"suscription-table",{"nickName":[1,"nick-name"],"email":[1],"userId":[1,"user-id"],"callbackUrl":[1,"callback-url"],"monthlyBilling":[32]}]]]], { resourcesUrl });
});
