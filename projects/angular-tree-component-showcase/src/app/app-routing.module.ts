import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkyAngularTreeVisualComponent } from './visual/angular-tree-component/angular-tree-visual.component';
import { VisualComponent } from './visual/visual.component';

const routes: Routes = [
  {
    path: '',
    component: VisualComponent
  },
  {
    path: 'visual/angular-tree-component',
    component: SkyAngularTreeVisualComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
