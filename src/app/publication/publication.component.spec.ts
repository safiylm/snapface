import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationComponent } from './publication.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { InteractionSocialeService } from 'src/services/interaction-social-service';
import { Publication } from 'src/models/publication.model';

describe('PublicationComponent', () => {

    let component: PublicationComponent;
    let fixture: ComponentFixture<PublicationComponent>;
    beforeEach(async () => {

        TestBed.configureTestingModule({
            providers: [
                InteractionSocialeService,
            ],
            imports: [HttpClientModule, RouterTestingModule],
        })

        fixture = TestBed.createComponent(PublicationComponent);

        component = fixture.componentInstance;
        component.publication = new Publication("66f9678d9189a0956c8cfb4c",
            "Beautiful orange cat",
            "Beautiful orange cat...................",
            ["https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
            555, "66e9219abe68cdd15907399e"
        )
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

})