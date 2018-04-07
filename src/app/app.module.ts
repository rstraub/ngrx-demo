import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatButtonModule,
  MatDialogModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatSelectModule
} from '@angular/material';
import {HomeComponent} from './home/home.component';
import {TodoService} from './todo.service';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoComponent} from './todo/todo.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FormsModule} from '@angular/forms';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoListComponent,
    TodoComponent,
    NavbarComponent,
    TodoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  entryComponents: [TodoDialogComponent],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
