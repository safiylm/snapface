import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationEditComponent } from './publication-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';
import { Publication } from 'src/models/publication.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PublicationsService } from 'src/services/publication-service';
import { of } from 'rxjs';
/*
describe('Publication Edit Component', () => {
  let component: PublicationEditComponent;
  let fixture: ComponentFixture<PublicationEditComponent>;
  let httpTestingController: HttpTestingController;
  let service: PublicationsService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgIf],
    }).compileComponents()

    fixture = TestBed.createComponent(PublicationEditComponent);
    service = TestBed.inject(PublicationsService);
    component = fixture.componentInstance;
    component.id = "66f9678d9189a0956c8cfb4c";
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should edit post', () => {

    // Arrange
    const data = new Publication(
      "66f9678d9189a0956c8cfb4c",
      "Beautiful orange cat",
      "Little Kitten Playing His Toy Mouse",
      ["https://images.pexels.com/photos/7143483/pexels-photo-7143483.jpeg"],
      "66e9219abe68cdd15907399e", "",
      1,
      3,
      3,
      3,
      4, null, null,null,// Date("2024-09-28T22:00:00.000Z") as Date ,
      null)
    spyOn(component, 'onSubmit')
    component.post = data;

    spyOn(service, 'editPost').and
      .returnValue(of(data));

    // Act
    component.onSubmit();

    // Assert
    expect(component.onSubmit).toHaveBeenCalled();

  });



  it('should load data from the API', () => {

    let mockData = new Publication(
      "66f9678d9189a0956c8cfb4c",
      "Beautiful orange cat",
      "Little Kitten Playing His Toy Mouse",
      ["https://images.pexels.com/photos/7143483/pexels-photo-7143483.jpeg"],
      "66e9219abe68cdd15907399e", "",
      1,
      3,
      3,
      3,
      4, null, null,null,// Date("2024-09-28T22:00:00.000Z") as Date ,
      null)
    component.id = "66f9678d9189a0956c8cfb4c";
    component.getDataPost();
    fixture.detectChanges(); // Déclenche ngOnInit

    // Simuler une requête HTTP
    const req = httpTestingController.expectOne
      ('https://snapface.onrender.com/api/publicationid?id=66f9678d9189a0956c8cfb4c');
    expect(req.request.method).toBe('GET'); // Vérifie le type de requête
    req.flush(mockData); // Envoie une réponse simulée

    // Vérifie que les données sont assignées correctement
    expect(component.post).toEqual(mockData);

  });

})*/