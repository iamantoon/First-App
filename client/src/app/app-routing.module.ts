import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './modules/boards/components/board/board.component';
import { HomeComponent } from './modules/home/components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'boards/:id', component: BoardComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }