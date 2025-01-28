import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDataUpdateComponent } from './user-data-update.component';
import { NgFor } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from 'src/services/user-service';
import { User } from 'src/models/user.model';


describe('UserDataEditComponent', () => {
  let component: UserDataUpdateComponent; 
  let fixture: ComponentFixture<UserDataUpdateComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach( () => {
    TestBed.configureTestingModule({
      providers: [
              UserService,
            ],
      imports:[NgFor, HttpClientTestingModule],
    }).compileComponents()
  
    fixture = TestBed.createComponent(UserDataUpdateComponent); 
    component = fixture.componentInstance; 
    component.id = "66e9219abe68cdd15907399e";
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

})