import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDataUpdateComponent } from './user-data-update.component';
import { NgFor } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from 'src/services/user-service';
import { User } from 'src/models/user.model';
import { of } from 'rxjs';


describe('UserDataEditComponent', () => {
  let component: UserDataUpdateComponent;
  let fixture: ComponentFixture<UserDataUpdateComponent>;
  let httpTestingController: HttpTestingController;
  let service: UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgFor, HttpClientTestingModule],
    }).compileComponents()

    fixture = TestBed.createComponent(UserDataUpdateComponent);
    component = fixture.componentInstance;
    component.id = "66e9219abe68cdd15907399e";
    service = TestBed.inject(UserService);
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load data from the API', () => {

    let mockData = new User("66e9219abe68cdd15907399e", "Cat", "Dog", "catdog@gmail.com",
      "$2a$10$.y29U/K4Z9FG/FTLtylWvO5P05ufLVQt/uG/YK2bXWStughUmwX3C", 123,
      "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg");

    fixture.detectChanges(); // Déclenche ngOnInit

    // Simuler une requête HTTP
    const req = httpTestingController.expectOne
      ('https://snapface.onrender.com/api/userid?id=66e9219abe68cdd15907399e');
    expect(req.request.method).toBe('GET'); // Vérifie le type de requête
    req.flush(mockData); // Envoie une réponse simulée

    // Vérifie que les données sont assignées correctement
    expect(component.user).toEqual(mockData);

  });

  
  it('should edit user', () => {

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

    spyOn(service, 'updateUser').and
      .returnValue(of(data));

    // Act
    component.onSubmit();

    // Assert
    expect(component.onSubmit).toHaveBeenCalled();

  });



})