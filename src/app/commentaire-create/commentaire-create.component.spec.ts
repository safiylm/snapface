import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentaireCreateComponent } from './commentaire-create.component';
import { NgIf } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentaireService } from 'src/services/commentaire-service';
import { Commentaire } from 'src/models/commentaire.model';
import { of } from 'rxjs';

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
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CommentaireService);
    component.id = "662eb417c2fd9ad3238d752e"
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
    expect(component.id).toBeDefined() // postId
    expect(component.result).toBeDefined()
    //expect(component.commentaire).toBeDefined()

  })



  it('should create comment', () => {

    // Arrange
    const data = new Commentaire(
      "6697ffa585ac11e40dccc044",
      "Test Com Réussi",
      1721237413177,
      "662eb2a1c2fd9ad3238d7528",
      "662eb417c2fd9ad3238d752e"
    );

    spyOn(component, 'createNewComment')
    component.commentaire = data;

    spyOn(service, 'addNewCommentaire').and
      .returnValue(of(data));

    // Act
    component.createNewComment();

    // Assert
    expect(component.createNewComment).toHaveBeenCalled();
  });



})