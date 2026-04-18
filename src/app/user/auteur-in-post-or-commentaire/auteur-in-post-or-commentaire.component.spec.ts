import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuteurInPostOrCommentaireComponent } from './auteur-in-post-or-commentaire.component';
import { UserService } from 'src/services/user-service';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { User } from 'src/models/user.model';
import { provideHttpClient } from '@angular/common/http';


describe('AuteurInPostOrCommentaireComponent', () => {
  let component: AuteurInPostOrCommentaireComponent;
  let fixture: ComponentFixture<AuteurInPostOrCommentaireComponent>;
  let httpTestingController: HttpTestingController;
  let p_username: HTMLElement;
  let photo: HTMLElement;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(AuteurInPostOrCommentaireComponent); // Crée une instance du composant
    component = fixture.componentInstance; // Accès à l'instance du composant
    component.id = "662eb361c2fd9ad3238d752a";

    fixture.detectChanges();// Déclenche la détection des modifications initiales
    httpTestingController = TestBed.inject(HttpTestingController);

    p_username = fixture.nativeElement.querySelector('#username');
    photo = fixture.nativeElement.querySelector('#photos-profil-user-in-commentaire');
  });


  afterEach(() => {
    // Vérifie qu'aucune requête HTTP n'est restée en attente
    httpTestingController.verify();
  });




  it('should load data from the API', () => {

    // 1. Données factices pour simuler la réponse de l'API
    let mockData = new User("662eb361c2fd9ad3238d752a", "Anna Martin", "anna.martin@gmail.com",
      "$2a$10$8fBvUXdyAlmqTQTYoDMAyOLgD4CRX00BL39f2PsPCtwVI5hrmHChC", 768259414,
      "https://images.pexels.com/photos/34769699/pexels-photo-34769699.jpeg",
      "https://images.pexels.com/photos/16414737/pexels-photo-16414737.jpeg",
      false, false, null);

    // 2. Lance ngOnInit (et donc l'appel HTTP du composant)
    fixture.detectChanges();

    // 3. Intercepte la requête vers /users
     const req = httpTestingController.expectOne('http://localhost:4100/api/userid?id=662eb361c2fd9ad3238d752a');
     expect(req.request.method).toBe('GET');

    // 4. Renvoie la réponse factice
    req.flush(mockData);

    // 5. Met à jour le template après la réponse
   
    fixture.detectChanges();

    expect(component.user).toEqual(mockData);

    // component.user = new User("662eb361c2fd9ad3238d752a", "Anna Martin", "anna.martin@gmail.com",
    //   "$2a$10$8fBvUXdyAlmqTQTYoDMAyOLgD4CRX00BL39f2PsPCtwVI5hrmHChC", 768259414,
    //   "https://images.pexels.com/photos/34769699/pexels-photo-34769699.jpeg",
    //   "https://images.pexels.com/photos/16414737/pexels-photo-16414737.jpeg",
    //   false, false, null);
    //   fixture.detectChanges()
    expect(p_username.textContent).toContain(component.user.name);
    //expect(photo.getAttribute("src")).toContain(component.user.photos_profil);
  });


});