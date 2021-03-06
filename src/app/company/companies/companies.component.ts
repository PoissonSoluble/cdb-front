import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectorRef
} from "@angular/core";
import { CompanyService } from "../company.service";
import { Company } from "../company.model";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatSnackBar
} from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";

@Component({
  selector: "app-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.css"]
})
export class CompaniesComponent implements OnInit {
  displayedColumns = ["select", "id", "name", "logo"];
  dataSource: MatTableDataSource<Company>;
  selection = new SelectionModel<Company>(true, []);
  companies: Company[] = [];

  @Output() deleteR = new EventEmitter<Company>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private companyService: CompanyService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.companyService.getCompanies().subscribe(
      companies => {
        this.companies = companies;
        this.dataSource = new MatTableDataSource(this.companies);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.snackBar.open(
          "Can't reach the database. Press F5 to refresh.",
          "close",
          {
            panelClass: "snackbar-error",
            duration: 2500
          }
        );
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = (data, filter) =>
      data.name
        .toLowerCase()
        .trim()
        .indexOf(filter.toLowerCase().trim()) !== -1 ||
      data.id.toString().indexOf(filter.trim()) !== -1;
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isConnected(): boolean {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  }

  delete(company: Company) {
    this.companyService.deleteCompany(company.id).subscribe(
      () => {
        this.companies.splice(this.companies.indexOf(company),1);
        this.dataSource.data = this.companies;
      },
      error => {
        this.snackBar.open("Can't delete the company. Try again.", "close", {
          panelClass: "snackbar-error",
          duration: 2500
        });
      }
    );
  }

  deleteMultiple() {
    if (this.selection.selected.length > 0) {
      if (confirm("Are you sure you want to delete these companies ?")) {
        this.selection.selected.forEach(company => this.delete(company));
      }
    }
  }

  selectRow(id) {
    this.router.navigate([`/companies/` + id]);
  }
}
