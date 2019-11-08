import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {LoginService} from '../../content/login/login.service';

@Component({
    template: ``
})
export class LogoutComponent implements OnInit {

    constructor(private loginService: LoginService, private router: Router) {
    }

    ngOnInit(): void {
        localStorage.clear();
        this.router.navigate(['/login']);
    }
}
