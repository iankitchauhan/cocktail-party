import { TestBed } from '@angular/core/testing';

import { CocktailService } from './cocktail.service';

describe('CocktailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CocktailService = TestBed.get(CocktailService);
    expect(service).toBeTruthy();
  });
});
