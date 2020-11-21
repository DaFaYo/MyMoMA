import { Component, OnInit, QueryList, ViewChildren, ElementRef, OnDestroy, isDevMode } from '@angular/core';
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
  private counter: number = 0;
  private amount: number = 50;

  hasImage: boolean = true;
  isHighlight: boolean = false;
  searchValue: string = "";

  public artObjects: ArtObject[] = [];
  public objects: Objects;  // { "total": 471581, "objectIDs": [1, 2, 3, ..., 471581] }
  public departments: Department[];

  /** Get handle on departmentsRef tags in the template */
  @ViewChildren('departmentsRef') cbxDepartments: QueryList<ElementRef<any>>;

  constructor(private objectService: ObjectService) { }

  ngOnInit(): void {

    this.getObjects();
    this.getDepartments();

  }

  filterObjectsByDepartments(): void {

    console.log("Is in developer mode? : ", isDevMode());
    this.searchValue = "";
    let departments: string[] = [];
    let selectedDepartments: ElementRef<any>[] = this.cbxDepartments.toArray();

    selectedDepartments.forEach(elt => {
      if (elt.nativeElement.firstChild.checked) {
        departments.push(elt.nativeElement.lastChild.title);
      }
    });

    if (departments.length == 0) {
      this.getObjects("");
    } else {
      this.getObjects(departments.join("|"));
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
          this.artObjects = [];
          this.counter = 0;
          this.getNextArtObjects();
        }
      });
  }


  searchObjects(): void {
    this.objectService.searchObjects(this.searchValue).pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe((objects: Objects) => {
        this.objects = objects;
        this.artObjects = [];
        this.counter = 0;
        this.getNextArtObjects();
      });
  }


  getNextArtObjects(): ArtObject[] {

    let total: number = this.objects.total;
    if (this.artObjects && this.artObjects.length >= total) {
      return [];
    }

    let start: number = this.counter * this.amount;
    if (start >= total) {
      return [];
    } else {

      let end: number = ((this.counter + 1) * this.amount);
      if (end > total) {
        end = total;
      }

      this.objects.objectIDs.slice(start, end).forEach((objectId: number) => {
        this.objectService.getObject(objectId)
          .pipe(

            takeUntil(this.ngUnsubscribe)
          )
          .subscribe((artObject: ArtObject) => {
            //console.log("adding object with title:", artObject['title']);
            this.artObjects.push(artObject);
          });
      });
      this.counter = this.counter + 1;
      return this.artObjects.slice(start, end);
    }
  }


  filterArtObjects(): ArtObject[] {

    if (!this.hasImage && !this.isHighlight) {
      return this.artObjects;
    } else {

      let filteredArtObjects = [];

      if (this.hasImage) {
        filteredArtObjects = this.artObjects.filter(
          (artObject: ArtObject) => (artObject.primaryImageSmall && artObject.primaryImageSmall != ""));
      }

      if (this.isHighlight) {
        filteredArtObjects = filteredArtObjects.filter(
          (artObject: ArtObject) => artObject.isHighlight);
      }
      return filteredArtObjects;
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
