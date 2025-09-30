import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationCreateComponent } from './publication-create.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { PublicationsService } from 'src/services/publication-service';
import { Publication } from 'src/models/publication.model';
import { of } from 'rxjs';

describe('Publication create Component', () => {
  let component: PublicationCreateComponent;
  let service: PublicationsService;
  let fixture: ComponentFixture<PublicationCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
    }).compileComponents()

    service = TestBed.inject(PublicationsService);
    fixture = TestBed.createComponent(PublicationCreateComponent);
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.post).toBeDefined();
    //  expect(component.array_image).toBeDefined();
    //  expect(component.newimage).toBeDefined();
    expect(component.result).toBeDefined();

  });


  it('should create new post', () => {

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

    spyOn(service, 'createNewPublication').and
      .returnValue(of(data));

    // Act
    component.onSubmit();

    // Assert
    expect(component.onSubmit).toHaveBeenCalled();
  });


})