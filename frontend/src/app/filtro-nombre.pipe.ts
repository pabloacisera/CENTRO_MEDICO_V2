import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroNombre'
})
export class FiltroNombrePipe implements PipeTransform {

  transform(items: any[], busqueda: string): any[] {
    if (!items || !busqueda) {
      return items;
    }

    return items.filter(item =>
      item.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  }
}
