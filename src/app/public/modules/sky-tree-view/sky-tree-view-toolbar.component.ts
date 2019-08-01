import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

import {
  TreeModel,
  TreeNode
} from 'angular-tree-component';

import {
  SkyTreeViewOptions
} from './types/sky-tree-view-options';

@Component({
  selector: 'sky-tree-view-toolbar',
  templateUrl: './sky-tree-view-toolbar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTreeViewToolbarComponent {

  @Input()
  public treeModel: TreeModel;

  @Input()
  public options: SkyTreeViewOptions;

  public selectAll(): void {
    this.treeModel.doForAll((node: TreeNode) => {
      const selectable = !node.hasChildren || (node.hasChildren && !this.options.leafNodeSelectionOnly);
      if (selectable) {
        node.setIsSelected(true);
      }
    });
  }

  public deselectAll(): void {
    this.treeModel.doForAll((node: TreeNode) => {
      if (node.isSelectable()) {
        node.setIsSelected(false);
      }
    });
  }

}
