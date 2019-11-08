import {Routes} from '@angular/router';
import {CorrespondenciaComponent} from '../content/correspondencia/correspondencia.component';
import {UsuarioComponent} from '../content/usuario/usuario.component';
import {ReservaComponent} from '../content/reserva/reserva.component';
import {OcorrenciaComponent} from '../content/ocorrencia/ocorrencia.component';
import {VisitanteComponent} from '../content/visitante/visitante.component';
import {AssembleiaComponent} from '../content/assembleia/assembleia.component';
import {TransparenciaComponent} from '../content/transparencia/transparencia.component';
import {EmergenciaComponent} from '../content/emergencia/emergencia.component';
import {BoletoComponent} from '../content/boleto/boleto.component';
import {UnidadeComponent} from '../content/unidade/unidade.component';
import {VeiculoComponent} from '../content/veiculo/veiculo.component';
import {AuthGuard} from '../auth.guard';
import {VisitanteFormularioComponent} from '../content/visitante/content/formulario/visitante-formulario.component';

export const AdminLayoutRoutes: Routes = [
    {path: 'correspondencia', component: CorrespondenciaComponent, canActivate: [AuthGuard]},
    {path: 'reserva', component: ReservaComponent, canActivate: [AuthGuard]},
    {path: 'ocorrencia', component: OcorrenciaComponent, canActivate: [AuthGuard]},
    {
        path: 'visitante',
        component: VisitanteComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'visitante/cadastrar',
        component: VisitanteFormularioComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Cadastrar'
        },
    },
    {
        path: 'visitante/editar/:id',
        component: VisitanteFormularioComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Editar'
        },
    },
    {path: 'assembleia', component: AssembleiaComponent, canActivate: [AuthGuard]},
    {path: 'transparencia', component: TransparenciaComponent, canActivate: [AuthGuard]},
    {path: 'emergencia', component: EmergenciaComponent, canActivate: [AuthGuard]},
    {path: 'boleto', component: BoletoComponent, canActivate: [AuthGuard]},
    {path: 'unidade', component: UnidadeComponent, canActivate: [AuthGuard]},
    {path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard]},
    {path: 'veiculo', component: VeiculoComponent, canActivate: [AuthGuard]},
];
