import {
  Injectable,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import {
  TreeModel
} from 'angular-tree-component';

import {
  SkyTreeViewOptions
} from './types/sky-tree-view-options';

/**
 *
 */
@Injectable()
export class SkyTreeViewService implements OnDestroy {

  public set options(value: SkyTreeViewOptions) {
    this._options = value;
  }

  public get options(): SkyTreeViewOptions {
    return this._options;
  }

  public set treeModel(value: TreeModel) {
    this._treeComponent = value;
  }

  public get treeModel(): TreeModel {
    return this._treeComponent;
  }

  public treeInitialized = new EventEmitter<TreeModel>();

  private _options: SkyTreeViewOptions = {
    leafNodeSelectionOnly: false
  };

  private _treeComponent: TreeModel;

  constructor() {
  }

  public ngOnDestroy(): void {
    this.treeInitialized.complete();
  }

  public init(treeModel: TreeModel, options: SkyTreeViewOptions) {
    this.options = options;
    this.treeModel = treeModel;
    this.treeInitialized.next(treeModel);
  }

  // TODO: figure out best way to have service handle the tree getting initialized and passed around.
}
