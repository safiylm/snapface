import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuteurInPostOrCommentaireComponent } from './auteur-in-post-or-commentaire.component';
import { UserService } from 'src/services/user-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from 'src/models/user.model';


describe('AuteurInPostOrCommentaireComponent', () => {
  let component: AuteurInPostOrCommentaireComponent;
  let fixture: ComponentFixture<AuteurInPostOrCommentaireComponent>;
  let httpTestingController: HttpTestingController;


  beforeEach(async () => {

    await TestBed.configureTestingModule({
      providers: [
        UserService,
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents()

    fixture = TestBed.createComponent(AuteurInPostOrCommentaireComponent); // Crée une instance du composant
    component = fixture.componentInstance; // Accès à l'instance du composant
    component.id = "66e9219abe68cdd15907399e";
    fixture.detectChanges();// Déclenche la détection des modifications initiales
    httpTestingController = TestBed.inject(HttpTestingController);

  });



  it('should create the component', () => {
    expect(component).toBeTruthy();// Vérifie que le composant est créé
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
    console.log(component.user)
   
  });

});