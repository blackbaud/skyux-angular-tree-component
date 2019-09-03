import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Optional,
  ViewChild
} from '@angular/core';

import {
  SkyCheckboxChange
} from '@skyux/forms';

import {
  ITreeState,
  TREE_ACTIONS,
  TreeModel,
  TreeNode
} from 'angular-tree-component';

import {
  SkyAngularTreeWrapperComponent
} from './angular-tree-wrapper.component';

@Component({
  selector: 'sky-angular-tree-node-wrapper',
  templateUrl: './angular-tree-node-wrapper.component.html'
})
export class SkyAngularTreeNodeWrapperComponent implements OnInit {

  @Input()
  public index: number;

  @Input()
  public node: TreeNode;

  @Input()
  public templates: any;

  public set tabIndex(value: number) {
    this._tabIndex = value;
  }

  public get tabIndex(): number {
    return this._tabIndex;
  }

  public set focused(value: boolean) {
    this.tabIndex = value ? 0 : -1;
    if (value) {
      this.nodeContentWrapperRef.nativeElement.focus();
    }
  }

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

  @ViewChild('nodeContentWrapper')
  public nodeContentWrapperRef: ElementRef;

  private _isPartiallySelected: boolean;

  private _isSelected: boolean;

  private _tabIndex: number = -1;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() private skyAngularTreeWrapper: SkyAngularTreeWrapperComponent
  ) { }

  public ngOnInit(): void {
    // Because we're binding the checkbox to node's children properties, we need to manually control change detection.
    // Here, we listen to the tree's state and force change detection in the setters if the value has changed.
    this.node.treeModel.subscribeToState((state: ITreeState) => {
      this.isSelected = this.node.isSelected;
      this.isPartiallySelected = this.node.isPartiallySelected;

      if (state.focusedNodeId) {
        this.focused = state.focusedNodeId === this.node.id;
      }
    });

    // On init, make first root node tabbable.
    if (this.node.isRoot && this.node.index === 0) {
      this.tabIndex = 0;
    }

    if (!this.skyAngularTreeWrapper) {
      console.warn(`<sky-angular-tree-node-wrapper> should be wrapped inside a <sky-angular-tree-wrapper> component.`);
    }
  }

  public onCheckboxChange(node: TreeNode, event: SkyCheckboxChange): void {
    this.toggleSelected(node, node.treeModel, event);
    node.setIsActive(event.checked);
  }

  public onNodeContentClick(node: TreeNode, event: any): void {
    if (this.node.options.useCheckbox && this.isSelectable()) {
      this.toggleSelected(node, node.treeModel, event);
    }
    this.node.mouseAction('click', event);
  }

  public showCheckbox(): boolean {
    // Check for checkbox mode enabled, but also respect leaf-node and single-select settings.
    return this.node.options.useCheckbox && this.isSelectable() && !this.skyAngularTreeWrapper.selectSingle;
  }

  public showSelectedClass(): boolean {
    return this.isSelectable() && this.isSelected && !this.isPartiallySelected;
  }

  public showActiveClass(): boolean {
    return this.node.isActive && !this.node.treeModel.options.useCheckbox;
  }

  public onFocus(): void {
    this.node.treeModel.setFocus(true);
    this.node.focus();
  }

  private isSelectable(): boolean {
    if (this.skyAngularTreeWrapper) {
      return this.node.isLeaf || !this.node.hasChildren || !this.skyAngularTreeWrapper.selectLeafNodesOnly;
    }
  }

  private toggleSelected(node: TreeNode, tree: TreeModel, event: any): void {
    // If single selection only is enabled and user is selecting this node, first de-select all other nodes.
    if (this.skyAngularTreeWrapper.selectSingle && !this.isSelected) {
      const selectedNodes = node.treeModel.selectedLeafNodes;
      selectedNodes
        .forEach((n: TreeNode) => {
          n.setIsSelected(false);
        });
    }

    TREE_ACTIONS.TOGGLE_SELECTED(tree, node, event);
  }
}
