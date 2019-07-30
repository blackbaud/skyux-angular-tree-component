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
  public options: SkyTreeViewOptions;

  @ContentChild(TreeComponent)
  private treeComponent: TreeComponent;

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
}
