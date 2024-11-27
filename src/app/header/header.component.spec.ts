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
    });

    it('should create', () => {
      expect(component).toBeDefined();
    });

})