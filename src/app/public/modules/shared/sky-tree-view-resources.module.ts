import {
  NgModule
} from '@angular/core';

import {
  SKY_LIB_RESOURCES_PROVIDERS
} from '@skyux/i18n/modules/i18n/lib-resources-providers-token';

import {
  SkyTreeViewResourcesProvider
} from '../../plugin-resources/sky-tree-view-resources-provider';

@NgModule({
  providers: [{
    provide: SKY_LIB_RESOURCES_PROVIDERS,
    useClass: SkyTreeViewResourcesProvider,
    multi: true
  }]
})
export class SkyTreeViewResourcesModule { }
