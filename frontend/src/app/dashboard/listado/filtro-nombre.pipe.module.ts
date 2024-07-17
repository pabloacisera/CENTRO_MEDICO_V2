import { NgModule } from '@angular/core';
import { FiltroNombrePipe } from '../../filtro-nombre.pipe';


@NgModule({
  declarations: [FiltroNombrePipe],
  exports: [FiltroNombrePipe]
})
export class FiltroNombrePipeModule { }