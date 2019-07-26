import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  ViewChildren,
  QueryList,
  AfterContentInit
} from '@angular/core';

import {
  ITreeOptions,
  TreeNode,
  TreeComponent,
  ITreeState,
  TreeModel,
  TREE_ACTIONS
} from 'angular-tree-component';

import {
  SkyCheckboxComponent,
  SkyCheckboxChange
} from '@skyux/forms';

@Component({
  selector: 'sky-angular-grid-visual',
  templateUrl: './angular-tree-visual.component.html',
  styleUrls: ['./angular-tree-visual.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAngularTreeVisualComponent implements AfterContentInit {
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

  public dropdownItems: any = [
    { name: 'Insert an item at this level', disabled: false },
    { name: 'Insert an item under this level', disabled: false },
    { name: 'Move up', disabled: false },
    { name: 'Move down', disabled: false },
    { name: 'Move left', disabled: false },
    { name: 'Move right', disabled: false },
    { name: 'Edit', disabled: false },
    { name: 'Delete', disabled: false }
  ];

  // public actionMapping: IActionMapping = {
  //   mouse: {
  //     click: (tree, node) => this.check(node, !node.data.checked)
  //   }
  // };

  public options: ITreeOptions = {
    allowDrag: true,
    useCheckbox: true,
    useTriState: true
  };

  public treeState: ITreeState;

  @ViewChildren(SkyCheckboxComponent)
  private checkboxes: QueryList<SkyCheckboxComponent> = new QueryList<SkyCheckboxComponent>();

  constructor() {
  }

  public ngAfterContentInit(): void {
    this.checkboxes.changes.subscribe(foo => {
      console.log(foo);
    });
  }

  public onCheckboxChange(tree: TreeComponent, node: TreeNode, event: SkyCheckboxChange): void {
    // tree.treeModel.setSelectedNode(node, event.checked);
    TREE_ACTIONS.TOGGLE_SELECTED(tree.treeModel, node, event);
  }

  public actionClicked(action: string, tree: any, node: any): void {
    alert('You selected ' + action);
    // if (action === 'Insert an item at this level') {
    //   this.addNode(tree, node);
    // }
  }

  public addNode(tree: any, node: any): void {
    this.nodes.push({
      id: 99,
      name: 'Mexico'
    });
    tree.treeModel.update();
  }

  public onSelect(event: any): void {
    // const node = event.node as TreeNode;
    // const foundCheckbox = this.getCheckboxById(node.id.toString());
    // foundCheckbox.checked = true;
    console.log(event);
  }

  public onDeselect(event: any): void {
    // const node = event.node as TreeNode;
    // const foundCheckbox = this.getCheckboxById(node.id.toString());
    // foundCheckbox.checked = false;
    console.log(event);
  }

  public isSelected(node: TreeNode): boolean {
    return node.isSelected;
  }

  public isIndeterminate(node: TreeNode): boolean {
    return node.isPartiallySelected;
  }

  public onUpdateData(event: any): void {
    const treeModel = event.treeModel as TreeModel;
    if (treeModel) {
      for (let key in treeModel.selectedLeafNodeIds) {
        if (treeModel.selectedLeafNodeIds[key]) {
          const value = treeModel.selectedLeafNodeIds[key];
          const checkbox = this.getCheckboxById(key);
          checkbox.checked = value;
        }
      }
    }
  }

  public onStateChange(event: any): void {
    console.log(event);
  }

  private getCheckboxById(id: string): SkyCheckboxComponent {
    return this.checkboxes.find(checkbox => {
      return checkbox.id.toString() === id;
    });
  }
}
