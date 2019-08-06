import {
  Component,
  ViewChild
} from '@angular/core';

import {
  ITreeOptions,
  ITreeState,
  TreeComponent
} from 'angular-tree-component';

import {
  SkyAngularTreeOptions
} from '../types/angular-tree-options';

@Component({
  templateUrl: './tree-view.fixture.component.html'
})
export class SkyTreeViewFixtureComponent {

  public nodes: any[] = [
    {
      id: 1,
      name: 'United States',
      isExpanded: true,
      children: [
        { id: 2, name: 'California' },
        { id: 3, name: 'Indiana', isExpanded: true, children: [
          { id: 4, name: 'Adams' },
          { id: 5, name: 'Allen' }
          ]
        }
      ]
    }
  ];

  public options: ITreeOptions;

  public skyOptions: SkyAngularTreeOptions;

  public showInvalidTree = false;

  public showToolbar = false;

  public state: ITreeState;

  @ViewChild(TreeComponent)
  public treeComponent: TreeComponent;

  public updateState(): void {
    this.state = {
      selectedLeafNodeIds: {
        1: true
      }
    };
  }

}
