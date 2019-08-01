import {
  Component,
  ViewChild
} from '@angular/core';

import {
  ITreeOptions,
  TreeComponent
} from 'angular-tree-component';

import {
  SkyTreeViewOptions
} from '../types/sky-tree-view-options';

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
        { id: 2, name: 'Alabama' },
        { id: 3, name: 'California' },
        { id: 14, name: 'Indiana', isExpanded: true, children: [
          { id: 15, name: 'Adams' },
          { id: 16, name: 'Allen' },
          { id: 17, name: 'Bartholomew' }
          ]
        }
      ]
    },
    {
      id: 24,
      name: 'Canada',
      isExpanded: true,
      children: [
        { id: 25, name: 'Alberta' },
        { id: 26, name: 'British Columbia' },
        { id: 27, name: 'Manitoba' }
      ]
    }
  ];

  public options: ITreeOptions;

  public skyOptions: SkyTreeViewOptions;

  public showToolbar = false;

  @ViewChild(TreeComponent)
  public treeComponent: TreeComponent;

}
