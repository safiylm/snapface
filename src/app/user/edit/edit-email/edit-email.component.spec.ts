import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEmailComponent } from './edit-email.component';
import { NgIf } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user-service';
import { of, throwError } from 'rxjs';
/*
describe('Edit email', () => {
  let component: EditEmailComponent;
  let fixture: ComponentFixture<EditEmailComponent>;
  let httpTestingController: HttpTestingController;
  let service: UserService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [NgIf, HttpClientTestingModule],

    }).compileComponents()

    fixture = TestBed.createComponent(EditEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
    window.localStorage.setItem("userId", "662eb2a1c2fd9ad3238d7528")

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should edit email with success', () => {

    component.email = "test.martin@gmail.com";
    spyOn(component, 'editEmail').and.callThrough();

    spyOn(service, 'editEmail').and
      .returnValue(of(
        new User("66e9219abe68cdd15907399e", "Cat", "Dog", component.email,
          "$2a$10$.y29U/K4Z9FG/FTLtylWvO5P05ufLVQt/uG/YK2bXWStughUmwX3C", 123,
          "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          "https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg", false, false, null)
      ));
    // Act
    component.editEmail();
    // Assert
    expect(component.editEmail).toHaveBeenCalled();
    expect(component.resultat).toContain("Email modifier avec succes")

  });

  it("Should edit email with error", () => {
    spyOn(component, "editEmail").and.callThrough()
    spyOn(service, "editEmail").and.returnValue(throwError(() => new Error('Error edit email')));
    component.editEmail();
    expect(component.editEmail).toHaveBeenCalled()
    expect(component.resultat).toContain("Erreur, réessayser")
  })


})*/