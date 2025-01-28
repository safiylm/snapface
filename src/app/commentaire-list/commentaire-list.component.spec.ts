import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentaireListComponent } from './commentaire-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentaireService } from 'src/services/commentaire-service';
import { Commentaire } from 'src/models/commentaire.model';

describe('CommentaireListComponent', () => {
  let component: CommentaireListComponent;
  let fixture: ComponentFixture<CommentaireListComponent>;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommentaireService
      ],
      imports: [HttpClientTestingModule, RouterTestingModule, NgIf],
    }).compileComponents()

    fixture = TestBed.createComponent(CommentaireListComponent);
    component = fixture.componentInstance;
    component.id = "662eb417c2fd9ad3238d752e";
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load data from the API', () => {

    let mockData =
      [{ "_id": "662eba10938a67d7342c0896", "title": "C'est magnifique", "date": 1711554340894, "userId": "662eb3a7c2fd9ad3238d752d", "postId": "662eb417c2fd9ad3238d752e" },
      { "_id": "6697ff9e85ac11e40dccc043", "title": "La mer est tres belle", "date": 1721237406601, "userId": "662eb2a1c2fd9ad3238d7528", "postId": "662eb417c2fd9ad3238d752e" },
      { "_id": "6697ffa585ac11e40dccc044", "title": "La mer est un espace de rigueur et de liberté. Victor Hugo", "date": 1721237413177, "userId": "662eb2a1c2fd9ad3238d7528", "postId": "662eb417c2fd9ad3238d752e" }
      ]

    fixture.detectChanges(); // Déclenche ngOnInit

    // Simuler une requête HTTP
    const req = httpTestingController.expectOne
      ('https://snapface.onrender.com/api/commentairesByPostId?id=662eb417c2fd9ad3238d752e');
    expect(req.request.method).toBe('GET'); // Vérifie le type de requête
    req.flush(mockData); // Envoie une réponse simulée

    // Vérifie que les données sont assignées correctement
    expect(component.commentaires).toEqual(mockData);
  });

})