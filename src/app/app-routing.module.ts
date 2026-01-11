import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AllPublicationsResolverService } from 'src/services/resolver/all-publications-resolver-service';
import { MyPublicationsResolverService } from 'src/services/resolver/my-publications-resolver-service';
import { MyUserDataResolverService } from 'src/services/resolver/my-user-data-resolver-service';
import { PublicationsByUserIdResolverService } from 'src/services/resolver/publications-by-userid-resolver-service';
import { AllUsersResolverService } from 'src/services/resolver/all-users-resolver-service';
import { UserDataResolverService } from 'src/services/resolver/user-data-resolver-service';
import { formulaireDesactiveGuard } from './guards/formulaire-desactive.guard'
import { FormEmailComponent } from './user/edit/password-oublier/form-email/form-email.component';
import { PasswordOublierComponent } from './user/edit/password-oublier/password-oublier.component';
import { PourMoiComponent } from './pour-moi/pour-moi.component';

const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('./home/home.component')
      .then(mod => mod.HomeComponent),
    resolve: {
      publications: AllPublicationsResolverService,
      users: AllUsersResolverService
    }
  },

  {
    path: 'user/:id',
    loadComponent: () => import('./user/user-account/user-account.component')
      .then(mod => mod.UserAccountComponent),
    resolve: {
      publications: PublicationsByUserIdResolverService,
      user: UserDataResolverService,
      users: AllUsersResolverService
    }
  },

  {
    path: 'connexion',
    loadComponent: () => import('./auth/auth-connexion-user/auth-connexion-user.component')
      .then(mod => mod.AuthConnexionUserComponent)
  },

  {
    path: 'inscription',
    loadComponent: () => import('./auth/auth-inscription-user/auth-inscription-user.component')
      .then(mod => mod.AuthInscriptionUserComponent),
    canDeactivate: [formulaireDesactiveGuard]

  },
  {
    path: 'mon-compte',
    loadComponent: () => import('./user/my-account/my-account.component')
      .then(mod => mod.MyAccountComponent),
    canActivate: [AuthGuard],
    resolve: {
      publications: MyPublicationsResolverService,
      user: MyUserDataResolverService
    },
  },

  {
    path: 'search',
    loadComponent: () => import('./search/search.component')
      .then(mod => mod.SearchComponent),
  },


    {
    path: 'post-create',
    title: "Créer une publication",
    loadComponent: () => import('./post/publication-create/publication-create.component')
      .then(mod => mod.PublicationCreateComponent),
    canDeactivate: [formulaireDesactiveGuard],
  },

  {
    path: 'user-edit',
    title: "Modifier ses données",
    loadComponent: () => import('./user/edit/user-data-update/user-data-update.component')
      .then(mod => mod.UserDataUpdateComponent),
    canDeactivate: [formulaireDesactiveGuard],
  },



//  ----------------------------------------------------------------
  {
    path: 'post/:id',
    loadComponent: () => import('./post/publication/publication.component')
      .then(mod => mod.PublicationComponent
      ),
  },


  {
    path: 'post-edit/:id',
    title: "Modifier sa publication",
    loadComponent: () => import('./post/publication-edit/publication-edit.component')
      .then(mod => mod.PublicationEditComponent),
    canDeactivate: [formulaireDesactiveGuard],
    resolve: {
      user: MyUserDataResolverService
    },
  },



  {
    path: 'password-oublie/email',
    title: "Mot de passe oublie",
    component: FormEmailComponent
  },

  {
    path: 'reinistialisation-password/:token',
    title: "Reinitialisation du mot de passe",
    component: PasswordOublierComponent
  },

  {
    path: 'pour-moi',
    title: "Pour moi",
    component: PourMoiComponent
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuard]
})

export class AppRoutingModule { }
