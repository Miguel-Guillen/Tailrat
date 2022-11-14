export class Product {
    titulo: string;
    descripcion: string;
    img: string;
    piezas: number;
    precio: number;
    uid: string;
    id_proveedor: string;

    constructor(){
        this.titulo = '';
        this.descripcion = '';
        this.img = '';
        this.piezas = 1;
        this.precio = 0;
        this.uid = '';
        this.id_proveedor = '';
    }
}

export class ProductInventory {
    id: string;
    id_producto: string;
    nombre: string;
    descripcion: string;
    img: string;
    precio: number;
    piezas: number;
    bodega: number;
    tienda: number;
    sucursal: string;
    id_proveedor: string;
    proveedor: string;
    uid: string;

    constructor(){
        this.id = '';
        this.id_producto = '';
        this.nombre = '';
        this.descripcion = '';
        this.img = '';
        this.precio = 0;
        this.piezas = 1;
        this.bodega = 0;
        this.tienda = 0;
        this.sucursal = 'principal',
        this.id_proveedor = '';
        this.proveedor = '';
        this.uid = '';
    }
}