import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {AppComponent} from './app.component';
import {
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatSelectModule,
  MatProgressSpinnerModule
} from '@angular/material';
import {HomeComponent} from './home/home.component';
import {TodoService} from './todo.service';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoComponent} from './todo/todo.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FormsModule} from '@angular/forms';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';
import { appReducer } from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';


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
    StoreModule.forRoot({ app: appReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states,
      logOnly: environment.production // Restrict extension to log-only mode
    }),
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
    MatSelectModule,
    MatProgressSpinnerModule,
    EffectsModule.forRoot([AppEffects])
  ],
  entryComponents: [TodoDialogComponent],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
