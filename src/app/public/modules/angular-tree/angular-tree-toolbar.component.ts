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

  public onClearAllClick() {
    this.clearAllClick.emit();
  }

  public onCollapseAllClick() {
    this.collapseAllClick.emit();
  }

  public onExpandAllClick() {
    this.expandAllClick.emit();
  }

  public onSelectAllClick() {
    this.selectAllClick.emit();
  }

}
