import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderSnapComponent } from './header-snap.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from 'src/services/user-service';

describe('Header Snap Component', () => {
  let component: HeaderSnapComponent;
  let fixture: ComponentFixture<HeaderSnapComponent>;
  let httpTestingController: HttpTestingController;
  let p_username: HTMLElement;

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
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);

    p_username = fixture.nativeElement.querySelector('.name');

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

})