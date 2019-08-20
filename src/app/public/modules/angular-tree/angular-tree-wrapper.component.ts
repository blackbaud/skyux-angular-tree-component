import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input
} from '@angular/core';

import {
  TreeComponent,
  TreeNode
} from 'angular-tree-component';

@Component({
  selector: 'sky-angular-tree-wrapper',
  templateUrl: './angular-tree-wrapper.component.html',
  styleUrls: ['./angular-tree-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAngularTreeWrapperComponent implements AfterViewInit {

  @Input()
  public selectLeafNodesOnly: boolean = false;

  @Input()
  public selectSingle: boolean = false;

  @Input()
  public set showToolbar(value: boolean) {
    this._showToolbar = value;
  }

  public get showToolbar(): boolean {
    return this._showToolbar || false;
  }

  @ContentChild(TreeComponent)
  public treeComponent: TreeComponent;

  private _showToolbar: boolean;

  public ngAfterViewInit(): void {
    if (this.selectSingle && this.treeComponent.treeModel.options.useTriState) {
      console.warn(
        'Single select mode should not be enabled while the tree is in triState mode (cascading selection). '
        + 'Please set "useTriState" to "false" if you want to remain in single select mode.'
      );
    }
  }

  public onClearAllClick(): void {
    if (!this.selectSingle) {
      this.treeComponent.treeModel.doForAll((node: TreeNode) => {
        const selectable = node.isSelectable && !(node.hasChildren && this.selectLeafNodesOnly);
        if (selectable) {
          node.setIsSelected(false);
        }
      });
    }
  }

  public onCollapseAllClick(): void {
    this.treeComponent.treeModel.collapseAll();
  }

  public onExpandAllClick(): void {
    this.treeComponent.treeModel.expandAll();
  }

  public onSelectAllClick(): void {
    if (!this.selectSingle) {
      this.treeComponent.treeModel.doForAll((node: TreeNode) => {
        const selectable = node.isSelectable && !(node.hasChildren && this.selectLeafNodesOnly);
        if (selectable) {
          node.setIsSelected(true);
        }
      });
    }
  }

  public showSelectButtons(): boolean {
    return this.treeComponent.treeModel.options.useCheckbox && !this.selectSingle;
  }
}
