import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from 'src/services/user-service';
import { User } from 'src/models/user.model';

describe('User in List', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let httpTestingController: HttpTestingController;
  let photo!: HTMLElement;
  let p_username!: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        UserService,
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents()


    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.user = new User("66e9219abe68cdd15907399e", "Cat", "Dog", "catdog@gmail.com",
      "$2a$10$.y29U/K4Z9FG/FTLtylWvO5P05ufLVQt/uG/YK2bXWStughUmwX3C", 123,
      "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg")

    fixture.detectChanges();// Déclenche la détection des modifications initiales
    httpTestingController = TestBed.inject(HttpTestingController);

    p_username = fixture.nativeElement.querySelector('#username');
    photo = fixture.nativeElement.querySelector('#photos-profil');

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display username', () => {
    expect(p_username.textContent).toContain("");
  });

  it('should display photo', () => {
    expect(photo.getAttribute("src")).toContain(component.user.photos_profil);
  })


})