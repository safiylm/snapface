import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentaireComponent } from './commentaire.component';
import { NgIf } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentaireService } from 'src/services/commentaire-service';

describe('CommentaireComponent', () => {
  let component: CommentaireComponent;
  let fixture: ComponentFixture<CommentaireComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
       providers: [
              CommentaireService,
            ],
      imports: [ NgIf, HttpClientTestingModule],
      
    }).compileComponents()

    fixture = TestBed.createComponent(CommentaireComponent);
    component = fixture.componentInstance; 
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


})