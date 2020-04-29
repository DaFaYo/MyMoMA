import { Component, OnInit, Input } from '@angular/core';
import { ArtObject } from '../shared/model/art-object.model';

@Component({
  selector: 'app-display-objects',
  templateUrl: './display-objects.component.html',
  styleUrls: ['./display-objects.component.css']
})
export class DisplayObjectsComponent implements OnInit {

  @Input() objects: ArtObject[];
  

  constructor() { }

  ngOnInit(): void {

    // this.objects[0]
  }

}
