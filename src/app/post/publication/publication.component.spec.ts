import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationComponent } from './publication.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { InteractionSocialeService } from 'src/services/interaction-social-service';
import { Publication } from 'src/models/publication.model';

describe('PublicationComponent', () => {

    let component: PublicationComponent;
    let fixture: ComponentFixture<PublicationComponent>;
    let body: HTMLElement;
    let title: HTMLElement;
    let btnEditPost: HTMLElement;

    beforeEach(async () => {

        TestBed.configureTestingModule({
            providers: [
                InteractionSocialeService,
            ],
            imports: [HttpClientModule, RouterTestingModule],
        })

        fixture = TestBed.createComponent(PublicationComponent);

        component = fixture.componentInstance;
        component.publication = new Publication(
      "66f9678d9189a0956c8cfb4c",
      "Beautiful orange cat",
      "Little Kitten Playing His Toy Mouse",
      ["https://images.pexels.com/photos/7143483/pexels-photo-7143483.jpeg"],
      "66e9219abe68cdd15907399e", "",
      1,
      3,
      3,
      3,
      4, null, null,null,// Date("2024-09-28T22:00:00.000Z") as Date ,
      null)
        fixture.detectChanges();
        body = fixture.nativeElement.querySelector('#body')
        title = fixture.nativeElement.querySelector('h2')
        btnEditPost = fixture.nativeElement.querySelector('#btn-edit-post')
    });


    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.publication).toBeDefined()
        expect(component.isMyPost).toBeDefined()
    });


    it("should display", ()=>{
        expect(body.textContent?.toLowerCase()).toContain(component.Body?.toLowerCase())
        expect(title.textContent?.toLowerCase()).toContain(component.Title?.toLowerCase())
    })



})


