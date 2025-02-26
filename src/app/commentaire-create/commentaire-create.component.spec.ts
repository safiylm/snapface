import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentaireCreateComponent } from './commentaire-create.component';
import { NgIf } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentaireService } from 'src/services/commentaire-service';
import { Commentaire } from 'src/models/commentaire.model';
import { of, throwError } from 'rxjs';

describe('Commentaire Create Component', () => {
  let component: CommentaireCreateComponent;
  let fixture: ComponentFixture<CommentaireCreateComponent>;
  let httpTestingController: HttpTestingController;
  let service: CommentaireService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        CommentaireService,
      ],
      imports: [NgIf, HttpClientTestingModule],

    }).compileComponents()

    fixture = TestBed.createComponent(CommentaireCreateComponent);
    component = fixture.componentInstance;
   
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CommentaireService);
    component.id = "662eb417c2fd9ad3238d752e"
    component.commentaire = new Commentaire(
      "6697ffa585ac11e40dccc044",
      "La mer est un espace de rigueur et de liberté. Victor Hugo",
      1721237413177,
      "662eb2a1c2fd9ad3238d7528", //userId
      "662eb417c2fd9ad3238d752e" //postId
    );
    window.localStorage.setItem("userId", "662eb2a1c2fd9ad3238d7528")
 fixture.detectChanges();
  });


  it('should create', () => {
    expect(component.id).toBeDefined()
    expect(component).toBeTruthy();
    expect(component.result).toBe("");
  });


  it('should create comment', () => {

    spyOn(component, 'createNewComment').and.callThrough();
    spyOn(service, 'addNewCommentaire').and
      .returnValue(of(component.commentaire));
    // Act
    component.createNewComment();
    // Assert
    expect(component.createNewComment).toHaveBeenCalled();
    expect(component.result).toBe("Votre commentaire a été crée avec succès")

  });


  it('should erreur create comment', () => {

    spyOn(component, 'createNewComment').and.callThrough();
    spyOn(service, 'addNewCommentaire').and
      .returnValue(throwError(() => new Error('Erreur API')));
    // Act
    component.createNewComment();
    // Assert
    expect(component.createNewComment).toHaveBeenCalled();
    expect(component.result).toContain("Une erreur s'est produite veuillez recommencer.")

  });


})