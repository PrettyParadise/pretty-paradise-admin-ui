import {Component, Input, OnInit} from '@angular/core';
import {ErrorModel} from "../../models/error.model";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input("error") error: ErrorModel;
  constructor() { }

  ngOnInit(): void {
  }

}
