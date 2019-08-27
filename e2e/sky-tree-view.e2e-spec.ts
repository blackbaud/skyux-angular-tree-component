import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  by,
  element
} from 'protractor';

describe('Tree view', () => {
  beforeEach(() => {
    SkyHostBrowser.get('visual/angular-tree-component');
    SkyHostBrowser.setWindowBreakpoint('lg');
  });

  it('should match previous screenshot with a basic tree view', (done) => {
    SkyHostBrowser.scrollTo('#screenshot-tree-view-basic');
    expect('#screenshot-tree-view-basic').toMatchBaselineScreenshot(done, {
      screenshotName: 'screenshot-tree-view-basic'
    });
  });

  it('should match previous screenshot with node active', (done) => {
    SkyHostBrowser.scrollTo('#screenshot-tree-view-basic');
    element.all(by.css('#screenshot-tree-view-basic .node-content-wrapper')).get(1).click();
    expect('#screenshot-tree-view-basic').toMatchBaselineScreenshot(done, {
      screenshotName: 'screenshot-tree-view-basic-with-node-active'
    });
  });

  it('should match previous screenshot with context menus and checkboxes', (done) => {
    SkyHostBrowser.scrollTo('#screenshot-tree-view-context-menus-and-checkboxes');
    expect('#screenshot-tree-view-context-menus-and-checkboxes').toMatchBaselineScreenshot(done, {
      screenshotName: 'screenshot-tree-view-context-menus-and-checkboxes'
    });
  });

  it('should match previous screenshot when collapsed', (done) => {
    SkyHostBrowser.scrollTo('#screenshot-tree-view-cascading-checkboxes');
    element(by.css('#screenshot-tree-view-cascading-checkboxes .sky-angular-tree-collapse-all-btn')).click();
    expect('#screenshot-tree-view-cascading-checkboxes').toMatchBaselineScreenshot(done, {
      screenshotName: 'screenshot-tree-view-collapsed'
    });
  });

  it('should match previous screenshot with checkboxes', (done) => {
    SkyHostBrowser.scrollTo('#screenshot-tree-view-cascading-checkboxes');
    element.all(by.css('#screenshot-tree-view-cascading-checkboxes .node-content-wrapper')).get(1).click();
    expect('#screenshot-tree-view-cascading-checkboxes').toMatchBaselineScreenshot(done, {
      screenshotName: 'screenshot-tree-view-cascading-checkboxes'
    });
  });

  it('should match previous screenshot with single select mode', (done) => {
    SkyHostBrowser.scrollTo('#screenshot-tree-view-single-select');
    element.all(by.css('#screenshot-tree-view-single-select .node-content-wrapper')).get(1).click();
    expect('#screenshot-tree-view-single-select').toMatchBaselineScreenshot(done, {
      screenshotName: 'screenshot-tree-view-single-select'
    });
  });
});
