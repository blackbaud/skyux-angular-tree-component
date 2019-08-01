import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'sky-tree-view-toolbar',
  templateUrl: './sky-tree-view-toolbar.component.html',
  encapsulation: ViewEncapsulation.None,
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

  public clearAll(): void {
    this.clearAllClick.emit();
  }

  public collapseAll(): void {
    this.collapseAllClick.emit();
  }

  public expandAll(): void {
    this.expandAllClick.emit();
  }

  public selectAll(): void {
    this.selectAllClick.emit();
  }

}
