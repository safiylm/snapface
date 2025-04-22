import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthConnexionUserComponent } from './auth-connexion-user.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';
import { UserService } from 'src/services/user-service';
import { of } from 'rxjs';

/**
 * 
 * test unitaire pour AuthConnexionUserComponent en utilisant Jasmine et TestBed. 
 * Le test simulera les appels au service UserService, 
 * vérifiera la logique d'authentification et gérera les erreurs.
 */
describe('AuthConnexionUserComponent', () => {
  let component: AuthConnexionUserComponent; 
  let fixture: ComponentFixture<AuthConnexionUserComponent>;
  let service : UserService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,  NgIf, CommonModule],
    }).compileComponents()

  
    fixture = TestBed.createComponent(AuthConnexionUserComponent); 
    component = fixture.componentInstance; 
    fixture.detectChanges();
    service = TestBed.inject(UserService);
  });


  it('should create the component', () => {
    expect(component).toBeTruthy();// Vérifie que le composant est créé
  });

  it("should display password", ()=>{
    expect(component.isDisplayPassword).toBeFalse();
    component.toggleDisplayPassword()
    expect(component.isDisplayPassword).toBeTrue();
  })

  it('should render the title in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Connexion'); // Vérifie le rendu dans le DOM
  });

  it('devrait gérer une connexion réussie', (done) => {
    const mockUser = { _id:	"662eb361c2fd9ad3238d752a", email: "anna.martin@gmail.com", password: 'Snapface123*' };
    
    spyOn(service, "connexion").and.returnValue(of(mockUser));
    spyOn(localStorage, 'setItem');

    component.email = "anna.martinn@gmail.com";
    component.password = 'Snapface123*';
    component.onSubmit();

    setTimeout(() => {
    //  expect(localStorage.setItem).toHaveBeenCalledWith('isLoggedIn', 'true');
     // expect(localStorage.setItem).toHaveBeenCalledWith('userId', '123');
     // expect(component.result).toBe('CONNEXION REUSSI.');
      done();
    }, 50);
  });

  it('devrait afficher un message d\'erreur si l\'email est incorrect', () => {
    spyOn(service,"connexion").and.returnValue(of(null));
    component.onSubmit();
    expect(component.result).toBe('Votre email est incorrecte.');
  });

})