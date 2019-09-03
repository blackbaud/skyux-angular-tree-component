import {
  async,
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  expect,
  SkyAppTestUtility
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

  function getSkyCheckboxes(): NodeListOf<HTMLElement> {
    return document.querySelectorAll('sky-checkbox');
  }

  function getCheckboxInputs(): NodeListOf<HTMLInputElement> {
    return document.querySelectorAll('sky-checkbox input');
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
    tick(); // Allow time to apply changes to all buttons.
    fixture.detectChanges(); // Update sky-checkbox.
  }

  function clickClearAll(): void {
    getClearAllButton().click();
    tick(); // Allow time to apply changes to all buttons.
    fixture.detectChanges(); // Update sky-checkbox.
  }

  function clickExpand(): void {
    getExpandButton().click();
  }

  function clickCollapse(): void {
    getCollapseButton().click();
  }

  // Selection helpers
  // Note: validating checkboxes vs nodes should be separate. You may not have a checkbox for every node.
  // For example: Leaf-node only mode will hide checkboxes for parents.
  // expectNodeToBeSelected() will check if the node has proper styles and the tree model is updated correctly.
  // expectCheckboxToBeChecked() will check if our custom implementation of sky-checkbox has the proper checked state.

  // nodeIndex should use 1-based indexes!
  function expectNodeToBeSelected(nodeIndex: number, selected: boolean): void {
    const nodeWrappers = getNodeWrappers();

    if (selected) {
      expect(nodeWrappers[nodeIndex - 1]).toHaveCssClass('sky-angular-tree-node-selected');
      expect(component.selectedLeafNodeIds[nodeIndex]).toEqual(true);
    } else {
      expect(nodeWrappers[nodeIndex - 1]).not.toHaveCssClass('sky-angular-tree-node-selected');
      expect(component.selectedLeafNodeIds[nodeIndex] || false).toEqual(false);
    }
  }

  // nodeIndex should use 1-based indexes!
  function expectCheckboxToBeChecked(nodeIndex: number, selected: boolean): void {
    const checkboxInputs = getCheckboxInputs();
    expect(checkboxInputs[nodeIndex - 1].checked).toEqual(selected);
  }

  function setupCascadingMode(): void {
    component.showToolbar = true;
    component.options = {
      useCheckbox: true,
      useTriState: true
    };
  }

  function setupNonCascadingMode(): void {
    component.showToolbar = true;
    component.options = {
      useCheckbox: true,
      useTriState: false
    };
  }

  function setupLeafSelectOnlyMode(): void {
    setupNonCascadingMode();
    component.selectLeafNodesOnly = true;
  }

  function setupSingleSelectMode(): void {
    setupNonCascadingMode();
    component.selectSingle = true;
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

    it('should hide select all / clear all buttons when useCheckbox is false', () => {
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
      setupCascadingMode();
      fixture.detectChanges();
      const selectAllButton = getSelectAllButton();
      const clearAllButton = getClearAllButton();

      expect(selectAllButton).not.toBeNull();
      expect(clearAllButton).not.toBeNull();
    });

    it('should select all checkboxes when select all is clicked', fakeAsync(() => {
      setupNonCascadingMode();
      fixture.detectChanges();

      clickSelectAll();

      // Note: a "parent" node isn't considered "selected" in triState (cascading) mode.
      // For this test, we have turned triState off, so testing selection is easier.
      expectNodeToBeSelected(1, true);
      expectCheckboxToBeChecked(1, true);

      expectNodeToBeSelected(2, true);
      expectCheckboxToBeChecked(2, true);

      expectNodeToBeSelected(3, true);
      expectCheckboxToBeChecked(3, true);

      expectNodeToBeSelected(4, true);
      expectCheckboxToBeChecked(4, true);

      expectNodeToBeSelected(5, true);
      expectCheckboxToBeChecked(5, true);

      fixture.destroy();
      flush();
    }));

    it('should clear all checkboxes when clear all is clicked', fakeAsync(() => {
      setupCascadingMode();
      fixture.detectChanges();

      clickSelectAll();
      clickClearAll();

      expectNodeToBeSelected(1, false);
      expectCheckboxToBeChecked(1, false);

      expectNodeToBeSelected(2, false);
      expectCheckboxToBeChecked(2, false);

      expectNodeToBeSelected(3, false);
      expectCheckboxToBeChecked(3, false);

      expectNodeToBeSelected(4, false);
      expectCheckboxToBeChecked(4, false);

      expectNodeToBeSelected(5, false);
      expectCheckboxToBeChecked(5, false);

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
      const checkboxes = getSkyCheckboxes();

      expect(checkboxes.length).not.toEqual(0);
    });

    it('should not show sky-checkboxes when useCheckbox is false', () => {
      component.options = {
        useCheckbox: false
      };
      fixture.detectChanges();
      const skyCheckboxes = getSkyCheckboxes();

      expect(skyCheckboxes.length).toEqual(0);
    });

    it('should show a checked sky-checkbox when nodes are selected programatically', fakeAsync(() => {
      setupNonCascadingMode();
      fixture.detectChanges();

      // First node should be unchecked.
      expectNodeToBeSelected(1, false);
      expectCheckboxToBeChecked(1, false);

      // Programatically select a node using the 3rd party API.
      fixture.nativeElement.querySelector('#updateStateButton').click();
      fixture.detectChanges();

      // First node should now be checked.
      expectNodeToBeSelected(1, true);
      expectCheckboxToBeChecked(1, true);

      fixture.destroy();
      flush();
    }));

    it('should show indeterminate state when parent checkboxes are partially selected in cascade mode', fakeAsync(() => {
      setupCascadingMode();
      fixture.detectChanges();
      const skyCheckboxes = getSkyCheckboxes();

      const parentCheckbox = skyCheckboxes[0].querySelector('input');
      const childCheckbox = skyCheckboxes[1].querySelector('input');

      // Select a child of the first parent.
      childCheckbox.click();

      // Expect the parent checkbox to be checked but also indeterminate.
      expect(parentCheckbox.checked).toBe(true);
      expect(skyCheckboxes[0]).toHaveCssClass('sky-checkbox-indeterminate');

      fixture.destroy();
      flush();
    }));

    it('should select nodes when node content is clicked', fakeAsync(() => {
      setupNonCascadingMode();
      fixture.detectChanges();
      const nodes = getNodeContents();

      nodes[0].click();

      expectNodeToBeSelected(1, true);
      expectCheckboxToBeChecked(1, true);

      fixture.destroy();
      flush();
    }));

    it('should select nodes when checkbox is clicked', fakeAsync(() => {
      setupNonCascadingMode();
      fixture.detectChanges();
      const checkboxes = getCheckboxInputs();

      checkboxes[0].click();

      expectNodeToBeSelected(1, true);
      expectCheckboxToBeChecked(1, true);

      fixture.destroy();
      flush();
    }));

    it('should hide checkboxes and prevent parent node selection when selectLeafNodesOnly is true', fakeAsync(() => {
      setupLeafSelectOnlyMode();
      fixture.detectChanges();
      const skyCheckboxes = getSkyCheckboxes();
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
      expectNodeToBeSelected(1, false);
      expectCheckboxToBeChecked(1, false);

      fixture.destroy();
      flush();
    }));

    it('should show and allow parent node selection when selectLeafNodesOnly is false', fakeAsync(() => {
      setupNonCascadingMode();
      component.selectLeafNodesOnly = false;
      fixture.detectChanges();
      const skyCheckboxes = getSkyCheckboxes();
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
      expectNodeToBeSelected(1, true);
      expectCheckboxToBeChecked(1, true);

      fixture.destroy();
      flush();
    }));

    it('should only select leaf nodes when clicking select all and selectLeafNodesOnly is true', fakeAsync(() => {
      setupLeafSelectOnlyMode();
      fixture.detectChanges();
      const checkboxInputs = getCheckboxInputs();
      clickSelectAll();

      // United States (parent). Should not have a checkbox.
      // Expect NOT to be selected.
      expectNodeToBeSelected(1, false);

      // California (leaf). Expect to be selected.
      expectNodeToBeSelected(2, true);
      expect(checkboxInputs[0].checked).toEqual(true);

      // Indiana (parent). Should not have a checkbox.
      // Expect NOT to be selected.
      expectNodeToBeSelected(3, false);

      // Adams (leaf). Expect to be selected.
      expectNodeToBeSelected(4, true);
      expect(checkboxInputs[1].checked).toEqual(true);

      // Allen (leaf). Expect to be selected.
      expectNodeToBeSelected(5, true);
      expect(checkboxInputs[2].checked).toEqual(true);

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
      setupSingleSelectMode();
      fixture.detectChanges();
      const skyCheckboxes = getSkyCheckboxes();

      expect(skyCheckboxes.length).toEqual(0);

      fixture.destroy();
      flush();
    }));

    it('should only let users select one node at a time when selectSingle is true', fakeAsync(() => {
      setupSingleSelectMode();
      fixture.detectChanges();
      const nodes = getNodeContents();

      expectNodeToBeSelected(1, false);
      expectNodeToBeSelected(2, false);
      expectNodeToBeSelected(3, false);
      expectNodeToBeSelected(4, false);
      expectNodeToBeSelected(5, false);

      // Click the first node.
      nodes[0].click();
      fixture.detectChanges();

      // Expect parent node to be selected.
      expectNodeToBeSelected(1, true);
      expectNodeToBeSelected(2, false);
      expectNodeToBeSelected(3, false);
      expectNodeToBeSelected(4, false);
      expectNodeToBeSelected(5, false);

      // Click a second node.
      nodes[1].click();
      fixture.detectChanges();

      // Expect only second node to be selected.
      expectNodeToBeSelected(1, false);
      expectNodeToBeSelected(2, true);
      expectNodeToBeSelected(3, false);
      expectNodeToBeSelected(4, false);
      expectNodeToBeSelected(5, false);

      fixture.destroy();
      flush();
    }));

    it('should throw a console warning if selectSingle is used with a cascading tree', () => {
      setupCascadingMode();
      component.selectSingle = true;
      const warnSpy = spyOn(console, 'warn');
      fixture.detectChanges();

      expect(warnSpy).toHaveBeenCalled();
    });

    it('should hide select all/clear all buttons if selectSingle is true', () => {
      setupSingleSelectMode();
      fixture.detectChanges();

      const selectAllButton = getSelectAllButton();
      const clearAllButton = getClearAllButton();

      expect(selectAllButton).toBeNull();
      expect(clearAllButton).toBeNull();
    });
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

      SkyAppTestUtility.fireDomEvent(nodes[0], 'focus');
      fixture.detectChanges();

      expect(component.treeComponent.treeModel.isFocused).toEqual(true);
      expect(component.treeComponent.treeModel.focusedNodeId).toEqual(1);

      fixture.destroy();
      flush();
    }));

    it('should give the focussed node a tabIndex of 0, and the rest a tabIndex of -1', fakeAsync(() => {
      fixture.detectChanges();
      const nodes = getNodeContents();

      SkyAppTestUtility.fireDomEvent(nodes[1], 'focus');
      fixture.detectChanges();

      expect(nodes[0].tabIndex).toEqual(-1);
      expect(nodes[1].tabIndex).toEqual(0);
      expect(nodes[2].tabIndex).toEqual(-1);
      expect(nodes[3].tabIndex).toEqual(-1);
      expect(nodes[4].tabIndex).toEqual(-1);

      SkyAppTestUtility.fireDomEvent(nodes[4], 'focus');
      fixture.detectChanges();

      expect(nodes[0].tabIndex).toEqual(-1);
      expect(nodes[1].tabIndex).toEqual(-1);
      expect(nodes[2].tabIndex).toEqual(-1);
      expect(nodes[3].tabIndex).toEqual(-1);
      expect(nodes[4].tabIndex).toEqual(0);

      fixture.destroy();
      flush();
    }));
  });

  describe('accessibility', (() => {
    it('should pass accessibility in basic setup', async(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement).toBeAccessible();
    }));

    it('should pass accessibility in multi-select mode', async(() => {
      setupCascadingMode();
      fixture.detectChanges();
      expect(fixture.nativeElement).toBeAccessible();
    }));

    it('should pass accessibility in single-select mode', async(() => {
      setupSingleSelectMode();
      fixture.detectChanges();
      expect(fixture.nativeElement).toBeAccessible();
    }));

    it('should pass accessibility in leaf-select-only mode', async(() => {
      setupLeafSelectOnlyMode();
      fixture.detectChanges();
      expect(fixture.nativeElement).toBeAccessible();
    }));
  }));
});
