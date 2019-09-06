import { Injectable } from '@angular/core';
import { SkyCoreAdapterService } from '@skyux/core';

@Injectable()
export class SkyAngularTreeAdapterService {

  constructor(
    private skyAdapterService: SkyCoreAdapterService
  ) { }

  public getFocusableChildren(element: HTMLElement): HTMLElement[] {
    return this.skyAdapterService.getFocusableChildren(element);
  }

  public setTabIndexOfFocusableElems(element: HTMLElement, tabIndex: number) {
    const focusableElems = this.skyAdapterService.getFocusableChildren(element);
    let index = focusableElems.length;
    while (index--) {
      focusableElems[index].tabIndex = tabIndex;
    }
  }

  public focusNext(element: HTMLElement): void {
      const focusableElems = this.skyAdapterService.getFocusableChildren(element);

      focusableElems.forEach((el: HTMLElement, index: number) => {
        if (el === document.activeElement) {
          focusableElems[index + 1].focus();
        }
      });
  }

}
