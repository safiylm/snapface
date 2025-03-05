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
import { AdminPageComponent } from './admin-page/admin-page.component';
import { FormEmailComponent } from './password-oublier/form-email/form-email.component';
import { PasswordOublierComponent } from './password-oublier/password-oublier.component';
import { PourMoiComponent } from './pour-moi/pour-moi.component';

const routes: Routes = [
  {
    path: 'user/:id',
    loadComponent: () => import('./user-account/user-account.component')
      .then(mod => mod.UserAccountComponent),
    resolve: {
      publications: PublicationsByUserIdResolverService,
      user: UserDataResolverService,
      users: AllUsersResolverService
    }
  },
  {
    path: '',
    loadComponent: () => import('./home/home.component')
      .then(mod => mod.HomeComponent),
    resolve: {
      publications: AllPublicationsResolverService,
      users: AllUsersResolverService
    }
  },
  {
    path: 'connexion',
    loadComponent: () => import('./auth-connexion-user/auth-connexion-user.component')
      .then(mod => mod.AuthConnexionUserComponent)
  },

  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.component')
      .then(mod => mod.ChatComponent)
  },
  {
    path: 'inscription',
    loadComponent: () => import('./auth-inscription-user/auth-inscription-user.component')
      .then(mod => mod.AuthInscriptionUserComponent),
    canDeactivate: [formulaireDesactiveGuard]

  },
  {
    path: 'mon-compte',
    loadComponent: () => import('./my-account/my-account.component')
      .then(mod => mod.MyAccountComponent),
    canActivate: [AuthGuard],
    resolve: {
      publications: MyPublicationsResolverService,
      user: MyUserDataResolverService
    },
  },

  {
    path: 'mon-compte/edit',
    title: "Modifier mes données personnelles",
    loadComponent: () => import('./user-data-update/user-data-update.component')
      .then(mod => mod.UserDataUpdateComponent),
    canDeactivate: [formulaireDesactiveGuard],

  },
  {
    path: 'mon-compte/create-post',
    title: "Create new post",
    loadComponent: () => import("./publication-create/publication-create.component")
      .then(mod => mod.PublicationCreateComponent),
    canDeactivate: [formulaireDesactiveGuard]
  },


  {
    path: 'publication/edit/:id',
    title: "Modifier sa publication",
    loadComponent: () => import('./publication-edit/publication-edit.component')
      .then(mod => mod.PublicationEditComponent),
    canDeactivate: [formulaireDesactiveGuard]
  },

  {
    path: 'password/edit',
    title: "Modifier son mot de passe",
    loadComponent: () => import("./password-edit/password-edit.component")
      .then(mod => mod.PasswordEditComponent),

    canActivate: [AuthGuard],
  },

  {
    path: 'admin',
    title: "ADMIN",
    component: AdminPageComponent
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
  providers: [AuthGuard]
})

export class AppRoutingModule { }
