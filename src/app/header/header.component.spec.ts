import {TestBed} from '@angular/core/testing';
import { HeaderComponent } from './header.component';


describe('MonComposantComponent', () => {
    let component: HeaderComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [ HeaderComponent ]
        })
        .compileComponents();
      });
    
    beforeEach(() => {
      const fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
      });

})