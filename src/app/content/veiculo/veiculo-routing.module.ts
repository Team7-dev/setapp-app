import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VeiculoFormularioComponent} from './content/formulario/veiculo-formulario.component';
import {VeiculoComponent} from './veiculo.component';
import {VeiculoDetalharComponent} from './content/detalhamento/veiculo-detalhar.component';

const routes: Routes = [
    {
        path: '/veiculo',
        component: VeiculoComponent,
    },
    {
        path: 'veiculo/detalhar/:id',
        component: VeiculoDetalharComponent,
    },
    {
        path: 'veiculo/editar/:id',
        component: VeiculoFormularioComponent,
        data: {
            title: 'Editar'
        }
    },
    {
        path: 'veiculo/cadastrar',
        component: VeiculoFormularioComponent,
        data: {
            title: 'Cadastrar'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VeiculoRoutingModule {
}
