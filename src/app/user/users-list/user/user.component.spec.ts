import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { User } from 'src/models/user.model';

describe('User', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let photo!: HTMLElement;
  let p_username!: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    }).compileComponents()


    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.user = new User("66e9219abe68cdd15907399e", "Cat", "Dog", "catdog@gmail.com",
      "$2a$10$.y29U/K4Z9FG/FTLtylWvO5P05ufLVQt/uG/YK2bXWStughUmwX3C", 123,
      "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg")

    fixture.detectChanges();// Déclenche la détection des modifications initiales

    p_username = fixture.nativeElement.querySelector('#username');
    photo = fixture.nativeElement.querySelector('#photos-profil');

  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.user).toBeDefined();
  });

  it('should display ', () => {
    expect(p_username.textContent).toContain("");
    expect(photo.getAttribute("src")).toContain(component.user.photos_profil);
  })


})