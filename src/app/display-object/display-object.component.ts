import { Component, OnInit, Input } from '@angular/core';
import { ArtObject } from '../shared/model/art-object.model';

@Component({
  selector: 'app-display-object',
  templateUrl: './display-object.component.html',
  styleUrls: ['./display-object.component.css']
})
export class DisplayObjectComponent implements OnInit {

  @Input() artObject: ArtObject;
 
  constructor() { }

  ngOnInit(): void {
    
  }

}
