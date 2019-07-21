import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableComponent } from './pages/table/table.component';
import { ConsiderationsComponent } from './pages/considerations/considerations.component';

const routes: Routes = [
  { path: '', redirectTo: '/table', pathMatch: 'full' },
  { path: 'table' , component: TableComponent },
  { path: 'considerations' , component: ConsiderationsComponent },
  { path: '**' , component: TableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
