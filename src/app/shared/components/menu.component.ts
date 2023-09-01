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
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      const userMail = currentUser.email;

    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/dashboard/current'
      },{
        label: 'Ingresar Dinero',
        icon: 'pi pi-money-bill',
        routerLink: '/dashboard/ingresar-dinero'
      },
      {
        label: 'Mis Criptomonedas',
        icon: 'pi pi-chart-line',
        routerLink: '/dashboard/mis-criptomonedas'
      },
      {
        label: 'Editar Perfil',
        icon: 'pi pi-user-edit',
        routerLink: `/dashboard/editar-perfil/${userMail}`
      },
      {
        label: 'Log Out',
        icon: 'pi pi-sign-out',
        command: () => {
          // Lógica para cerrar sesión
        },
        routerLink: '/auth/login',
        styleClass: 'logout-menu-item'
      }
    ];
  }
}
}
