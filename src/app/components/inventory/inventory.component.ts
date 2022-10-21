import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  items = [
    {
      title: 'Yogurt Lala Fresa',
      descripcion: 'Yogurt sabor de fresa, 300ml',
      precio: 12,
      cantidad: 21,
      tipo: 'pieza',
      piezas: 1,
      ubicacion: 'Estante'
    },
    {
      title: 'Yogurt Lala Vainilla',
      descripcion: 'Yogurt sabor de vainilla, 300ml',
      precio: 12,
      cantidad: 28,
      tipo: 'pieza',
      piezas: 1,
      ubicacion: 'Estante'
    },
    {
      title: 'Yogurt San Marcos',
      descripcion: 'Yogurt sabor fresa, 350ml',
      precio: 15,
      cantidad: 17,
      tipo: 'pieza',
      piezas: 1,
      ubicacion: 'Estante'
    },
    {
      title: 'Yogurt San Marcos',
      descripcion: 'Yogurt sabor vainilla, 350ml',
      precio: 15,
      cantidad: 4,
      tipo: 'caja',
      piezas: 18,
      ubicacion: 'Estante'
    },
    {
      title: 'Crema Lala',
      descripcion: 'Bote de Crema lala, 500ml',
      precio: 20,
      cantidad: 10,
      tipo: 'pieza',
      piezas: 1,
      ubicacion: 'Estante'
    },
    {
      title: 'Crema La consteña',
      descripcion: 'Bote de Crema Costeña, 500ml',
      precio: 17,
      cantidad: 10,
      tipo: 'caja',
      piezas: 1,
      ubicacion: 'Estante'
    },
    {
      title: 'Leche La granja',
      descripcion: 'Leche la granja, 1L',
      precio: 16,
      cantidad: 16,
      tipo: 'pieza',
      piezas: 1,
      ubicacion: 'Estante'
    },
  ]
  isModalOpen = false;
  
  constructor() { }

  ngOnInit() {
    const data = this.items;
    this.items = [];
    for(const i of data){
      if(i.tipo == 'pieza'){
        this.items.push(i);
      }
    }
  }

}
