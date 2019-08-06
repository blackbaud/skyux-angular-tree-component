import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input
} from '@angular/core';

import {
  TreeComponent,
  TreeNode
} from 'angular-tree-component';

import {
  SkyAngularTreeOptions
} from './types/angular-tree-options';

@Component({
  selector: 'sky-angular-tree-root',
  templateUrl: './angular-tree-root.component.html',
  styleUrls: ['./angular-tree-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAngularTreeRootComponent {

  @Input()
  public set options(value: SkyAngularTreeOptions) {
    this._options = value;
  }

  public get options(): SkyAngularTreeOptions {
    const defaultOptions: SkyAngularTreeOptions = {
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

  private _options: SkyAngularTreeOptions;

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
