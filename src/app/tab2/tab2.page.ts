import { Tasks } from './../models/tasks';
import { Component } from '@angular/core';
import { TaskService } from './../services/task.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public tasksComplete: Tasks[];

  constructor(
    private taskService:TaskService
  ) {
    this.taskService.getCompleteTasks().subscribe(res => {
      this.tasksComplete = res;
    });
  }

  public removeCompleteTask(id: string) {
    this.taskService.removeTask(id);
  }

  public uncompleteTask(id: string) {
    this.taskService.uncompleteTask(id);
    //this.tasksComplete = this.taskService.getCompleteTasks();
  }

}