import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtAlbumComponent } from './art-album.component';

describe('ArtAlbumComponent', () => {
  let component: ArtAlbumComponent;
  let fixture: ComponentFixture<ArtAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtAlbumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
