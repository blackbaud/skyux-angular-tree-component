import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Optional,
  ViewChild
} from '@angular/core';

import {
  ITreeState,
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
export class SkyAngularTreeNodeComponent implements AfterViewInit, OnInit {

  /**
   * Specifies the `index` property from the parent `ng-template`.
   */
  @Input()
  public index: number;

  /**
   * Specifies the `node` property from the parent `ng-template`. This property accepts `TreeNode` values.
   * For information about the `TreeNode` object, see the
   * [Angular tree component documentation](https://angular2-tree.readme.io/docs/api).
   */
  @Input()
  public node: TreeNode;

  /**
   * Specifies the `templates` property from the parent `ng-template`.
   */
  @Input()
  public templates: any;

  /**
   * @internal
   */
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

  /**
   * @internal
   */
  public get childFocusIndex(): number {
    return this._childFocusIndex;
  }

  /**
   * @internal
   */
  public set focused(value: boolean) {
    this.tabIndex = value ? 0 : -1;
    if (value) {
      this.nodeContentWrapperRef.nativeElement.focus();
    }
  }

  /**
   * @internal
   */
  public set isPartiallySelected(value: boolean) {
    if (value !== this._isPartiallySelected) {
      this._isPartiallySelected = value;
      this.changeDetectorRef.markForCheck();
    }
  }

  /**
   * @internal
   */
  public get isPartiallySelected(): boolean {
    return this._isPartiallySelected;
  }

  /**
   * @internal
   */
  public set isSelected(value: boolean) {
    if (value !== this._isSelected) {
      this._isSelected = value;
      this.changeDetectorRef.markForCheck();
    }
  }

  /**
   * @internal
   */
  public get isSelected(): boolean {
    return this._isSelected;
  }

  /**
   * @internal
   */
  public set tabIndex(value: number) {
    this._tabIndex = value;
  }

  /**
   * @internal
   */
  public get tabIndex(): number {
    return this._tabIndex;
  }

  @ViewChild('nodeContentWrapper', { read: ElementRef })
  private nodeContentWrapperRef: ElementRef;

  private focusableChildren: HTMLElement[] = [];

  private _childFocusIndex: number;

  private _isPartiallySelected: boolean;

  private _isSelected: boolean;

  private _tabIndex: number = -1;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private adapterService: SkyAngularTreeAdapterService,
    @Optional() private skyAngularTreeWrapper: SkyAngularTreeWrapperComponent
  ) { }

  /**
   * Angular's ngOnInit lifecycle hook.
   * @internal
   */
  public ngOnInit(): void {
    if (!this.skyAngularTreeWrapper) {
      console.error(`<sky-angular-tree-node-wrapper> must be wrapped inside a <sky-angular-tree-wrapper> component.`);
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

  /**
   * Angular's ngAfterViewInit lifecycle hook.
   * @internal
   */
  public ngAfterViewInit(): void {
    // Wait 1s for the node to render, then reset all child tabIndexes to -1.
    // Units smaller than 1s may consistently fail if there are many nodes, or multiple trees are on the same screen.
    setTimeout(() => {
      this.focusableChildren = this.adapterService.getFocusableChildren(this.nodeContentWrapperRef.nativeElement);
      this.adapterService.setTabIndexOfFocusableElems(this.nodeContentWrapperRef.nativeElement, -1);
    }, 1000);
  }

  /**
   * If single-select, set aria-selected=true for the selected node and undefined for all the others.
   * For multiple-select, set aria-selected to either true or false.
   * If node cannot be selected, aria-selected should be undefined (e.g. parent nodes in leaf-select-only mode).
   * @internal
   */
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

  /**
   * @internal
   */
  public showCheckbox(): boolean {
    // Check for checkbox mode enabled, but also respect leaf-node and single-select settings.
    return this.node.options.useCheckbox && this.isSelectable() && !this.skyAngularTreeWrapper.selectSingle;
  }

  /**
   * @internal
   */
  public showSelectedClass(): boolean {
    return this.isSelectable() && this.isSelected && !this.isPartiallySelected;
  }

  /**
   * @internal
   */
  public showActiveClass(): boolean {
    return this.node.isActive && !this.node.treeModel.options.useCheckbox;
  }

  /**
   * @internal
   */
  public onFocus(): void {
    this.node.treeModel.setFocus(true);
    this.node.focus();
    this.childFocusIndex = undefined;
  }

  /**
   * @internal
   */
  public onKeyDown(event: KeyboardEvent): void {
    /* istanbul ignore else */
    if (document.activeElement === event.target) {
      const key = event.key.toLowerCase();
      switch (key) {
        case 'up':
        case 'arrowup':
          // Focus on previous node.
          this.node.treeModel.focusPreviousNode();
          break;

        case 'down':
        case 'arrowdown':
          // Focus on next node.
          this.node.treeModel.focusNextNode();
          break;

        case 'left':
        case 'arrowleft':
          // Cycle backwards through interactive child elements
          // If user reaches the beginning, activate drill up.
          /* istanbul ignore else */
          if (this.childFocusIndex !== undefined) {
            if (this.childFocusIndex === 0) {
              this.childFocusIndex = undefined;
            } else {
              this.childFocusIndex--;
            }
          } else {
            this.node.setIsExpanded(false);
          }
          event.stopPropagation();
          event.preventDefault();
          break;

        case 'right':
        case 'arrowright':
          // Cyle forward through interactive child elements.
          // If user reaches the end, activate drill down.
          /* istanbul ignore else */
          if (this.focusableChildren.length <= 0 || this.childFocusIndex === this.focusableChildren.length - 1) {
            this.node.setIsExpanded(true);
          } else {
            if (this.childFocusIndex === undefined) {
              this.childFocusIndex = 0;
            } else {
              this.childFocusIndex++;
            }
          }
          event.stopPropagation();
          event.preventDefault();
          break;

        default:
          break;
      }
    }
  }

  private isSelectable(): boolean {
    if (this.skyAngularTreeWrapper) {
      return this.node.isLeaf || !this.node.hasChildren || !this.skyAngularTreeWrapper.selectLeafNodesOnly;
    }
  }
}
