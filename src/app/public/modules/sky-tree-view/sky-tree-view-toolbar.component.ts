import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {
  TreeComponent,
  TreeNode
} from 'angular-tree-component';

import {
  SkyTreeViewService
} from './sky-tree-view.service';

@Component({
  selector: 'sky-tree-view-toolbar',
  templateUrl: './sky-tree-view-toolbar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTreeViewToolbarComponent implements OnInit {

  public tree: TreeComponent;

  constructor(
    private skyTreeViewService: SkyTreeViewService
  ) { }

  public ngOnInit(): void {
    // const tree = this.skyTreeViewService.tree;
    // tree.initialized.subscribe((foo: any) => {
    //   console.log(foo);
    // });
  }

  public selectAll(): void {
    this.tree.treeModel.doForAll((node: TreeNode) => {
      const selectable = !node.hasChildren || (node.hasChildren && !this.skyTreeViewService.options.leafNodeSelectionOnly);
      if (selectable) {
        node.setIsSelected(true);
      }
    });
  }

  public deselectAll(): void {
    this.tree.treeModel.doForAll((node: TreeNode) => {
      if (node.isSelectable()) {
        node.setIsSelected(false);
      }
    });
  }

}
