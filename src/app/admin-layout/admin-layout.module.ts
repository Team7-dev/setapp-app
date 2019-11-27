import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';

import {MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTooltipModule} from '@angular/material';
import {CorrespondenciaComponent} from '../content/correspondencia/correspondencia.component';
import {UsuarioComponent} from '../content/usuario/usuario.component';
import {ReservaComponent} from '../content/reserva/reserva.component';
import {VisitanteComponent} from '../content/visitante/visitante.component';
import {OcorrenciaComponent} from '../content/ocorrencia/ocorrencia.component';
import {AssembleiaComponent} from '../content/assembleia/assembleia.component';
import {TransparenciaComponent} from '../content/transparencia/transparencia.component';
import {BoletoComponent} from '../content/boleto/boleto.component';
import {UnidadeComponent} from '../content/unidade/unidade.component';
import {VeiculoComponent} from '../content/veiculo/veiculo.component';
import {EmergenciaComponent} from '../content/emergencia/emergencia.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {VisitanteFormularioComponent} from '../content/visitante/content/formulario/visitante-formulario.component';
import {LogoutComponent} from '../components/sidebar/logout.component';
import {VisitanteDetalharComponent} from '../content/visitante/content/detalhamento/visitante-detalhar.component';
import {UsuarioFormularioComponent} from '../content/usuario/content/formulario/usuario-formulario.component';
import {UsuarioDetalharComponent} from '../content/usuario/content/detalhamento/usuario-detalhar.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {UnidadeFormularioComponent} from '../content/unidade/content/formulario/unidade-formulario.component';
import {UnidadeDetalharComponent} from '../content/unidade/content/detalhamento/unidade-detalhar.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {VeiculoFormularioComponent} from '../content/veiculo/content/formulario/veiculo-formulario.component';
import {VeiculoDetalharComponent} from '../content/veiculo/content/detalhamento/veiculo-detalhar.component';
import {CorrespondenciaFormularioComponent} from '../content/correspondencia/content/formulario/correspondencia-formulario.component';
import {CorrespondenciaDetalharComponent} from '../content/correspondencia/content/detalhamento/correspondencia-detalhar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ReservaFormularioComponent} from '../content/reserva/content/formulario/reserva-formulario.component';
import {ReservaDetalharComponent} from '../content/reserva/content/detalhamento/reserva-detalhar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatTableModule,
        MatIconModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatAutocompleteModule,
        MatDatepickerModule,
    ],
    declarations: [
        AssembleiaComponent,
        BoletoComponent,
        CorrespondenciaComponent,
        CorrespondenciaFormularioComponent,
        CorrespondenciaDetalharComponent,
        EmergenciaComponent,
        OcorrenciaComponent,
        ReservaComponent,
        ReservaFormularioComponent,
        ReservaDetalharComponent,
        TransparenciaComponent,
        UnidadeComponent,
        UnidadeFormularioComponent,
        UnidadeDetalharComponent,
        UsuarioComponent,
        UsuarioFormularioComponent,
        UsuarioDetalharComponent,
        VisitanteComponent,
        VisitanteFormularioComponent,
        VisitanteDetalharComponent,
        VeiculoComponent,
        VeiculoFormularioComponent,
        VeiculoDetalharComponent,
        LogoutComponent
    ]
})

export class AdminLayoutModule {
}
