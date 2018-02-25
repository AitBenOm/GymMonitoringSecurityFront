import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';



import {LoginComponent} from "./Auth/login/login.component";
import {RegisterComponent} from "./Auth/register/register.component";
import {AppComponent} from "./app.component";
import {ProgramComponent} from "./program/program.component";
import {ProgramDetailComponent} from "./program/program-detail/program-detail.component";
import {ExerciseComponent} from "./exercise/exercise.component";
import {AuthGuard} from "./Auth/auth.guard";
import {HomeComponent} from "./home/home.component";
import {TestComponent} from "./test/test.component";




const appRoutes: Routes = [
  // { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  //{ path: 'recipes', loadChildren: './recipes/recipes.module.ts#RecipesModule'},
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'test', component: TestComponent },
  {path: 'program', component: ProgramComponent, children: [
    { path: ':id', component: ProgramDetailComponent },
  ], canActivate : [AuthGuard]},
/*  {path: 'exercise', component: ExerciseComponent, children: [
    { path: ':id', component: ExerciseListComponent },
  ]},*/
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
