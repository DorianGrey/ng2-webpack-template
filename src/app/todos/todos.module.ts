import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { TodoListComponent } from "./todo-list.component";
import { TodoService } from "./todo.service";
import { TODO_ROUTES } from "./todos.routes";

@NgModule({
  imports: [SharedModule, TODO_ROUTES],
  declarations: [TodoListComponent],
  providers: [TodoService]
})
export class TodosModule {}
