import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { AuthConnexionUserComponent } from './auth-connexion-user/auth-connexion-user.component'
import { AuthInscriptionUserComponent } from './auth-inscription-user/auth-inscription-user.component'
import { UserAccountComponent } from './user-account/user-account.component'
import { PublicationEditComponent } from './publication-edit/publication-edit.component';
import { UserDataUpdateComponent } from './user-data-update/user-data-update.component';
import { PublicationCreateComponent } from './publication-create/publication-create.component';
import { AuthGuard } from './guards/auth.guard';  
import { MyAccountComponent } from './my-account/my-account.component';
import { FormulaireGuard } from './guards/fomulaire.guard';

const routes: Routes = [
  { path: 'user/:id', component: UserAccountComponent },
  { path: '', component:  HomeComponent },
  { path: 'connexion', component:  AuthConnexionUserComponent },
  { path: 'inscription', component:  AuthInscriptionUserComponent ,
    canDeactivate : [FormulaireGuard]

  },
  { path: 'mon-compte', component:  MyAccountComponent, canActivate : [AuthGuard] ,
  children: [
    {
      path: 'edit',  // child route path
      title: "Edit data",
      component: UserDataUpdateComponent,  // child route component that the router renders
      canDeactivate : [FormulaireGuard]
    },
    {
      path: 'create-new-post',  // child route path
      title: "Create new post",
      component: PublicationCreateComponent,  // child route component that the router renders
      canDeactivate : [FormulaireGuard]

    },
  ]
  },
  { path: 'publication/edit/:id', component:  PublicationEditComponent,
    canDeactivate : [FormulaireGuard]

   },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
