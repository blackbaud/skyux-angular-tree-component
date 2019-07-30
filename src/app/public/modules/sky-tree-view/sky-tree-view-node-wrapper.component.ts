import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {
  TREE_ACTIONS,
  TreeNode
} from 'angular-tree-component';

import {
  BehaviorSubject
} from 'rxjs';

import {
  SkyCheckboxChange
} from '@skyux/forms';

import {
  SkyTreeViewService
} from './sky-tree-view.service';

@Component({
  selector: 'sky-tree-view-node-wrapper',
  templateUrl: './sky-tree-view-node-wrapper.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTreeViewNodeWrapperComponent implements OnInit {

  @Input()
  public index: number;

  @Input()
  public node: TreeNode;

  public isHidden: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private skyTreeViewService: SkyTreeViewService
  ) {}

  public ngOnInit(): void {
    this.skyTreeViewService.treeInitialized
      .take(1)
      .subscribe(() => {
        const hidden = this.skyTreeViewService.options.leafNodeSelectionOnly && this.node.hasChildren;
        this.isHidden.next(hidden);
      });
  }

  public onCheckboxChange(event: SkyCheckboxChange): void {
    this.toggleSelected(event);
    this.node.setIsActive(event.checked);
  }

  // public onNodeContentClick(tree: TreeComponent, node: TreeNode, event: any): void {
  //   if (this.tree.treeModel.options.useCheckbox) {
  //     this.toggleSelected(tree, node, event);
  //   }
  // }

  private toggleSelected(event: any) {
    TREE_ACTIONS.TOGGLE_SELECTED(this.node.treeModel, this.node, event);
  }
}
