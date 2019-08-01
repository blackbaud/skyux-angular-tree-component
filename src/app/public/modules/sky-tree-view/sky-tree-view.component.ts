import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  ViewEncapsulation
} from '@angular/core';

import {
  TreeComponent,
  TreeNode
} from 'angular-tree-component';

import {
  SkyTreeViewOptions
} from './types/sky-tree-view-options';

@Component({
  selector: 'sky-tree-view',
  templateUrl: './sky-tree-view.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTreeViewComponent {

  @Input()
  public set options(value: SkyTreeViewOptions) {
    this._options = value;
  }

  public get options(): SkyTreeViewOptions {
    const defaultOptions: SkyTreeViewOptions = {
      leafNodeSelectionOnly: false
    };
    return this._options || defaultOptions;
  }

  @Input()
  public set showToolbar(value: boolean) {
    this._showToolbar = value;
  }

  public get showToolbar(): boolean {
    return this._showToolbar || false;
  }

  @ContentChild(TreeComponent)
  public treeComponent: TreeComponent;

  private _options: SkyTreeViewOptions;

  private _showToolbar: boolean;

  public onClearAllClick(): void {
    this.treeComponent.treeModel.doForAll((node: TreeNode) => {
      const selectable = !node.hasChildren || (node.hasChildren && !this.options.leafNodeSelectionOnly);
      if (selectable) {
        node.setIsSelected(false);
      }
    });
  }

  public onCollapseAllClick(): void {
    this.treeComponent.treeModel.collapseAll();
  }

  public onExpandAllClick(): void {
    this.treeComponent.treeModel.expandAll();
  }

  public onSelectAllClick(): void {
    this.treeComponent.treeModel.doForAll((node: TreeNode) => {
      if (node.isSelectable()) {
        node.setIsSelected(true);
      }
    });
  }
}
