import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPhonenumberComponent } from './edit-phonenumber.component';
import { NgIf } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user-service';
import { of } from 'rxjs';
/*
describe('Edit phone number ', () => {
  
  let component: EditPhonenumberComponent;
  let fixture: ComponentFixture<EditPhonenumberComponent>;
  let httpTestingController: HttpTestingController;
  let service: UserService;
 
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [NgIf, HttpClientTestingModule],

    }).compileComponents()

    fixture = TestBed.createComponent(EditPhonenumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should edit phone number', () => {

    // Arrange
    const data = new User("66e9219abe68cdd15907399e", "Cat", "Dog", "catdog@gmail.com",
      "$2a$10$.y29U/K4Z9FG/FTLtylWvO5P05ufLVQt/uG/YK2bXWStughUmwX3C", 123,
      "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg", false, false, null);

    component.phoneNumber = 768262524;
    spyOn(component, 'editPhoneNumber')
    component.phoneNumber = data.phoneNo;

    spyOn(service, 'editPhoneNumber').and
      .returnValue(of(data));

    // Act
    component.editPhoneNumber();

    // Assert
    expect(component.editPhoneNumber).toHaveBeenCalled();

  });

})*/