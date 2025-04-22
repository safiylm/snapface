import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEmailComponent } from './edit-email.component';
import { NgIf } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user-service';
import { of, throwError } from 'rxjs';

describe('Edit email', () => {
  let component: EditEmailComponent;
  let fixture: ComponentFixture<EditEmailComponent>;
  let httpTestingController: HttpTestingController;
  let service: UserService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [NgIf, HttpClientTestingModule],

    }).compileComponents()

    fixture = TestBed.createComponent(EditEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
    window.localStorage.setItem("userId", "662eb2a1c2fd9ad3238d7528")

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should edit email with success', () => {

    component.email = "test.martin@gmail.com";
    spyOn(component, 'editEmail').and.callThrough();

    spyOn(service, 'editEmail').and
      .returnValue(of(new User("", "", "",component.email,"",0,"","")));
    // Act
    component.editEmail();
    // Assert
    expect(component.editEmail).toHaveBeenCalled();
    expect(component.resultat).toContain("Email modifier avec succes")

  });

  it("Should edit email with error", ()=>{
    spyOn(component, "editEmail").and.callThrough()
    spyOn(service, "editEmail").and.returnValue(throwError(()=>new Error('Error edit email')));
    component.editEmail();
    expect(component.editEmail).toHaveBeenCalled()
    expect(component.resultat).toContain("Erreur, réessayser")
  })


})