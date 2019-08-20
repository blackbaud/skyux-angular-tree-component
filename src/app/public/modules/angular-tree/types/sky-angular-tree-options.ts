import {
  ITreeOptions
} from 'angular-tree-component';

export interface SkyTreeOptions extends ITreeOptions {
  skyTreeOptions?: {
    leafSelectOnly?: boolean;
    singleSelect?: boolean;
  };
}
