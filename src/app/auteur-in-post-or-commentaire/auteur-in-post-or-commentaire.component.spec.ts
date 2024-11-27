import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AuteurInPostOrCommentaireComponent } from './auteur-in-post-or-commentaire.component';
import { UserService } from 'src/services/user-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AuteurInPostOrCommentaireComponent', () => {
    let component: AuteurInPostOrCommentaireComponent;
    let fixture : ComponentFixture<AuteurInPostOrCommentaireComponent>;
    
    beforeEach( () => {
      TestBed.configureTestingModule({
        providers:[UserService],
        imports: [HttpClientTestingModule],
      }).compileComponents()
             
      fixture = TestBed.createComponent(AuteurInPostOrCommentaireComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      expect(component).toBeDefined();
    });

})