import {Component, Input, OnInit} from '@angular/core';
import {Company} from './company.model';
import {CompanyService} from './company.service';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

    @Input()
    company: Company;

    constructor(private companyService: CompanyService) {
    }

    ngOnInit() {
    }

}
