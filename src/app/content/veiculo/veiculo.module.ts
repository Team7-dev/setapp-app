import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {VeiculoRoutingModule} from './veiculo-routing.module';
import {VeiculoFormularioComponent} from './content/formulario/veiculo-formulario.component';
import {VeiculoDetalharComponent} from './content/detalhamento/veiculo-detalhar.component';
import {MatIconModule} from '@angular/material/icon';
import {VeiculoComponent} from './veiculo.component';

@NgModule({
    imports: [
        VeiculoRoutingModule,
        SharedModule,
        MatIconModule,
    ],
    declarations: [
        VeiculoComponent,
        VeiculoDetalharComponent,
        VeiculoFormularioComponent
    ]
})
export class VeiculoModule {
}
