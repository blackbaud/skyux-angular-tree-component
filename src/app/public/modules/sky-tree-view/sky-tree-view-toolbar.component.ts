import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {
  TreeModel,
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

  public treeModel: TreeModel;

  constructor(
    private skyTreeViewService: SkyTreeViewService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.skyTreeViewService.treeInitialized
      .take(1)
      .subscribe((tree: TreeModel) => {
        this.treeModel = tree;
        this.changeDetectorRef.markForCheck();
      });
  }

  public selectAll(): void {
    this.treeModel.doForAll((node: TreeNode) => {
      const selectable = !node.hasChildren || (node.hasChildren && !this.skyTreeViewService.options.leafNodeSelectionOnly);
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
