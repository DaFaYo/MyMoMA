import { Component, OnInit } from '@angular/core';
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

  constructor(private objectService: ObjectService) { }


  ngOnInit(): void {

    let departmentIds: string ="3|9|12";
    this.getObjects(departmentIds);
    this.getDepartments();

  }

  getObjects(departmentIds?: string): void {
    this.objects$ = this.objectService.getObjects(departmentIds);
  }

  getDepartments(): void { 
    this.departments$ = this.objectService.getDepartments();
  }

}
