import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoutonComponent } from './add-bouton.component';

describe('AddBoutonComponent', () => {
  let component: AddBoutonComponent;
  let fixture: ComponentFixture<AddBoutonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBoutonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoutonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
