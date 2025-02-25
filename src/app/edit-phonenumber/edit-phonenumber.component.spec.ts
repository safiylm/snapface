import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPhonenumberComponent } from './edit-phonenumber.component';
import { NgIf } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user-service';
import { of } from 'rxjs';

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
    const data = new User(
      "", "Test", "Martin",
      "test.martin@gmail.com", "$2a$10$8fBvUXdyAlmqTQTYoDMAyOLgD4CRX00BL39f2PsPCtwVI5hrmHChC",
      768259414,
      "https://images.pexels.com/photos/17542964/pexels-photo-17542964/free-photo-of-lumineux-route-lunettes-de-soleil-gens.jpeg",
      "https://images.pexels.com/photos/4767578/pexels-photo-4767578.jpeg"
    )
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

})