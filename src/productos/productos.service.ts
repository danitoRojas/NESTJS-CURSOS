import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './producto.interface';

@Injectable()
export class ProductosService {


  private productos = [
    {
      id: 1, nombre: "Producto 1", precio: 100, descripcion: "Descripcion del producto 1"
    },
    {
      id: 2, nombre: "Producto 2", precio: 200, descripcion: "Descripcion del producto 2"
    }
  ];

  create(createProductoDto: CreateProductoDto) {
    const nuevoProducto: Producto = {
      id: this.productos.length + 1,
      ...createProductoDto
    }
    this.productos.push(nuevoProducto);
    return nuevoProducto;
  }

  findAll() {
    return this.productos
  }

  findOne(id: number) {
    const productos = this.productos.find(item => item.id === id);
    if (!productos) {
      return `El producto con id ${id} no existe`;
    }
    return productos;
  }


  //Isac
  update(id: number, updateProductoDto: UpdateProductoDto) {
    //this.findOne(id);
    const producto = this.productos.find((producto) => producto.id === id);
    if (!producto) {
      return { message: 'Producto no encontrado' };
    }
    Object.assign(producto, updateProductoDto);
    return producto;
  }





  remove(id: number) {
    this.findOne(id);
    this.productos = this.productos.filter(item => item.id !== id);
    return { message: `Producto con id ${id} eliminado` };
  }
}
