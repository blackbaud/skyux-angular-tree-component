import {
  Directive,
  Input
} from '@angular/core';

import {
  TreeComponent
} from 'angular-tree-component';

import {
  SkyAngularTreeOptions
} from './types/angular-tree-options';

@Directive({
  selector: '[skyTreeOptions]'
})
export class SkyAngularTreeOptionsDirective {

  @Input('skyTreeOptions')
  public skyAngularTreeOptions: SkyAngularTreeOptions;

    constructor(treeComponent: TreeComponent) {}
}
