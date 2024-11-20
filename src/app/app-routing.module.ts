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

import { AllPublicationsResolverService } from 'src/services/resolver/all-publications-resolver-service';
import { MyPublicationsResolverService } from 'src/services/resolver/my-publications-resolver-service';
import { MyUserDataResolverService } from 'src/services/resolver/my-user-data-resolver-service';
import { PublicationsByUserIdResolverService } from 'src/services/resolver/publications-by-userid-resolver-service';
import { AllUsersResolverService } from 'src/services/resolver/all-users-resolver-service';
import { UserDataResolverService } from 'src/services/resolver/user-data-resolver-service';

import { formulaireDesactiveGuard } from './guards/formulaire-desactive.guard'
import { PasswordEditComponent } from './password-edit/password-edit.component';

const routes: Routes = [
  {
    path: 'user/:id', component: UserAccountComponent,
    resolve: { publications: PublicationsByUserIdResolverService , 
      user : UserDataResolverService }
  },
  {
    path: '', component: HomeComponent,
    resolve: { publications: AllPublicationsResolverService, 
      users: AllUsersResolverService }
  },
  { path: 'connexion', component: AuthConnexionUserComponent },
  {
    path: 'inscription',
    component: AuthInscriptionUserComponent,
    canDeactivate: [formulaireDesactiveGuard]

  },
  {
    path: 'mon-compte', 
    component: MyAccountComponent, 
    canActivate: [AuthGuard],
    resolve: {publications: MyPublicationsResolverService, 
      user : MyUserDataResolverService
    },
    children: [
      {
        path: 'edit',  // child route path
        title: "Edit data",
        component: UserDataUpdateComponent,  // child route component that the router renders
        canDeactivate: [formulaireDesactiveGuard], 
       
      },
      {
        path: 'create-new-post',  // child route path
        title: "Create new post",
        component: PublicationCreateComponent,  // child route component that the router renders
        canDeactivate: [formulaireDesactiveGuard]
      },
    ]
  },
  {
    path: 'publication/edit/:id',
    component: PublicationEditComponent,
    title: "Modifier sa publication",
    canDeactivate: [formulaireDesactiveGuard]
  },

  {
    path: 'user/password/edit',
    component: PasswordEditComponent,
    title: "Modifier son mot de passe",
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
