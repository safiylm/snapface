import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderSnapComponent } from './header-snap.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from 'src/services/user-service';
import { User } from 'src/models/user.model';

/*
describe('Header Snap Component', () => {
  let component: HeaderSnapComponent;
  let fixture: ComponentFixture<HeaderSnapComponent>;
  let httpTestingController: HttpTestingController;
  let p_username: HTMLElement;
  let photoBackGround: HTMLElement;
  let photoProfil: HTMLElement;
  let photoBackGroundViewer: HTMLElement;
  let photoProfilViewer: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        UserService,
      ],
      imports: [HttpClientTestingModule, RouterTestingModule, NgIf],
    }).compileComponents()


    fixture = TestBed.createComponent(HeaderSnapComponent);
    component = fixture.componentInstance;
    component.id = "66e9219abe68cdd15907399e";
      component.user = new User("66e9219abe68cdd15907399e", "Cat", "Dog", "catdog@gmail.com",
      "$2a$10$.y29U/K4Z9FG/FTLtylWvO5P05ufLVQt/uG/YK2bXWStughUmwX3C", 123,
      "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg", false, false, null);

      fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);

    p_username = fixture.nativeElement.querySelector('.name');
    photoBackGround = fixture.nativeElement.querySelector('#photo-background')
    photoProfil = fixture.nativeElement.querySelector('#photo-profil')
    photoBackGroundViewer = fixture.nativeElement.querySelector('#imgpb')
    photoProfilViewer = fixture.nativeElement.querySelector('#imgpp')

  });


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should open & close photo of profil', () => {
    spyOn(component, 'showPhotoViewerProfil');
    spyOn(component, 'hidePhotoViewerProfil');

    expect(component.isDisplayPhotoViewerProfil).toBeFalse();

    component.showPhotoViewerProfil();
    expect(component.showPhotoViewerProfil).toHaveBeenCalled();
//    expect(component.isDisplayPhotoViewerProfil).toBeTrue();

    component.hidePhotoViewerProfil();
    expect(component.hidePhotoViewerProfil).toHaveBeenCalled();
    expect(component.isDisplayPhotoViewerProfil).toBeFalse();
  });


  it('should open & close photo of background', () => {
    spyOn(component, 'showPhotoViewerBackground');
    spyOn(component, 'hidePhotoViewerBackground');

    expect(component.isDisplayPhotoViewerBackground).toBeFalse();

    component.showPhotoViewerBackground();
    expect(component.showPhotoViewerBackground).toHaveBeenCalled();
  //  expect(component.isDisplayPhotoViewerBackground).toBeTrue();

    component.hidePhotoViewerBackground();
    expect(component.hidePhotoViewerBackground).toHaveBeenCalled();
    expect(component.isDisplayPhotoViewerBackground).toBeFalse();
  });


  it("should display ", ()=>{
    component.isDisplayPhotoViewerBackground= true;
    component.isDisplayPhotoViewerProfil = true;
    expect(component.UserName?.trim()).toEqual(p_username.textContent?.trim())
    expect(component.UserPhotoBackground).toEqual(photoBackGround.getAttribute("src"))
    expect(component.UserPhotoProfil).toEqual(photoProfil.getAttribute("src"))
    expect(component.UserPhotoBackground).toEqual("https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg")
    expect(component.UserPhotoProfil).toEqual("https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")
  })

})*/