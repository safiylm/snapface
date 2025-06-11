import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthInscriptionUserComponent } from './auth-inscription-user.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user-service';
import { of, throwError } from 'rxjs';

describe('AuthInscriptionUserComponent', () => {
  let component: AuthInscriptionUserComponent;
  let fixture: ComponentFixture<AuthInscriptionUserComponent>;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, NgIf],
    }).compileComponents()
    service = TestBed.inject(UserService);
    fixture = TestBed.createComponent(AuthInscriptionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should init the form', () => {
    expect(component.user).toBeDefined();
    expect(component.isDisplayPassword).toBeDefined();
    expect(component.isDisplayPassword2).toBeDefined();
    expect(component.reglePasswordRespected).toBeDefined();


    expect(component.user.email).toBe('example@gmail.com'); // Vérifie la valeur initiale

  });


  it('should call the inscription successfull', fakeAsync(() => {

    // Arrange
    const data = new User("662eb361c2fd9ad3238d752a",
      "Sarah",
      "Martin",
      "sarah.martin@gmail.com",
      "$2a$10$8fBvUXdyAlmqTQTYoDMAyOLgD4CRX00BL39f2PsPCtwVI5hrmHChC",
      768259414,
      "",
      "",
      false,
      true, null)

    spyOn(service, 'inscription').and
      .returnValue(of({ user: data }));

    data.password = "Snapface123*"
    component.password2 = 'Snapface123*';
    component.reglePasswordRespected = data.password == component.password2
    component.user = data;

    component.onSubmit();
    tick();
    // Assert
    expect(component.res).toContain("Inscription success.");

  }));



  it('should call the inscription with email ERROR', fakeAsync(() => {

    component.user = new User("662eb361c2fd9ad3238d752a",
      "Sarah", "Martin",
      "sarah.martin.gmail.com", "Snapface123*",
      768259414, "", "",
      false, true, null)

    spyOn(service, 'inscription').and
      .returnValue(of({ message: "email invalide" }));

    component.onSubmit()
    tick();

  }));



  it('devrait basculer l\'affichage des mots de passe', () => {
    expect(component.isDisplayPassword).toBeFalse();
    component.toggleDisplayPassword(1);
    expect(component.isDisplayPassword).toBeTrue();

    expect(component.isDisplayPassword2).toBeFalse();
    component.toggleDisplayPassword(2);
    expect(component.isDisplayPassword2).toBeTrue();
  });


  it('devrait vérifier la complexité du mot de passe', () => {
    component.user.password = 'Test@1234';
    component.getFirstPassword(null);
    expect(component.reglePasswordRespected).toBeTrue();

    component.user.password = 'Test1234';
    component.getFirstPassword(null);
    expect(component.reglePasswordRespected).toBeFalse();

    component.user.password = 'test@1234';
    component.getFirstPassword(null);
    expect(component.reglePasswordRespected).toBeFalse();


    component.user.password = 'test***********';
    component.getFirstPassword(null);
    expect(component.reglePasswordRespected).toBeFalse();

    component.user.password = '4852563***********';
    component.getFirstPassword(null);
    expect(component.reglePasswordRespected).toBeFalse();


  });

})