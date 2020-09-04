import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() task = new EventEmitter<any>(); 
  @Output() viewClose = new EventEmitter<any>(); 

  constructor() { }

  ngOnInit() {
  }

  onAddTask(){
    this.task.emit(true);
    this.viewClose.emit(false);
  }
}
