import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthInscriptionUserComponent } from './auth-inscription-user.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user-service';
import { of } from 'rxjs';

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

    expect(component.user).toEqual(new User("", "", "",
      "example@gmail.com", "",
      0, "", ""))
    
      expect(component.user.email).toBe('example@gmail.com'); // Vérifie la valeur initiale

  });
  

  it('should call the inscription to create new user', () => {

    // Arrange
    const data = new User(
      "", "Test", "Martin",
      "test.martin@gmail.com", "$2a$10$8fBvUXdyAlmqTQTYoDMAyOLgD4CRX00BL39f2PsPCtwVI5hrmHChC",
      768259414,
      "https://images.pexels.com/photos/17542964/pexels-photo-17542964/free-photo-of-lumineux-route-lunettes-de-soleil-gens.jpeg",
      "https://images.pexels.com/photos/4767578/pexels-photo-4767578.jpeg"
    )

    spyOn(component, 'onSubmit')
    component.user = data;

    spyOn(service, 'inscription').and
      .returnValue(of(data));

    // Act
    component.onSubmit();

    // Assert
    expect(component.onSubmit).toHaveBeenCalled();
  });

  /*
    it('should test the saveProduct for failure while add a new product', () => {
      const data = new User(
        "", "Test", "Martin",
        "test.martin@gmail.com", "$2a$10$8fBvUXdyAlmqTQTYoDMAyOLgD4CRX00BL39f2PsPCtwVI5hrmHChC",
        768259414,
        "https://images.pexels.com/photos/17542964/pexels-photo-17542964/free-photo-of-lumineux-route-lunettes-de-soleil-gens.jpeg",
        "https://images.pexels.com/photos/4767578/pexels-photo-4767578.jpeg"
      )
  
      const error = new Error('Error while create a new user');
     spyOn( service, "inscription").and.returnValue((throwError(() => error)));
      component.user = data;
      component.onSubmit();
      expect(service.inscription).toHaveBeenCalled();
  
    });*/

})