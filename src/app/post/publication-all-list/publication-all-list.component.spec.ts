import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationAllListComponent } from './publication-all-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Publication All Liste Component', () => {
  
  let component: PublicationAllListComponent;
  let fixture: ComponentFixture<PublicationAllListComponent>;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents()

    fixture = TestBed.createComponent(PublicationAllListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

})