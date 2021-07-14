import {
  NgModule
} from '@angular/core';

import {
  SkyCodeModule
} from '@blackbaud/skyux-lib-code-block';

import {
  SkyDocsToolsModule,
  SkyDocsToolsOptions
} from '@skyux/docs-tools';

import {
  SkyDropdownModule
} from '@skyux/popovers';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  TreeModule
} from '@circlon/angular-tree-component';

import {
  SkyAngularTreeForRootCompatModule
} from './public/modules/shared/angular-tree-for-root-compat.module';

import {
  SkyAngularTreeModule
} from './public/public_api';

@NgModule({
  imports: [
    SkyAngularTreeForRootCompatModule
  ],
  exports: [
    SkyAngularTreeModule,
    SkyCodeModule,
    SkyAppLinkModule,
    SkyDocsToolsModule,
    SkyDropdownModule,
    TreeModule
  ],
  providers: [
    {
      provide: SkyDocsToolsOptions,
      useValue: {
        gitRepoUrl: 'https://github.com/blackbaud/skyux-angular-tree-component',
        packageName: '@skyux/angular-tree-component'
      }
    }
  ]
})
export class AppExtrasModule { }
