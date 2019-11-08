import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {InComponent} from '../../../model/in-component';

@Component({
    selector: 'dialog-logout',
    templateUrl: 'dialog-logout.component.html',
})
export class DialogLogoutComponent extends InComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<DialogLogoutComponent>) {
        super();
    }

    ngOnInit(): void {
    }

    onYesClick(): void {
        this.dialogRef.close(true);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
