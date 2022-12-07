import { Tasks } from './../models/tasks';
import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  public tasks: Tasks[];
  public task: Tasks;

  constructor(
    private taskService:TaskService
  ) {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
    });
    this.task = {
      name: '',
      complete: false
    };
  }

  public addTask(e){
    if(e.keyCode === 13 && this.task.name != "" ){
      this.task.complete = false;
      this.taskService.addTask(this.task);
      this.task.name = "";
    }
  }

  public addTaskButton(){
    this.taskService.addTask(this.task);
    this.task.name = "";
  }

  public removeTask(id: string) {
    this.taskService.removeTask(id);
    //this.tasks = this.taskService.getTasks();
  }

  public completeTask(id:string) {
    this.taskService.completeTask(id);
    //this.tasks = this.taskService.getTasks();
  }

}
