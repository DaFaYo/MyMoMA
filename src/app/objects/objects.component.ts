import { Component, OnInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Objects } from '../shared/model/objects.model';
import { ObjectService } from '../shared/service/object.service';
import { Department } from '../shared/model/department.model';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit {

  public objects$: Observable<Objects>;
  public departments$: Observable<Department[]>;

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
      this.getObjects(); 
    } else {
      this.getObjects(departements.join("|"));
    }
  }


  getObjects(departmentIds?: string): void {
    this.objects$ = this.objectService.getObjects(departmentIds);
  }

  getDepartments(): void { 
    this.departments$ = this.objectService.getDepartments();
  }

}
