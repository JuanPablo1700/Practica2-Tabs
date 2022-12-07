import { Injectable } from '@angular/core';
import { Tasks } from './../models/tasks';
import { filter, map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: AngularFirestore) {}

  public getTasks(): Observable<Tasks[]> {
    return this.firestore.collection('tasks').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Tasks;
          const id = a.payload.doc.id;
          return {id, ...data};
        }).filter(task => task.complete == false);
      })
    )
  }

  public getCompleteTasks(): Observable<Tasks[]> {
    return this.firestore.collection('tasks').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Tasks;
          const id = a.payload.doc.id;
          return {id, ...data};
        }).filter(task => task.complete == true);
      })
    )
  }

  public addTask(newTask: Tasks) {
    //this.tasks.push(newTask);
    this.firestore.collection('tasks').add(newTask)
  }

  public removeTask(id: string) {
    //this.tasks.splice(pos, 1);
    this.firestore.collection('tasks').doc(id).delete();
  }

  public removeCompleteTask(pos:number){
    //this.tasksComplete.splice(pos,1);
  }

  public completeTask(id: string){
    //this.tasksComplete.push(this.tasks[pos]);
    //this.tasks.splice(pos, 1);
    this.firestore.collection('tasks').doc(id).update({
      complete: true
    });
  }

  public uncompleteTask(id: string){
    //this.tasks.push(this.tasksComplete[pos]);
    //this.tasksComplete.splice(pos,1);
    this.firestore.collection('tasks').doc(id).update({
      complete: false
    });
  }
}