import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from './company.model';

@Injectable()
export class CompanyService {

    private baseUrl = 'http://10.0.1.94:8080/cdb-webservice';

    constructor(private http: HttpClient) {
    }

    getCompanies(): Observable<Company[]> {
        return this.http.get<Company[]>(`${this.baseUrl}/companies`);
    }

    getById(id: number): Observable<Company> {
        return this.http.get<Company>(`${this.baseUrl}/companies/${id}`);
    }

    addCompany(company: Company): Observable<Company> {
        return this.http.post<Company>(`${this.baseUrl}/companies`, company);
    }

    deleteCompany(id: number): Observable<{}> {
        return this.http.delete(`${this.baseUrl}/companies/${id}`);
    }

    deleteCompanies(ids: number[]): void {
        ids.forEach(id => {
            this.deleteCompany(id);
        });
    }

    updateCompany(company: Company): Observable<Company> {
        return this.http.patch<Company>(`${this.baseUrl}/companies`, company);
    }

    search(search: string): Observable<Company[]> {
      return this.http.get<Company[]>(`${this.baseUrl}/companies/${search}`);
    }
}
