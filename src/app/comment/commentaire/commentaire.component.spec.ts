import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentaireComponent } from './commentaire.component';
import { NgIf } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentaireService } from 'src/services/commentaire-service';
import { Commentaire } from 'src/models/commentaire.model';
import { of, throwError } from 'rxjs';

describe('CommentaireComponent', () => {
  let component: CommentaireComponent;
  let fixture: ComponentFixture<CommentaireComponent>;
  let httpTestingController: HttpTestingController;
  let service: CommentaireService;
  
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        CommentaireService,
      ],
      imports: [NgIf, HttpClientTestingModule],

    }).compileComponents()

    fixture = TestBed.createComponent(CommentaireComponent);
    component = fixture.componentInstance;
   
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CommentaireService);

    component.commentaire = new Commentaire(
      "6697ffa585ac11e40dccc044",
      "La mer est un espace de rigueur et de liberté. Victor Hugo",
      "662eb2a1c2fd9ad3238d7528",
      "662eb417c2fd9ad3238d752e", 
      false, 
      false, 
      null, null
    );
    window.localStorage.setItem("userId", "662eb2a1c2fd9ad3238d7528")
  
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('init', () => {
    expect(component.isMyComment).toBeDefined()
    expect(component.isDisplayingForm).toBeDefined()
  })


  it('show & hide form editting comment', () => {

    expect(component.isDisplayingForm).toEqual(false)
    spyOn(component, 'showFormEditComment').and.callThrough()
    component.showFormEditComment();
    expect(component.showFormEditComment).toHaveBeenCalled()
    expect(component.isDisplayingForm).toEqual(true)

  })


  it('should edit comment', () => {

    spyOn(component, 'editComment').and.callThrough()
    spyOn(service, 'updateCommentaire').and
      .returnValue(of( component.commentaire ));
    // Act
    component.editComment()
    // Assert
    expect(component.editComment).toHaveBeenCalled();
    expect(component.result).toContain("Commentaire modifié avec succes!")
  });


  it('should erreur edit comment', () => {
   
    spyOn(component, 'editComment').and.callThrough();
    spyOn(service, 'updateCommentaire').and
      .returnValue(throwError(() => new Error('Erreur API')));
    // Act
    component.editComment();
    // Assert
    expect(component.editComment).toHaveBeenCalled();
    expect(component.result).toContain("Une erreur s'est produite veuillez réessayer!")

  });


  it('should delete comment', () => {

    spyOn(component, 'deleteComment').and.callThrough();
    spyOn(service, 'deleteCommentaire').and
      .returnValue(of(component.commentaire));
    // Act
    component.deleteComment();
    // Assert
    expect(component.deleteComment).toHaveBeenCalled();
    expect(component.result).toContain("Commentaire supprimé avec succes!")

  });


  it('should erreur delete comment', () => {
   
    spyOn(component, 'deleteComment').and.callThrough();
    spyOn(service, 'deleteCommentaire').and
      .returnValue(throwError(() => new Error('Erreur API')));
    // Act
    component.deleteComment();
    // Assert
    expect(component.deleteComment).toHaveBeenCalled();
    expect(component.result).toContain("Une erreur s'est produite veuillez réessayer!")

  });


})