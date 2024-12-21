import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationComponent } from './publication.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('PublicationComponent', () => {
    
    let component: PublicationComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterTestingModule],
        })
        let fixture: ComponentFixture<PublicationComponent>;

        fixture = TestBed.createComponent(PublicationComponent);
        component = fixture.componentInstance; fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

})