import {
  Component
} from '@angular/core';

@Component({
  templateUrl: './tree-view-invalid.fixture.component.html'
})
export class SkyTreeViewInvalidFixtureComponent {

  public showInvalidTree = false;

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

}
