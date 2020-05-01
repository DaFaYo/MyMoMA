import { Component, OnInit, Input } from '@angular/core';
import { ArtObject } from '../shared/model/art-object.model';

@Component({
  selector: 'app-display-objects',
  templateUrl: './display-objects.component.html',
  styleUrls: ['./display-objects.component.css']

})
export class DisplayObjectsComponent implements OnInit {

  hasImage: boolean = true;
  isHighlight: boolean = false;

  @Input() artObjects: ArtObject[];


  constructor() { }

  ngOnInit(): void {

    // this.objects[0]
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

}
