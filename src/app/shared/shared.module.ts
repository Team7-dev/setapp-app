import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MomentModule} from 'ngx-moment';
import {BrMaskerModule} from 'br-mask';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {VisitanteService} from '../content/visitante/visitante.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MomentModule,
        BrMaskerModule,

        /* Angular Modules */
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatProgressBarModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatRadioModule,
        MatExpansionModule,
        MatSelectModule,
        MatSliderModule,
        MatAutocompleteModule,
        MatStepperModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        /* END -- Angular Modules */
    ],
    declarations: [],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
        VisitanteService
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MomentModule,
        BrMaskerModule,

        /* Angular Modules */
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatProgressBarModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatRadioModule,
        MatExpansionModule,
        MatSelectModule,
        MatSliderModule,
        MatAutocompleteModule,
        MatStepperModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        /* END -- Angular Modules */

    ], entryComponents: []
})

export class SharedModule {
}
