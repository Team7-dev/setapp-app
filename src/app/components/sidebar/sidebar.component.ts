import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/correspondencia', title: 'Correspondências',  icon: 'email', class: '' },
    { path: '/reserva', title: 'Reservas',  icon: 'event_note', class: '' },
    { path: '/ocorrencia', title: 'Registrar Ocorrências',  icon: 'warning', class: '' },
    { path: '/visitante', title: 'Visitantes',  icon: 'person_add', class: '' },
    { path: '/assembleia', title: 'Assembléias',  icon: 'poll', class: '' },
    { path: '/emergencia', title: 'Emergências',  icon: 'priority_high', class: '' },
    { path: '/boleto', title: '2ª Via de Boletos',  icon: 'attach_money', class: '' },
    { path: '/unidade', title: 'Unidades',  icon: 'apartment', class: '' },
    { path: '/usuario', title: 'Usuários',  icon: 'people', class: '' },
    { path: '/veiculo', title: 'Veiculos',  icon: 'directions_car', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
