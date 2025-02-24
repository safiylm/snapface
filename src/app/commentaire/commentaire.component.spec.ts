import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentaireComponent } from './commentaire.component';
import { NgIf } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentaireService } from 'src/services/commentaire-service';
import { Commentaire } from 'src/models/commentaire.model';
import { of } from 'rxjs';

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
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CommentaireService);
    component.commentaire = new Commentaire(
      "6697ffa585ac11e40dccc044",
      "La mer est un espace de rigueur et de liberté. Victor Hugo",
      1721237413177,
      "662eb2a1c2fd9ad3238d7528",
      "662eb417c2fd9ad3238d752e"
    );

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('init ', () => {
    expect(component.isMyComment).toBeDefined()
    expect(component.isDisplayingForm).toBeDefined()
  })


  it('open & close form editting comment  ', () => {

    expect(component.isDisplayingForm).toEqual(false)
    spyOn(component, 'showFormEditComment')
    component.showFormEditComment();
    expect(component.showFormEditComment).toHaveBeenCalled()
    // expect(component.isDisplayingForm).toEqual(true)
  })


  it('should edit comment', () => {

    // Arrange
    const data = new Commentaire(
      "6697ffa585ac11e40dccc044",
      "La mer est un espace de rigueur et de liberté. Victor Hugo",
      1721237413177,
      "662eb2a1c2fd9ad3238d7528",
      "662eb417c2fd9ad3238d752e"
    );

    spyOn(component, 'editComment')
    component.commentaire = data;

    spyOn(service, 'updateCommentaire').and
      .returnValue(of(data));

    // Act
    component.editComment();

    // Assert
    expect(component.editComment).toHaveBeenCalled();
  });


  it('should delete comment', () => {

    // Arrange
    const data = new Commentaire(
      "6697ffa585ac11e40dccc044",
      "La mer est un espace de rigueur et de liberté. Victor Hugo",
      1721237413177,
      "662eb2a1c2fd9ad3238d7528",
      "662eb417c2fd9ad3238d752e"
    );

    spyOn(component, 'deleteComment')
    component.commentaire = data;

    spyOn(service, 'deleteCommentaire').and
      .returnValue(of(data));

    // Act
    component.deleteComment();

    // Assert
    expect(component.deleteComment).toHaveBeenCalled();
  });

})