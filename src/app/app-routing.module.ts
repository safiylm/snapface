import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaceSnapListComponent } from './face-snap-list/face-snap-list.component'
import { TextSnapListComponent } from './text-snap-list/text-snap-list.component'
import { HomeComponent } from './home/home.component'


const routes: Routes = [
  { path: 'snaps/face', component: FaceSnapListComponent },
  { path: 'snaps/text', component: TextSnapListComponent  },
  { path: '', component:  HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
