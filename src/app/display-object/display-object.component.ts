import { Component, OnInit, Input } from '@angular/core';
import { ArtObject } from '../shared/model/art-object.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-display-object',
  templateUrl: './display-object.component.html',
  styleUrls: ['./display-object.component.css']
})
export class DisplayObjectComponent implements OnInit {

  @Input() artObject: ArtObject;
 
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }

  ShowDetailsArtObject(modal) {
   
    this.modalService.open(modal).result.then(() => {
    
    }, () => {
     
    });
  }

  

}
