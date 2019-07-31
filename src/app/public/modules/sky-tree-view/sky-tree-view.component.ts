import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {
  TreeComponent, TreeModel
} from 'angular-tree-component';

import {
  SkyTreeViewOptions
} from './types/sky-tree-view-options';

import {
  SkyTreeViewService
} from './sky-tree-view.service';

@Component({
  selector: 'sky-tree-view',
  templateUrl: './sky-tree-view.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SkyTreeViewService]
})
export class SkyTreeViewComponent implements AfterContentInit, OnInit {

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
  private treeComponent: TreeComponent;

  private _options: SkyTreeViewOptions;

  private _showToolbar: boolean;

  constructor(
    private skyTreeViewService: SkyTreeViewService
  ) { }

  public ngOnInit(): void {
    this.treeComponent.initialized.subscribe((event: {eventName: string, treeModel: TreeModel}) => {
      this.skyTreeViewService.init(event.treeModel, this.options);
    });
  }

  public ngAfterContentInit(): void {
  }

  // private onUpdateData(event: any): void {
  //   const treeModel = event.treeModel as TreeModel;
  //   if (treeModel) {
  //     for (let key in treeModel.selectedLeafNodeIds) {
  //       if (treeModel.selectedLeafNodeIds[key]) {
  //         const value = treeModel.selectedLeafNodeIds[key];
  //         const checkbox = this.getCheckboxById(key);
  //         checkbox.checked = value;
  //       }
  //     }
  //   }
  // }
}
