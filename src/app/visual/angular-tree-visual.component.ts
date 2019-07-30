import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

import {
  ITreeOptions
} from 'angular-tree-component';

import {
  IDTypeDictionary
} from 'angular-tree-component/dist/defs/api';

import {
  SkyTreeViewOptions
} from '../public/modules/sky-tree-view/types/sky-tree-view-options';

@Component({
  selector: 'sky-angular-grid-visual',
  templateUrl: './angular-tree-visual.component.html',
  styleUrls: ['./angular-tree-visual.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAngularTreeVisualComponent {
  public foo: any[] = [
    {
      id: 1,
      name: 'United States',
      isExpanded: true,
      children: [
        { id: 2, name: 'Alabama' }
      ]
    }
  ];
  public nodes: any[] = [
    {
      id: 1,
      name: 'United States',
      isExpanded: true,
      children: [
        { id: 2, name: 'Alabama' },
        { id: 3, name: 'Alaska' },
        // { id: 4, name: 'Arizona' },
        // { id: 5, name: 'Arkansas' },
        // { id: 6, name: 'California' },
        // { id: 7, name: 'Colorado' },
        // { id: 8, name: 'Deleware' },
        // { id: 9, name: 'Florida', disabled: true },
        // { id: 10, name: 'Georgia' },
        // { id: 11, name: 'Hawaii' },
        // { id: 12, name: 'Idaho' },
        // { id: 13, name: 'Illinois' },
        { id: 14, name: 'Indiana', isExpanded: true, children: [
          { id: 15, name: 'Adams' },
          { id: 16, name: 'Allen' },
          { id: 17, name: 'Bartholomew' },
          // { id: 18, name: 'Benton' },
          // { id: 19, name: 'Blackford' },
          // { id: 20, name: 'Boone' },
          // { id: 21, name: 'Brown' },
          // { id: 22, name: 'Caroll' },
          // { id: 23, name: 'Cass' }
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
        // { id: 27, name: 'Manitoba' },
        // { id: 28, name: 'Ontario' },
        // { id: 29, name: 'Quebec' },
        // { id: 30, name: 'Saskatchewan' }
      ]
    }
  ];

  // public dropdownItems: any = [
  //   { name: 'Insert an item at this level', disabled: false },
  //   { name: 'Insert an item under this level', disabled: false },
  //   { name: 'Move up', disabled: false },
  //   { name: 'Move down', disabled: false },
  //   { name: 'Move left', disabled: false },
  //   { name: 'Move right', disabled: false },
  //   { name: 'Edit', disabled: false },
  //   { name: 'Delete', disabled: false }
  // ];

  public options: ITreeOptions = {
    allowDrag: true,
    useCheckbox: true,
    useTriState: false
  };

  public skyTreeViewExtraOptions: SkyTreeViewOptions = {
    leafNodeSelectionOnly: true
  };

  public selectedNodeIds: string[] = [];

  public onSelect(event: any): void {
    this.updateSelectedNodeIds(event.treeModel.selectedLeafNodeIds);
  }

  public onDeselect(event: any): void {
    this.updateSelectedNodeIds(event.treeModel.selectedLeafNodeIds);
  }

  private updateSelectedNodeIds(selectedLeafNodeIds: IDTypeDictionary) {
    this.selectedNodeIds = [];
    for (let key in selectedLeafNodeIds) {
      if (selectedLeafNodeIds[key] && selectedLeafNodeIds[key]) {
        this.selectedNodeIds.push(key);
      }
    }
  }

  // @ViewChildren(SkyCheckboxComponent)
  // private checkboxes: QueryList<SkyCheckboxComponent> = new QueryList<SkyCheckboxComponent>();

  // public actionClicked(action: string, tree: any, node: any): void {
  //   alert('You selected ' + action);
  //   if (action === 'Insert an item at this level') {
  //     this.addNode(tree, node);
  //   }
  // }

  // public addNode(tree: any, node: any): void {
  //   this.nodes.push({
  //     id: 99,
  //     name: 'Mexico'
  //   });
  //   tree.treeModel.update();
  // }

  // public onUpdateData(event: any): void {
  //   const treeModel = event.treeModel as TreeModel;
  //   if (treeModel) {
  //     for (let key in treeModel.selectedLeafNodeIds) {
  //       if (treeModel.selectedLeafNodeIds[key]) {
  //         const value = treeModel.selectedLeafNodeIds[key];
  //         const checkbox = this.getCheckboxById(key);
  //         checkbox.checked = value;
  //       }
  //     }
  //   }
  // }

  // private getCheckboxById(id: string): SkyCheckboxComponent {
  //   return this.checkboxes.find(checkbox => {
  //     return checkbox.id.toString() === id;
  //   });
  // }
}
