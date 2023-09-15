import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styles: [
    `.logout-menu-item {
      width: 100%;
    display: flex;
    justify-content: flex-end;
    }`
  ]
})
export class MenuComponent {
  items: MenuItem[] = [];

  ngOnInit() {
    const currentUserMail = localStorage.getItem('currentUserEmail');
    if (currentUserMail) {


    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/dashboard/current'
      },
      {
        label: 'Movimientos',
        icon: 'pi pi-chart-line',
        routerLink: '/dashboard/Movimientos'
      },
      {
        label: 'Editar Perfil',
        icon: 'pi pi-user-edit',
        routerLink: `/dashboard/editar-perfil/${currentUserMail}`
      },
      {
        label: 'Log Out',
        icon: 'pi pi-sign-out',
        command: () => {
          localStorage.removeItem('currentUserEmail');
          // Lógica para cerrar sesión
        },
        routerLink: '/auth/login',
        styleClass: 'logout-menu-item'
      }
    ];
  }
}
}
