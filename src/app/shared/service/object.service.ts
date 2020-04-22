import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Objects } from '../model/objects.model';
import { HttpClient } from '@angular/common/http';
import { Department } from '../model/department.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  url: string = "https://collectionapi.metmuseum.org/public/collection/v1";
  
  constructor(private http: HttpClient) { }

  getObjects(departmentIds?: string): Observable<Objects> {

    if (!departmentIds) {

      return this.http.get<Objects>(this.url + "/objects");

    } else {

      return this.http.get<Objects>(this.url + "/objects?" + `departmentIds=${departmentIds}` );

    }
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.url + "/departments")
      .pipe(map(result => result['departments']));
  }

  

}
