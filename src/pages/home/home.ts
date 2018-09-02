import { Component } from "@angular/core";
import { AlertController, NavController, reorderArray } from "ionic-angular";
import { TodoProvider } from "../../providers/todo/todo";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public todos = [];

  public reorderIsEnabled = false;
  constructor(
    private todoProvider: TodoProvider,
    public navCtrl: NavController,
    private alertController: AlertController
  ) {
    this.todos = this.todoProvider.getTodos();
  }

  goToArchivePage(ArchivePage) {
    // lazy-loaded
    this.navCtrl.push("page-archived-todos");
  }

  toggleReorder() {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event) {
    reorderArray(this.todos, $event);
  }

  openTodoAlert() {
    let addTodoAlert = this.alertController.create({
      title: "Add A Todo",
      message: "Enter your Todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: inputData => {
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoProvider.addTodo(todoText);
          }
        }
      ]
    });
    addTodoAlert.present();
  }
}
