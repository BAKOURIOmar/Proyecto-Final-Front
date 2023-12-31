import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { CriptoDashboardComponent } from './pages/cripto-dashboard/cripto-dashboard.component';
import { AddMoneyComponent } from './pages/add-money/add-money.component';
import { MyTransactionsComponent } from './pages/transactions/my-transactions.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { CriptoDetailsComponent } from './pages/cripto-details/cripto-details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {path: 'current' , component :CriptoDashboardComponent},
      {path: 'Movimientos' , component :MyTransactionsComponent},
      {path: 'editar-perfil/:id' , component :EditProfileComponent},
      { path: 'detail/:id', component: CriptoDetailsComponent },
      { path: '**', redirectTo: 'current' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
