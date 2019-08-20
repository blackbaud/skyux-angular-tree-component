import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'sky-angular-tree-toolbar',
  templateUrl: './angular-tree-toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTreeViewToolbarComponent {

  // TODO: show/hide select/clear all when in different modes.

  @Input()
  public showSelectButtons: boolean;

  @Output()
  public clearAllClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public collapseAllClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public expandAllClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public selectAllClick: EventEmitter<void> = new EventEmitter<void>();

  public onCollapseAllClick() {
    this.collapseAllClick.emit();
  }

  public onExpandAllClick() {
    this.expandAllClick.emit();
  }

  public onSelectAllClick() {
    this.selectAllClick.emit();
  }

  public onClearAllClick() {
    this.clearAllClick.emit();
  }

}
