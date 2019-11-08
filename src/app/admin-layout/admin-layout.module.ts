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
    ],
    declarations: [
        AssembleiaComponent,
        BoletoComponent,
        CorrespondenciaComponent,
        EmergenciaComponent,
        OcorrenciaComponent,
        ReservaComponent,
        TransparenciaComponent,
        UnidadeComponent,
        UsuarioComponent,
        VisitanteComponent,
        VisitanteFormularioComponent,
        VisitanteDetalharComponent,
        VeiculoComponent,
        LogoutComponent
    ]
})

export class AdminLayoutModule {
}
