import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Objects } from '../model/objects.model';
import { HttpClient } from '@angular/common/http';
import { Department } from '../model/department.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  private departmentIdsCache: string;
  private objectsCache: Objects;
  private departmentsCache: Department[];

  url: string = "https://collectionapi.metmuseum.org/public/collection/v1";

  constructor(private http: HttpClient) { }


  getObjects(departmentIds?: string): Observable<[string, Objects]> {

    if (this.objectsCache && (departmentIds == this.departmentIdsCache)) {

      //console.log('Fetched objects.json via cache');
      return of(["cached", this.objectsCache]);

    } else {

      let url = this.url + "/objects";
      let departmentIdsValue = "";
      if (departmentIds && departmentIds != "") {

        url = url + `?departmentIds=${departmentIds}`;
        departmentIdsValue = departmentIds;

      }
      return this.http.get<Objects>(url).pipe(
        map(objects => {
          //console.log('Fetched objects.json via HTTP-call');
          this.objectsCache = objects;
          this.departmentIdsCache = departmentIdsValue;
          return ["not cached", objects];
        }),
        catchError((error: any) => {
          //console.log('Error while fetching objects: ', error);
          return of(null);
        })
      );
    }
  }


  getObject(id: number): Observable<Object> {
    return this.http.get<Object>(this.url + "/objects" + `/${id}`);
  }


  getDepartments(): Observable<Department[]> {

    if (this.departmentsCache) {

      return of(this.departmentsCache);

    } else {

      return this.http.get<Department[]>(this.url + "/departments").pipe(
        map(result => {
          //console.log('Fetched departments.json via HTTP-call');
          this.departmentsCache = result['departments'];
          return result['departments'];
        }),
        catchError((error: any) => {
          //console.log('Error while fetching departments: ', error);
          return of(null);
        })
      );
    }
  }


}