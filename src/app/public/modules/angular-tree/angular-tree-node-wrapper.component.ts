import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Optional
} from '@angular/core';

import {
  TREE_ACTIONS,
  TreeModel,
  TreeNode
} from 'angular-tree-component';

import {
  SkyCheckboxChange
} from '@skyux/forms';

import {
  SkyAngularTreeRootComponent
} from './angular-tree-root.component';

@Component({
  selector: 'sky-angular-tree-node-wrapper',
  templateUrl: './angular-tree-node-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAngularTreeNodeWrapperComponent implements OnInit {

  @Input()
  public index: number;

  @Input()
  public node: TreeNode;

  public set isPartiallySelected(value: boolean) {
    if (value !== this._isPartiallySelected) {
      this._isPartiallySelected = value;
      this.changeDetectorRef.markForCheck();
    }
  }

  public get isPartiallySelected(): boolean {
    return this._isPartiallySelected;
  }

  public set isSelected(value: boolean) {
    if (value !== this._isSelected) {
      this._isSelected = value;
      this.changeDetectorRef.markForCheck();
    }
  }

  public get isSelected(): boolean {
    return this._isSelected;
  }

  private _isPartiallySelected: boolean;

  private _isSelected: boolean;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() private skyTreeView: SkyAngularTreeRootComponent
  ) {}

  public ngOnInit(): void {
    if (!this.skyTreeView) {
      throw new Error(
        'You must wrap the `<sky-angular-tree-node-wrapper>` component within a ' +
        '`<sky-angular-tree-root>` component!'
      );
    }

    // Because we're binding the checkbox to node's children properties, we need to manually control change detection.
    // Here, we listen to the tree's state and force change detection in the setters if the value has changed.
    this.node.treeModel.subscribeToState(() => {
      this.isSelected = this.node.isSelected;
      this.isPartiallySelected = this.node.isPartiallySelected;
    });
  }

  public onCheckboxChange(node: TreeNode, event: SkyCheckboxChange): void {
    this.toggleSelected(node, node.treeModel, event);
    node.setIsActive(event.checked);
  }

  public onNodeContentClick(node: TreeNode, event: any): void {
    if (this.node.options.useCheckbox && !this.isCheckboxHidden()) {
      this.toggleSelected(node, node.treeModel, event);
    }
    this.node.mouseAction('click', event);
  }

  public isCheckboxHidden(): boolean {
    return this.skyTreeView.options.leafNodeSelectionOnly && this.node.hasChildren;
  }

  public getSelectedClass(): boolean {
    return this.isSelected && !this.isPartiallySelected && !this.isCheckboxHidden();
  }

  private toggleSelected(node: TreeNode, tree: TreeModel, event: any): void {
    TREE_ACTIONS.TOGGLE_SELECTED(tree, node, event);
  }
}
