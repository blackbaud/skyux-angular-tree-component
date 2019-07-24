import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

import {
  IActionMapping,
  ITreeOptions
} from 'angular-tree-component';

@Component({
  selector: 'sky-angular-grid-visual',
  templateUrl: './angular-tree-visual.component.html',
  styleUrls: ['./angular-tree-visual.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAngularTreeVisualComponent {
  public nodes: any[] = [
    {
      id: 1,
      name: 'United States',
      children: [
        { id: 2, name: 'Alabama' },
        { id: 3, name: 'Alaska' },
        { id: 4, name: 'Arizona' },
        { id: 5, name: 'Arkansas' },
        { id: 6, name: 'California' },
        { id: 7, name: 'Colorado' },
        { id: 8, name: 'Deleware' },
        { id: 9, name: 'Florida', disabled: true },
        { id: 10, name: 'Georgia' },
        { id: 11, name: 'Hawaii' },
        { id: 12, name: 'Idaho' },
        { id: 13, name: 'Illinois' },
        { id: 14, name: 'Indiana', children: [
          { id: 15, name: 'Adams' },
          { id: 16, name: 'Allen' },
          { id: 17, name: 'Bartholomew' },
          { id: 18, name: 'Benton' },
          { id: 19, name: 'Blackford' },
          { id: 20, name: 'Boone' },
          { id: 21, name: 'Brown' },
          { id: 22, name: 'Caroll' },
          { id: 23, name: 'Cass' }
          ]
        }
      ]
    },
    {
      id: 24,
      name: 'Canada',
      children: [
        { id: 25, name: 'Alberta' },
        { id: 26, name: 'British Columbia' },
        { id: 27, name: 'Manitoba' },
        { id: 28, name: 'Ontario' },
        { id: 29, name: 'Quebec' },
        { id: 30, name: 'Saskatchewan' }
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

  public actionMapping: IActionMapping = {
    mouse: {
      click: (tree, node) => this.check(node, !node.data.checked)
    }
  };

  public options: ITreeOptions = {
    // useCheckbox: true,
    // useTriState: false
    allowDrag: true
  };

  public check(node: any, checked: any): void {
    console.log(node, checked);
    this.updateChildNodeCheckbox(node, checked);
    this.updateParentNodeCheckbox(node.realParent);
  }

  public updateChildNodeCheckbox(node: any, checked: any): void {
    node.data.checked = checked;
    node.data.indeterminate = false;
    if (node.children) {
      node.children.forEach((child: any) => {
        if (child.data && !child.data.disabled) {
          this.updateChildNodeCheckbox(child, checked);
        }
      });
    }
  }

  public updateParentNodeCheckbox(node: any): void {
    if (!node) {
      return;
    }

    let allChildrenChecked = true;
    let noChildChecked = true;

    for (const child of node.children) {
      if (!child.data.checked || child.data.indeterminate) {
        allChildrenChecked = false;
      }
      if (child.data.checked) {
        noChildChecked = false;
      }
    }

    if (allChildrenChecked) {
      node.data.checked = true;
      node.data.indeterminate = false;
    } else if (noChildChecked) {
      node.data.checked = false;
      node.data.indeterminate = false;
    } else {
      node.data.checked = true;
      node.data.indeterminate = true;
    }
    this.updateParentNodeCheckbox(node.parent);
  }

  public actionClicked(action: string, tree: any, node: any): void {
    alert('You selected ' + action);
    if (action === 'Insert an item at this level') {
      this.addNode(tree, node);
    }
  }

  public addNode(tree: any, node: any): void {
    this.nodes.push({
      id: 99,
      name: 'Mexico'
    });
    tree.treeModel.update();
  }
}
