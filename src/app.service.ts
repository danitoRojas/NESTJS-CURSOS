import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola mundo !';
  }


  getUsuario(nombre: string, apellido: string): string {
    return `mi nombre ${nombre} Apellido: ${apellido}`;
  }

}
