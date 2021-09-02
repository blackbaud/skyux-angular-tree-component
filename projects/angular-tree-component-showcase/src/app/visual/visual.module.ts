import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyAngularTreeVisualComponent } from './angular-tree-component/angular-tree-visual.component';
import { VisualComponent } from './visual.component';
import { SkyAngularTreeModule } from 'projects/angular-tree-component/src/public-api';
import { TreeModule } from 'angular-tree-component';
import { RouterModule } from '@angular/router';
import { SkyDropdownModule } from '@skyux/popovers';

// Build will crash if we try to insert function calls inside the NgModule decorator.
// To get around this, we just use a variable to refer to the .forRoot() function call.
// https://github.com/angular/angular/issues/23609
const treeModuleForRoot = TreeModule.forRoot();

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
    treeModuleForRoot
  ]
})
export class VisualModule { }
