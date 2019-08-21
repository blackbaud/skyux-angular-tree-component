import {
  async,
  fakeAsync,
  flush,
  ComponentFixture,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkyTreeViewFixtureComponent
} from './fixtures/tree-view.fixture.component';

import {
  SkyTreeViewFixturesModule
} from './fixtures/tree-view.fixture.module';

describe('tree view', () => {
  let component: SkyTreeViewFixtureComponent;
  let fixture: ComponentFixture<SkyTreeViewFixtureComponent>;

  // #region helpers
  function getToolbar(): HTMLElement {
    return document.querySelector('.sky-angular-tree-toolbar') as HTMLElement;
  }

  function getSelectAllButton(): HTMLElement {
    return document.querySelector('.sky-angular-tree-select-all-btn') as HTMLElement;
  }

  function getClearAllButton(): HTMLElement {
    return document.querySelector('.sky-angular-tree-clear-all-btn') as HTMLElement;
  }

  function getCheckboxes(): NodeListOf<HTMLElement> {
    return document.querySelectorAll('sky-checkbox');
  }

  function getExpandButton(): HTMLElement {
    return document.querySelector('.sky-angular-tree-expand-all-btn') as HTMLElement;
  }

  function getCollapseButton(): HTMLElement {
    return document.querySelector('.sky-angular-tree-collapse-all-btn') as HTMLElement;
  }

  function getNodeContents(): NodeListOf<HTMLElement> {
    return document.querySelectorAll('.node-content-wrapper');
  }

  function getNodeWrappers(): NodeListOf<HTMLElement> {
    return document.querySelectorAll('.node-wrapper');
  }

  function clickSelectAll(): void {
    getSelectAllButton().click();
    tick();
    fixture.detectChanges();
  }

  function clickClearAll(): void {
    getClearAllButton().click();
    tick();
    fixture.detectChanges();
  }

  function clickExpand(): void {
    getExpandButton().click();
    tick();
    fixture.detectChanges();
  }

  function clickCollapse(): void {
    getCollapseButton().click();
    tick();
    fixture.detectChanges();
  }
  // #endregion

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyTreeViewFixturesModule
      ]
    });

    fixture = TestBed.createComponent(SkyTreeViewFixtureComponent) as ComponentFixture<SkyTreeViewFixtureComponent>;
    component = fixture.componentInstance as SkyTreeViewFixtureComponent;
  });

  describe('toolbar', () => {
    it('should show toolbar when showToolbar property is set to true', () => {
      component.showToolbar = true;
      fixture.detectChanges();
      const toolbar = getToolbar();

      expect(toolbar).not.toBeNull();
    });

    it('should hide toolbar when showToolbar property is set to false', () => {
      component.showToolbar = false;
      fixture.detectChanges();
      const toolbar = getToolbar();

      expect(toolbar).toBeNull();
    });

    it('should hide select all / clear all buttons when the tree view does not have checkboxes enabled', () => {
      component.showToolbar = true;
      component.options = {
        useCheckbox: false
      };
      fixture.detectChanges();
      const selectAllButton = getSelectAllButton();
      const clearAllButton = getClearAllButton();

      expect(selectAllButton).toBeNull();
      expect(clearAllButton).toBeNull();
    });

    it('should show select all / clear all buttons when the tree view has checkboxes enabled', () => {
      component.showToolbar = true;
      component.options = {
        useCheckbox: true
      };
      fixture.detectChanges();
      const selectAllButton = getSelectAllButton();
      const clearAllButton = getClearAllButton();

      expect(selectAllButton).not.toBeNull();
      expect(clearAllButton).not.toBeNull();
    });

    it('should select all checkboxes when select all is clicked', fakeAsync(() => {
      component.showToolbar = true;
      component.options = {
        useCheckbox: true
      };
      fixture.detectChanges();
      clickSelectAll();

      const checkboxes = getCheckboxes();
      Array.from(checkboxes).forEach((checkbox) => {
        const input = checkbox.querySelector('input');
        expect(input.checked).toEqual(true);
      });

      fixture.destroy();
      flush();
    }));

    it('should clear all checkboxes when clear all is clicked', fakeAsync(() => {
      component.showToolbar = true;
      component.options = {
        useCheckbox: true
      };
      fixture.detectChanges();
      clickSelectAll();
      clickClearAll();

      const checkboxes = getCheckboxes();
      Array.from(checkboxes).forEach((checkbox) => {
        const input = checkbox.querySelector('input');
        expect(input.checked).toEqual(false);
      });

      fixture.destroy();
      flush();
    }));

    it('should send proper commands to API when expand all / collapse all buttons are clicked', fakeAsync(() => {
      component.showToolbar = true;
      fixture.detectChanges();
      const expandSpy = spyOn(component.treeComponent.treeModel, 'expandAll').and.callThrough();
      const collapseSpy = spyOn(component.treeComponent.treeModel, 'collapseAll').and.callThrough();

      clickExpand();
      expect(expandSpy).toHaveBeenCalledTimes(1);

      clickCollapse();
      expect(collapseSpy).toHaveBeenCalledTimes(1);

      fixture.destroy();
      flush();
    }));
  });

  describe('select mode', () => {
    it('should show sky-checkboxes when useCheckbox is true', () => {
      component.options = {
        useCheckbox: true
      };
      fixture.detectChanges();
      const checkboxes = getCheckboxes();

      expect(checkboxes.length).not.toEqual(0);
    });

    it('should not show sky-checkboxes when useCheckbox is false', () => {
      component.options = {
        useCheckbox: false
      };
      fixture.detectChanges();
      const checkboxes = getCheckboxes();

      expect(checkboxes.length).toEqual(0);
    });

    it('should show a checked sky-checkbox when nodes are selected programatically', fakeAsync(() => {
      component.options = {
        useCheckbox: true,
        useTriState: false
      };
      fixture.detectChanges();
      const checkboxes = getCheckboxes();
      const input = checkboxes[0].querySelector('input');

      // First node should be unchecked.
      expect(input.checked).toBe(false);

      // Programatically select a node using the 3rd party API.
      fixture.nativeElement.querySelector('#updateStateButton').click();
      fixture.detectChanges();

      // First node should now be hecked.
      expect(input.checked).toBe(true);

      fixture.destroy();
      flush();
    }));

    it('should show indeterminate state when parent checkboxes are partially selected in cascade mode', fakeAsync(() => {
      component.options = {
        useCheckbox: true
      };
      fixture.detectChanges();
      const checkboxes = getCheckboxes();

      const parentCheckbox = checkboxes[0].querySelector('input');
      const childCheckbox = checkboxes[1].querySelector('input');

      // Select a child of the first parent.
      childCheckbox.click();

      // Expect the parent checkbox to be checked but also indeterminate.
      expect(parentCheckbox.checked).toBe(true);
      expect(checkboxes[0]).toHaveCssClass('sky-checkbox-indeterminate');

      fixture.destroy();
      flush();
    }));

    it('should select nodes when node content is clicked', fakeAsync(() => {
      component.options = {
        useCheckbox: true
      };
      fixture.detectChanges();
      const checkboxes = getCheckboxes();
      const nodes = getNodeContents();
      const checkbox = checkboxes[0].querySelector('input');

      nodes[0].click();

      expect(checkbox.checked).toBe(true);

      fixture.destroy();
      flush();
    }));

    it('should show selected class when node is selected', fakeAsync(() => {
      component.options = {
        useCheckbox: true
      };
      fixture.detectChanges();
      const checkboxes = getCheckboxes();
      const checkbox = checkboxes[0].querySelector('input');
      const nodeWrappers = getNodeWrappers();

      checkbox.click();

      expect(nodeWrappers[0]).toHaveCssClass('sky-angular-tree-node-selected');

      fixture.destroy();
      flush();
    }));

    it('should hide checkboxes and prevent parent node selection when selectLeafNodesOnly is true', fakeAsync(() => {
      component.options = {
        useCheckbox: true
      };
      component.selectLeafNodesOnly = true;
      fixture.detectChanges();
      const skyCheckboxes = getCheckboxes();
      const nodeWrappers = getNodeWrappers();
      const nodes = getNodeContents();
      const unitedStatesCheckbox = nodeWrappers[0].querySelector('input');
      const indianaCheckbox = nodeWrappers[2].querySelector('input');

      // Expect only leaf nodes should have checkboxes.
      expect(skyCheckboxes.length).toEqual(3);
      expect(unitedStatesCheckbox).toBeNull();
      expect(indianaCheckbox).toBeNull();

      // Click the parent node.
      nodes[0].click();

      // Expect parent node NOT to be selected.
      expect(nodeWrappers[0]).not.toHaveCssClass('sky-angular-tree-node-selected');

      fixture.destroy();
      flush();
    }));

    it('should show and allow parent node selection when selectLeafNodesOnly is false', fakeAsync(() => {
      component.options = {
        useCheckbox: true
      };
      component.selectLeafNodesOnly = false;
      fixture.detectChanges();
      const skyCheckboxes = getCheckboxes();
      const nodeWrappers = getNodeWrappers();
      const nodes = getNodeContents();
      const unitedStatesCheckbox = nodeWrappers[0].querySelector('input');
      const indianaCheckbox = nodeWrappers[2].querySelector('input');

      // Expect all nodes to have checkboxes.
      expect(skyCheckboxes.length).toEqual(5);
      expect(unitedStatesCheckbox).not.toBeNull();
      expect(indianaCheckbox).not.toBeNull();

      // Click the parent node.
      nodes[0].click();

      // Expect parent node to be selected.
      expect(nodeWrappers[0]).toHaveCssClass('sky-angular-tree-node-selected');

      fixture.destroy();
      flush();
    }));

    it('should throw a console warning if sky-angular-tree-wrapper component is not found', () => {
      const warnSpy = spyOn(console, 'warn');
      fixture.detectChanges();

      expect(warnSpy).not.toHaveBeenCalled();

      component.showInvalidTree = true;
      fixture.detectChanges();

      expect(warnSpy).toHaveBeenCalled();
    });

    it('should hide sky-checkboxes when selectSingle is true', fakeAsync(() => {
      component.options = {
        useCheckbox: true,
        useTriState: false
      };
      component.selectSingle = true;
      fixture.detectChanges();
      const skyCheckboxes = getCheckboxes();

      expect(skyCheckboxes.length).toEqual(0);

      fixture.destroy();
      flush();
    }));

    it('should only let users select one node at a time when selectSingle is true', fakeAsync(() => {
      component.options = {
        useCheckbox: true,
        useTriState: false
      };
      component.selectSingle = true;
      fixture.detectChanges();
      const nodeWrappers = getNodeWrappers();
      const nodes = getNodeContents();

      expect(nodeWrappers[0]).not.toHaveCssClass('sky-angular-tree-node-selected');
      expect(nodeWrappers[1]).not.toHaveCssClass('sky-angular-tree-node-selected');
      expect(nodeWrappers[2]).not.toHaveCssClass('sky-angular-tree-node-selected');
      expect(nodeWrappers[3]).not.toHaveCssClass('sky-angular-tree-node-selected');
      expect(nodeWrappers[4]).not.toHaveCssClass('sky-angular-tree-node-selected');

      // Click the first node.
      nodes[0].click();
      fixture.detectChanges();

      // Expect parent node to be selected.
      expect(nodeWrappers[0]).toHaveCssClass('sky-angular-tree-node-selected');
      expect(nodeWrappers[1]).not.toHaveCssClass('sky-angular-tree-node-selected');
      expect(nodeWrappers[2]).not.toHaveCssClass('sky-angular-tree-node-selected');
      expect(nodeWrappers[3]).not.toHaveCssClass('sky-angular-tree-node-selected');
      expect(nodeWrappers[4]).not.toHaveCssClass('sky-angular-tree-node-selected');
      expect(component.selectedLeafNodeIds['1']).toEqual(true);
      expect(component.selectedLeafNodeIds['2']).toBeUndefined();
      expect(component.selectedLeafNodeIds['3']).toBeUndefined();
      expect(component.selectedLeafNodeIds['4']).toBeUndefined();
      expect(component.selectedLeafNodeIds['5']).toBeUndefined();

      // Click a second node.
      nodes[1].click();
      fixture.detectChanges();

      // Expect only second node to be selected.
      expect(nodeWrappers[0]).not.toHaveCssClass('sky-angular-tree-node-selected');
      expect(nodeWrappers[1]).toHaveCssClass('sky-angular-tree-node-selected');
      expect(nodeWrappers[2]).not.toHaveCssClass('sky-angular-tree-node-selected');
      expect(nodeWrappers[3]).not.toHaveCssClass('sky-angular-tree-node-selected');
      expect(nodeWrappers[4]).not.toHaveCssClass('sky-angular-tree-node-selected');
      expect(component.selectedLeafNodeIds['1']).toEqual(false);
      expect(component.selectedLeafNodeIds['2']).toEqual(true);
      expect(component.selectedLeafNodeIds['3']).toBeUndefined();
      expect(component.selectedLeafNodeIds['4']).toBeUndefined();
      expect(component.selectedLeafNodeIds['5']).toBeUndefined();

      fixture.destroy();
      flush();
    }));

    it('should throw a console warning if selectSingle is used with a cascading tree', () => {
      const warnSpy = spyOn(console, 'warn');
      component.options = {
        useCheckbox: true,
        useTriState: true
      };
      component.selectSingle = true;
      fixture.detectChanges();

      expect(warnSpy).toHaveBeenCalled();
    });

    // TODO
    it('should show console warning if both selectSingle and useTriState are true', fakeAsync(() => {

    }));
  });

  describe('keyboard navigation', () => {
    it('should initialize with only the first node being tabbable', () => {
      fixture.detectChanges();
      const nodes = getNodeContents();

      expect(nodes[0].tabIndex).toEqual(0);
      expect(nodes[1].tabIndex).toEqual(-1);
      expect(nodes[2].tabIndex).toEqual(-1);
      expect(nodes[3].tabIndex).toEqual(-1);
      expect(nodes[4].tabIndex).toEqual(-1);
    });

    it('should register focus properties with TreeModel when a node is given focus', fakeAsync(() => {
      fixture.detectChanges();
      const nodes = getNodeContents();

      expect(component.treeComponent.treeModel.isFocused).toEqual(false);
      expect(component.treeComponent.treeModel.focusedNodeId).toBeNull();

      nodes[0].dispatchEvent(new Event('focus'));
      fixture.detectChanges();

      expect(component.treeComponent.treeModel.isFocused).toEqual(true);
      expect(component.treeComponent.treeModel.focusedNodeId).toEqual(1);

      fixture.destroy();
      flush();
    }));

    it('should give the focussed node a tabIndex of 0, and the rest a tabIndex of -1', fakeAsync(() => {
      fixture.detectChanges();
      const nodes = getNodeContents();
      nodes[1].dispatchEvent(new Event('focus'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(nodes[0].tabIndex).toEqual(-1);
      expect(nodes[1].tabIndex).toEqual(0);
      expect(nodes[2].tabIndex).toEqual(-1);
      expect(nodes[3].tabIndex).toEqual(-1);
      expect(nodes[4].tabIndex).toEqual(-1);

      fixture.destroy();
      flush();
    }));

    // TODO
    it('should be able to navigate and activate nodes with the keyboard', fakeAsync(() => {

    }));
  });

  it('should pass accessibility', async(() => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeAccessible();
  }));
});
