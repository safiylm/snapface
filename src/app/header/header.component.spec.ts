import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    }).compileComponents()
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('test render when user is not connected', () => {
    component.isLoggedIn = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('a');
    expect(items.length).toBe(4);
    expect(items[0].textContent).toBe('Snapface');
    expect(items[1].textContent).toBe('Accueil');
    expect(items[2].textContent).toBe('Chercher');
    expect(items[3].textContent).toBe('Connexion');

  })


  it('test render when user is connected', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('a');
    expect(items.length).toBe(5);
    expect(items[0].textContent).toBe('Snapface');
    expect(items[1].textContent).toBe('Accueil');
    expect(items[2].textContent).toBe('Chercher');

  })

})