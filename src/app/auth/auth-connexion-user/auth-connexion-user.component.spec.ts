import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthConnexionUserComponent } from './auth-connexion-user.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';
import { UserService } from 'src/services/user-service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/**
 * 
 * test unitaire pour AuthConnexionUserComponent en utilisant Jasmine et TestBed. 
 * Le test simulera les appels au service UserService, 
 * vérifiera la logique d'authentification et gérera les erreurs.
 */
describe('Connexion Component', () => {
  let component: AuthConnexionUserComponent;
  let fixture: ComponentFixture<AuthConnexionUserComponent>;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgIf, CommonModule],
    }).compileComponents()


    fixture = TestBed.createComponent(AuthConnexionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(UserService);
  });


  it('should create the component', () => {
    expect(component).toBeTruthy();// Vérifie que le composant est créé
  });

  it("should display password", () => {
    expect(component.isDisplayPassword).toBeFalse();
    component.toggleDisplayPassword()
    expect(component.isDisplayPassword).toBeTrue();
  })

  it('should render the title in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Connexion'); // Vérifie le rendu dans le DOM
  });

  // fakeAsync permet d'utiliser tick() pour gérer l’asynchrone.
  it('devrait gérer une connexion réussie', fakeAsync(() => {
    const mockUser =
      { message: 'CONNEXION REUSSI.', user: { "_id": "662eb361c2fd9ad3238d752a", "firstName": "Anna", "lastName": "Martin", "photos_profil": "https://res.cloudinary.com/dx99ggqy1/image/upload/v1744917861/uploads_secure/yabhu9jpawqea1sapxa2.jpg", "photos_background": "https://res.cloudinary.com/dx99ggqy1/image/upload/v1744918250/uploads_secure/ul3pxasz0oie2j8bcxeq.png", "email": "anna.martin@gmail.com", "phoneNo": 768259414, "password": "$2a$10$8fBvUXdyAlmqTQTYoDMAyOLgD4CRX00BL39f2PsPCtwVI5hrmHChC", "isPrivate": false, "isOnline": true } }
    //simule un appel HTTP réussi.
    spyOn(service, "connexion").and.returnValue(of(mockUser));

    component.email = "anna.martin@gmail.com";
    component.password = 'Snapface123*';
    component.onSubmit()
    tick()// Avance le temps pour que l'observable soit traité

    expect(component.result).toBe('CONNEXION REUSSI.');


  }));

  it('devrait afficher un message d\'erreur si l\'email est incorrect', fakeAsync(() => {
    component.email = "anna.martin@gmail.comm";
    component.password = 'Snapface123*';
  
    spyOn(service, "connexion").and.returnValue(of({ message: 'Votre email est incorrecte.' }));
    component.onSubmit();
    tick()// Avance le temps pour que l'observable soit traité

    expect(component.result).toBe('Votre email est incorrecte.');
  }));

  it('devrait afficher un message d\'erreur si le mot de passe est incorrect', fakeAsync(() => {
    component.email = "anna.martin@gmail.comm";
    component.password = 'Snapface123';
    spyOn(service, "connexion").and.returnValue(of({ message: 'Votre mot de passe est incorrecte.' }));
    component.onSubmit();
    tick()// Avance le temps pour que l'observable soit traité

    expect(component.result).toBe('Votre mot de passe est incorrecte.');
  }));

})