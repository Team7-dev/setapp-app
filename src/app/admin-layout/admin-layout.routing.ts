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
import {VisitanteDetalharComponent} from '../content/visitante/content/detalhamento/visitante-detalhar.component';
import {UsuarioFormularioComponent} from '../content/usuario/content/formulario/usuario-formulario.component';
import {UsuarioDetalharComponent} from '../content/usuario/content/detalhamento/usuario-detalhar.component';
import {UnidadeDetalharComponent} from '../content/unidade/content/detalhamento/unidade-detalhar.component';
import {UnidadeFormularioComponent} from '../content/unidade/content/formulario/unidade-formulario.component';
import {VeiculoDetalharComponent} from '../content/veiculo/content/detalhamento/veiculo-detalhar.component';
import {VeiculoFormularioComponent} from '../content/veiculo/content/formulario/veiculo-formulario.component';
import {CorrespondenciaFormularioComponent} from '../content/correspondencia/content/formulario/correspondencia-formulario.component';
import {CorrespondenciaDetalharComponent} from '../content/correspondencia/content/detalhamento/correspondencia-detalhar.component';
import {ReservaDetalharComponent} from '../content/reserva/content/detalhamento/reserva-detalhar.component';
import {ReservaFormularioComponent} from '../content/reserva/content/formulario/reserva-formulario.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: 'correspondencia',
        component: CorrespondenciaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'correspondencia/cadastrar',
        component: CorrespondenciaFormularioComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Cadastrar'
        },
    },
    {
        path: 'correspondencia/editar/:id',
        component: CorrespondenciaFormularioComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Editar'
        },
    },
    {
        path: 'correspondencia/detalhar/:id',
        component: CorrespondenciaDetalharComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'reserva',
        component: ReservaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'reserva/cadastrar',
        component: ReservaFormularioComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Cadastrar'
        },
    },
    {
        path: 'reserva/editar/:id',
        component: ReservaFormularioComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Editar'
        },
    },
    {
        path: 'reserva/detalhar/:id',
        component: ReservaDetalharComponent,
        canActivate: [AuthGuard]
    },
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
    {
        path: 'visitante/detalhar/:id',
        component: VisitanteDetalharComponent,
        canActivate: [AuthGuard]
    },
    {path: 'assembleia', component: AssembleiaComponent, canActivate: [AuthGuard]},
    {path: 'transparencia', component: TransparenciaComponent, canActivate: [AuthGuard]},
    {path: 'emergencia', component: EmergenciaComponent, canActivate: [AuthGuard]},
    {path: 'boleto', component: BoletoComponent, canActivate: [AuthGuard]},
    {
        path: 'unidade',
        component: UnidadeComponent,
        canActivate: [AuthGuard]},
    {
        path: 'unidade/cadastrar',
        component: UnidadeFormularioComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Cadastrar'
        },
    },
    {
        path: 'unidade/editar/:id',
        component: UnidadeFormularioComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Editar'
        },
    },
    {
        path: 'unidade/detalhar/:id',
        component: UnidadeDetalharComponent,
        canActivate: [AuthGuard]
    },
    {path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard]},
    {
        path: 'usuario/cadastrar',
        component: UsuarioFormularioComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Cadastrar'
        },
    },
    {
        path: 'usuario/editar/:id',
        component: UsuarioFormularioComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Editar'
        },
    },
    {
        path: 'usuario/detalhar/:id',
        component: UsuarioDetalharComponent,
        canActivate: [AuthGuard]
    },
    {path: 'veiculo', component: VeiculoComponent, canActivate: [AuthGuard]},
    {
        path: 'veiculo/cadastrar',
        component: VeiculoFormularioComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Cadastrar'
        },
    },
    {
        path: 'veiculo/editar/:id',
        component: VeiculoFormularioComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Editar'
        },
    },
    {
        path: 'veiculo/detalhar/:id',
        component: VeiculoDetalharComponent,
        canActivate: [AuthGuard]
    }

];
