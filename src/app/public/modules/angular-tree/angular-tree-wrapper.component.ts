import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnInit
} from '@angular/core';

import {
  KEYS,
  TreeComponent,
  TreeNode
} from 'angular-tree-component';

@Component({
  selector: 'sky-angular-tree-wrapper',
  templateUrl: './angular-tree-wrapper.component.html',
  styleUrls: ['./angular-tree-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAngularTreeWrapperComponent implements AfterViewInit, OnInit {

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

  public ngOnInit() {
    this.overrideActionMapping();
  }

  public ngAfterViewInit(): void {
    if (this.selectSingle && this.treeComponent.treeModel.options.useTriState) {
      console.warn(
        'Single select mode should not be enabled while the tree is in triState mode (cascading selection). '
        + 'Please set "useTriState" to "false" if you want to remain in single select mode.'
      );
    }
  }

  public onClearAllClick(): void {
    const focusedNode = this.treeComponent.treeModel.getFocusedNode();
    /* istanbul ignore else */
    if (!this.selectSingle) {
      this.treeComponent.treeModel.doForAll((node: TreeNode) => {
        const selectable = node.isSelectable && !(node.hasChildren && this.selectLeafNodesOnly);
        /* istanbul ignore else */
        if (selectable) {
          node.setIsSelected(false);
          this.treeComponent.treeModel.setFocusedNode(focusedNode);
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
    const focusedNode = this.treeComponent.treeModel.getFocusedNode();
    /* istanbul ignore else */
    if (!this.selectSingle) {
      this.treeComponent.treeModel.doForAll((node: TreeNode) => {
        const selectable = node.isSelectable && !(node.hasChildren && this.selectLeafNodesOnly);
        /* istanbul ignore else */
        if (selectable) {
          node.setIsSelected(true);
          this.treeComponent.treeModel.setFocusedNode(focusedNode);
        }
      });
    }
  }

  public showSelectButtons(): boolean {
    return this.treeComponent.treeModel.options.useCheckbox && !this.selectSingle;
  }

  private overrideActionMapping(): void {
    const defaultActionMapping = this.treeComponent.treeModel.options.actionMapping;

    // Override space/enter key controls to manually control actions in the nodeDefaultAction() method.
    defaultActionMapping.keys[KEYS.SPACE] = undefined;
    defaultActionMapping.keys[KEYS.ENTER] = undefined;

    // Override left/right arrow keys to support navigating through interactive elements with keyboard.
    defaultActionMapping.keys[KEYS.RIGHT] = undefined;
    defaultActionMapping.keys[KEYS.LEFT] = undefined;
  }
}
