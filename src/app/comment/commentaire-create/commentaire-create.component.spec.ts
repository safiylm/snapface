import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
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
    fixture.detectChanges();
  });


  it('should init', () => {
    // expect(component.postId).toBeDefined()
    expect(component).toBeTruthy();
    expect(component.result).toBe("");
  });


  it('should create comment', fakeAsync(() => {

    component.postId = "662eb417c2fd9ad3238d752e"
    component.commentaire = new Commentaire(
      "6697ffa585ac11e40dccc044",
      "La mer est un espace de rigueur et de liberté. Victor Hugo",
      "662eb2a1c2fd9ad3238d7528",
      "662eb417c2fd9ad3238d752e",
      false,
      false,
      null, null
    );

    spyOn(service, "addNewCommentaire").and.returnValue(of(
      { "commentaire": component.commentaire, "publication": 1 }));
    window.localStorage.setItem("userId", "662eb2a1c2fd9ad3238d7528")
    // Act
    component.createNewComment();

    tick(500)

    fixture.whenStable().then(() => {
      expect(component.result).toBe("")
    })

    expect(component.result).toBe("Votre commentaire a été crée avec succès")

    flush(); // resout le probleme avec settimeout 
    // Assert

  }));






  it('should erreur create comment', fakeAsync(() => {


    // component.postId = "662eb417c2fd9ad3238d752e"
    component.commentaire = new Commentaire(
      "6697ffa585ac11e40dccc044",
      "wsxdcfvgbhnj,k;l",
      "",
      "",
      false,
      false,
      null, null
    );

    spyOn(service, "addNewCommentaire").and.returnValue(of(
      { "erreur": "Erreur, champs vide" }));
    window.localStorage.setItem("userId", "662eb2a1c2fd9ad3238d7528")
    // Act
    component.createNewComment();

    tick(500)

    fixture.whenStable().then(() => {
      expect(component.result).toBe("")
    })

    expect(component.result).toBe("Erreur, veuillez recommencer.")

    flush(); // resout le probleme avec settimeout 
    // Assert

  }))



  it('should erreur create comment', fakeAsync(() => {


    // component.postId = "662eb417c2fd9ad3238d752e"
    component.commentaire = new Commentaire(
      "6697ffa585ac11e40dccc044",
      "",
      "",
      "",
      false,
      false,
      null, null
    );

    spyOn(service, "addNewCommentaire").and.returnValue(of(
      { "erreur": "Erreur, champs vide" }));
    window.localStorage.setItem("userId", "662eb2a1c2fd9ad3238d7528")
    // Act
    component.createNewComment();

    tick(500)

    fixture.whenStable().then(() => {
      expect(component.result).toBe("")
    })

    expect(component.result).toBe("Saisissez votre commentaire")

    flush(); // resout le probleme avec settimeout 
    // Assert

  }))

})