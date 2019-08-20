import {
  ITreeOptions
} from 'angular-tree-component';

import {
  SkyTreeOptions
} from './types/sky-angular-tree-options';

export abstract class SkyAngularTreeHelper {

  public static getConfig(config: ITreeOptions, skyOptions: SkyTreeOptions): SkyTreeOptions {
    const skyConfig: SkyTreeOptions = {
      ...config,
      ...skyOptions
    };
    return skyConfig;
  }

}
