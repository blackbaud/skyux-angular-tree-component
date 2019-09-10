import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Optional,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import {
  ITreeState,
  TREE_ACTIONS,
  TreeNode
} from 'angular-tree-component';

import {
  SkyAngularTreeAdapterService
} from './angular-tree-adapter.service';

import {
  SkyAngularTreeWrapperComponent
} from './angular-tree-wrapper.component';

@Component({
  selector: 'sky-angular-tree-node',
  templateUrl: './angular-tree-node.component.html'
})
export class SkyAngularTreeNodeComponent implements OnInit, AfterViewInit {

  @Input()
  public index: number;

  @Input()
  public node: TreeNode;

  @Input()
  public templates: any;

  public set childFocusIndex(value: number) {
    if (value !== this._childFocusIndex) {
      this._childFocusIndex = value;
      if (this.focusableChildren.length > 0 && value !== undefined) {
        this.focusableChildren[value].focus();
      } else {
        this.nodeContentWrapperRef.nativeElement.focus();
      }
    }
  }

  public get childFocusIndex(): number {
    return this._childFocusIndex;
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

  public set tabIndex(value: number) {
    this._tabIndex = value;
  }

  public get tabIndex(): number {
    return this._tabIndex;
  }

  @ViewChild('nodeContentWrapper')
  public nodeContentWrapperRef: ElementRef;

  private _childFocusIndex: number;

  private focusableChildren: HTMLElement[];

  private _isPartiallySelected: boolean;

  private _isSelected: boolean;

  private _tabIndex: number = -1;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private adapterService: SkyAngularTreeAdapterService,
    @Optional() private skyAngularTreeWrapper: SkyAngularTreeWrapperComponent
  ) { }

  public ngOnInit(): void {
    if (!this.skyAngularTreeWrapper) {
      console.warn(`<sky-angular-tree-node-wrapper> should be wrapped inside a <sky-angular-tree-wrapper> component.`);
    }

    // Because we're binding the checkbox to node's children properties, we need to manually control change detection.
    // Here, we listen to the tree's state and force change detection in the setters if the value has changed.
    this.node.treeModel.subscribeToState((state: ITreeState) => {
      this.isSelected = this.node.isSelected;
      this.isPartiallySelected = this.node.isPartiallySelected;

      if (state.focusedNodeId) {
        this.focused = state.focusedNodeId === this.node.id;
      }
    });

    // Make the first root node tabbable.
    if (this.node.isRoot && this.node.index === 0) {
      this.tabIndex = 0;
    }
  }

  public ngAfterViewInit(): void {
    // Wait for node to render, then reset all child tabIndexes to -1.
    setTimeout(() => {
      this.focusableChildren = this.adapterService.getFocusableChildren(this.nodeContentWrapperRef.nativeElement);
      this.adapterService.setTabIndexOfFocusableElems(this.nodeContentWrapperRef.nativeElement, -1);
    });
  }

  // If tree is set to single-select, set aria-selected to true for the selected node and undefined for all the others.
  // For multiple-select trees, set aria-selected to node's selected value.
  // If node cannot be selected, aria-selected should be undefined.
  public ariaSelected(): boolean {
    if (!this.skyAngularTreeWrapper) {
      return;
    }

    if (this.skyAngularTreeWrapper.selectSingle) {
      return this.isSelected ? true : undefined;
    }

    if (!this.isSelectable()) {
      return;
    }

    return !!this.isSelected;
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
    this.childFocusIndex = undefined;
  }

  public nodeDefaultAction(event: any): void {
    if (this.node.options.useCheckbox && this.isSelectable()) {
      this.toggleSelected(event);
    }
    this.node.mouseAction('click', event);
  }

  // Cycle backwards through interactive elements, and once user reaches the end, activate drill up.
  public onArrowLeft(event: KeyboardEvent): void {
    if (document.activeElement === event.target) {
      if (this.childFocusIndex !== undefined) {
        if (this.childFocusIndex === 0) {
          this.childFocusIndex = undefined;
        } else {
          this.childFocusIndex--;
        }
      } else {
        this.node.treeModel.focusDrillUp();
      }
      event.stopPropagation();
    }
  }

  // Cyle forward through interactive elements, and once user reaches the end, activate drill down.
  public onArrowRight(event: KeyboardEvent): void {
    if (document.activeElement !== event.target) {
      return;
    }

    if (this.focusableChildren.length <= 0 || this.childFocusIndex === this.focusableChildren.length - 1) {
      this.node.treeModel.focusDrillDown();
    } else {
      if (this.childFocusIndex === undefined) {
        this.childFocusIndex = 0;
      } else {
        this.childFocusIndex++;
      }
    }

    event.stopPropagation();
  }

  private isSelectable(): boolean {
    if (this.skyAngularTreeWrapper) {
      return this.node.isLeaf || !this.node.hasChildren || !this.skyAngularTreeWrapper.selectLeafNodesOnly;
    }
  }

  private toggleSelected(event: any): void {
    // If single selection only is enabled and user is selecting this node, first de-select all other nodes.
    if (this.skyAngularTreeWrapper.selectSingle && !this.isSelected) {
      const selectedNodes = this.node.treeModel.selectedLeafNodes;
      selectedNodes
        .forEach((n: TreeNode) => {
          n.setIsSelected(false);
        });
    }

    TREE_ACTIONS.TOGGLE_SELECTED(this.node.treeModel, this.node, event);
  }
}
