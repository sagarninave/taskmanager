import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @Input() task;
  submitted : boolean = false;
  maxChars : number = 1000;
  messageText : string = '';
  openTask;
  viewCard : boolean = false;
  viewCardItem;
  backlog : any = [
    {
      "id":"002",
      "title":"How to disable CDK Drop due to condition",
      "description" : "I'm trying to find a way how to disable dropping by using CDK due to some conditions.If the list which I wanna drop is empty should be disabled.I couldn't find a way to do that inside a method in .ts file.There are some HTML directives for that but not useful for me.",
      "duedate" : new Date("09/22/2020")
    }
  ];
  inProcess : any = [];
  review : any = [];
  completed : any = [];

  constructor(private fb : FormBuilder, public toastr: ToastrManager) { } 
          
  onViewCard(item){
    this.viewCard = true;
    this.viewCardItem = item;
  }

  getAddTaskValue(event){
    this.openTask = event;
  }

  getViewClose(event){
    this.viewCard = event;
  }

  closeView(){
    this.viewCard = false;
  }
  
  closeTask(){
    this.submitted = false;
    this.openTask = false;
    this.viewCard = false;
  }

  addTask = this.fb.group({
    title : ['', [Validators.required, Validators.maxLength(255)]],
    description : ['', [Validators.required]],
    duedate : ['', Validators.required]
  })
  
  get f(){
    return this.addTask.controls;
  }

  onAddTask(addTask){
    this.submitted = true;
    if(!addTask.valid){
      return false;
    }
    else{
      let id = Math.floor((Math.random() * 100) + 1);
      var taskData = {
        "id" : id,
        "title": addTask.controls.title.value,
        "description": addTask.controls.description.value,
        "duedate": addTask.controls.duedate.value
      }
      if(this.backlog.length<5){
        this.backlog.push(taskData);
        this.toastr.successToastr("Card added successfully.", "Add Card");
        this.openTask = false;
      }
      else{
        this.openTask = false;
        this.toastr.warningToastr("Card can not add due to full backlog list.", "List Full");
      }
      this.submitted = false;
      this.addTask.reset(); 
    }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
