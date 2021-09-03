import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyAngularTreeVisualComponent } from './angular-tree-component/angular-tree-visual.component';
import { VisualComponent } from './visual.component';
import { SkyAngularTreeModule } from 'projects/angular-tree-component/src/public-api';
import { TreeModule } from '@circlon/angular-tree-component';
import { RouterModule } from '@angular/router';
import { SkyDropdownModule } from '@skyux/popovers';

@NgModule({
  declarations: [
    SkyAngularTreeVisualComponent,
    VisualComponent
  ],
  imports: [
    CommonModule,
    SkyAngularTreeModule,
    SkyDropdownModule,
    RouterModule,
    TreeModule
  ]
})
export class VisualModule { }
