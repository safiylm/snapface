import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationEditComponent } from './publication-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';
import { Publication } from 'src/models/publication.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PublicationsService } from 'src/services/publication-service';
import { of } from 'rxjs';

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


  it('should call the inscription to create new user', () => {

    // Arrange
    const data = new Publication(
      "66f9678d9189a0956c8cfb4c",
      "Beautiful orange cat",
      "Beautiful orange cat...................",
      ["https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
      895, "66e9219abe68cdd15907399e"
    )
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

    let mockData = new Publication("66f9678d9189a0956c8cfb4c", "Beautiful orange cat",
      "Beautiful orange cat...................",
      ["https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
      Date.UTC(2024, 9, 24, 22, 0, 0, 0),
      "66e9219abe68cdd15907399e");
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

})