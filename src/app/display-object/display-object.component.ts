import { Component, OnInit, Input } from '@angular/core';
import { ArtObject } from '../shared/model/art-object.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-display-object',
  templateUrl: './display-object.component.html',
  styleUrls: ['./display-object.component.css']
})
export class DisplayObjectComponent implements OnInit {

  @Input() artObject: ArtObject;

  images: string[];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getImageUrls();
  }

  getImageUrls() {
    this.images = [];
    if (this.artObject.primaryImage && this.artObject.primaryImage != "") {
      this.images.push(this.artObject.primaryImage);
    }
    if (this.artObject.additionalImages.length > 0) {
      this.artObject.additionalImages.forEach((image: string) => {
        this.images.push(image);
      });
    }
  }

  ShowDetailsArtObject(modal) {

    this.modalService.open(modal).result.then(() => {

    }, () => {

    });
  }



}
