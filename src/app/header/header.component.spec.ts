import {ComponentFixture, TestBed} from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture : ComponentFixture<HeaderComponent>;
    
    beforeEach( () => {
      TestBed.configureTestingModule({
      }).compileComponents()
             
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('test render', ()=>{
     
     const compiled = fixture.nativeElement as HTMLElement;
     const items = compiled.querySelectorAll('a');
     expect(items.length).toBe(2);
     expect(items[0].textContent).toBe('Snapface');
     expect(items[1].textContent).toBe('Connexion');
  
    })

})