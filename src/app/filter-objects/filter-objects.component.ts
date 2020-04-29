import { Component, OnInit, QueryList, ViewChildren, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Objects } from '../shared/model/objects.model';
import { ObjectService } from '../shared/service/object.service';
import { Department } from '../shared/model/department.model';
import { takeUntil } from 'rxjs/operators';
import { ArtObject } from '../shared/model/art-object.model';


@Component({
  selector: 'app-filter-objects',
  templateUrl: './filter-objects.component.html',
  styleUrls: ['./filter-objects.component.css']
})
export class FilterObjectsComponent implements OnDestroy, OnInit {

  private ngUnsubscribe = new Subject();
  public objectsList: ArtObject[] = [];
  public objects: Objects;

  public departments: Department[];

  private totalPages: number;


  /** Get handle on departmentsRef tags in the template */
  @ViewChildren('departmentsRef') cbxDepartments:QueryList<ElementRef<any>>;

  constructor(private objectService: ObjectService) { }

  ngOnInit(): void {

    this.getObjects();
    this.getDepartments();

  }

  filterObjectsByDepartments(): void {
    
    let departements: string[] = [];
    let selectedDepartments: ElementRef<any>[] =  this.cbxDepartments.toArray();

    selectedDepartments.forEach(elt => {
      if (elt.nativeElement.firstChild.checked) {
        departements.push(elt.nativeElement.lastChild.title);
      }
    });

    if (departements.length == 0) {
      this.getObjects(""); 
    } else {
      this.getObjects(departements.join("|"));
    }
  }


  getObjects(departmentIds?: string): void {
    this.objectService.getObjects(departmentIds).pipe(
           
      takeUntil(this.ngUnsubscribe)
   )
   .subscribe((result: [string, Objects]) => {
     this.objects = result[1];
     // now that we've got objects, we can create the objectList
    if (result[0] != "cached") {
      this.getObjectList(1);
    }
  });
  }


  getObjectList(page: number) {

    let total: number = this.objects.total;
    let objectIds: number[] = this.objects.objectIDs;
    if (total < 0 || objectIds.length == 0) {
      alert("objects not cached!");
    } 
    
    this.totalPages = Math.floor(total / 50);
    let start: number = (page - 1) * 50;
    let end: number = (page * 50 < total) ? page * 50 : total;
    if (this.objectsList && this.objectsList.length >= end) {
      return this.objectsList.slice(start, end);
    }
    else {
      objectIds.slice(start, end).forEach((objectId: number) => {
        this.objectService.getObject(objectId)
        .pipe(
           
           takeUntil(this.ngUnsubscribe)
        )
        .subscribe((object: ArtObject) => {
          console.log("adding object with title:", object['title']);
          this.objectsList.push(object);
        });
      });
      return this.objectsList.slice(start, end);
    }   

  }


  getDepartments(): void { 
    this.objectService.getDepartments().pipe(
           
      takeUntil(this.ngUnsubscribe)
   )
   .subscribe((departments: Department[]) => this.departments = departments);
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
}

}
