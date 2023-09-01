import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SharedModule } from "../shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CriptoDashboardComponent } from './pages/cripto-dashboard/cripto-dashboard.component';
import { AddMoneyComponent } from './pages/add-money/add-money.component';
import { MyCriptosComponent } from './pages/my-criptos/my-criptos.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { CriptoDetailsComponent } from './pages/cripto-details/cripto-details.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        DashboardLayoutComponent,
        CriptoDashboardComponent,
        AddMoneyComponent,
        MyCriptosComponent,
        EditProfileComponent,
        CriptoDetailsComponent,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        PrimeNgModule,
        ReactiveFormsModule

    ]
})
export class DashboardModule { }
