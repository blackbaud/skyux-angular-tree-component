import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  TreeComponent,
  TreeNode
} from 'angular-tree-component';

@Component({
  selector: 'sky-angular-tree-toolbar',
  templateUrl: './angular-tree-toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTreeViewToolbarComponent {

  @Input()
  public treeComponent: TreeComponent;

  @Output()
  public clearAllClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public collapseAllClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public expandAllClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public selectAllClick: EventEmitter<void> = new EventEmitter<void>();

  public clearAll(): void {
    this.treeComponent.treeModel.doForAll((node: TreeNode) => {
      if (node.isSelectable()) {
        node.setIsSelected(false);
      }
    });
  }

  public collapseAll(): void {
    this.treeComponent.treeModel.collapseAll();
  }

  public expandAll(): void {
    this.treeComponent.treeModel.expandAll();
  }

  public selectAll(): void {
    this.treeComponent.treeModel.doForAll((node: TreeNode) => {
      if (node.isSelectable()) {
        node.setIsSelected(true);
      }
    });
  }

  public showSelectButtons(): boolean {
    return this.treeComponent.treeModel.options.useCheckbox;
  }

}
