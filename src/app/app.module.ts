import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ProgramComponent } from './program/program.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './Auth/login/login.component';


import { RegisterComponent } from './Auth/register/register.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./user/user.service";
import { AddProgramComponent } from './program/add-program/add-program.component';
import { ProgramListComponent } from './program/program-list/program-list.component';
import { ProgramDetailComponent } from './program/program-detail/program-detail.component';
import { ProgramItemComponent } from './program/program-list/program-item/program-item.component';
import {ProgramService} from "./program/program.service";

import {ExerciseService} from "./exercise/exercise.service";
import { AddExerciseComponent } from './exercise/add-exercise/add-exercise.component';
import { AddLoadComponent } from './exercise/add-load/add-load.component';
import {AuthService} from "./Auth/auth.service";
import {AuthGuard} from "./Auth/auth.guard";
import { HomeComponent } from './home/home.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";

import {HeaderService} from "./header/header.service";
import { FilterByNamePipe } from './shared/filter-by-name.pipe';
import { TestComponent } from './test/test.component';
import { UserStatsComponent } from './user/user-stats/user-stats.component';









@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    ProgramComponent,
    ExerciseComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    AddProgramComponent,
    ProgramListComponent,
    ProgramDetailComponent,
    ProgramItemComponent,
    AddExerciseComponent,
    AddLoadComponent,
    HomeComponent,
    FilterByNamePipe,
    TestComponent,
    UserStatsComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
   HttpClientModule
  ],
  providers: [UserService,ProgramService,ExerciseService,AuthService, AuthGuard,HeaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
