import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationListComponent } from './publication-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PublicationListeComponent', () => {
  
  let component: PublicationListComponent;
  let fixture: ComponentFixture<PublicationListComponent>;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    }).compileComponents()


    fixture = TestBed.createComponent(PublicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
   // expect(component.publications).toBeDefined()
  });


})