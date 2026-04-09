import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { GlobalErrorHandler } from './global-error-handler';
import { of } from 'rxjs';
import { API_BASE_URL } from './config';

describe('GlobalErrorHandler', () => {
  let handler: GlobalErrorHandler;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    httpClientSpy.post.and.returnValue(of({}));

    TestBed.configureTestingModule({
      providers: [
        GlobalErrorHandler,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });

    handler = TestBed.inject(GlobalErrorHandler);

    spyOn(console, 'error');
  });

  it('should be correctly instancied', () => {
    expect(handler).toBeTruthy();
  });

  it('should intercep error, format and send to backend', () => {
    // 1. Préparation (Arrange)
    const mockError = new Error('unit test error');

    // 2. Action (Act)
    handler.handleError(mockError);

    // 3. Vérification (Assert)
    // Vérifie que le POST a bien été appelé 1 fois
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);

    // Récupération des arguments passés lors de l'appel HTTP
    const httpArgs = httpClientSpy.post.calls.first().args;

    // Vérifie l'URL appelée
    expect(httpArgs[0]).toBe(`${API_BASE_URL}/api/logs/frontend`);

    // Vérifie le contenu du payload (le JSON envoyé)
    expect(httpArgs[1].message).toBe('unit test error');
    expect(httpArgs[1].url).toBeDefined();

    // Vérifie que le log local a bien été conservé
    expect(console.error).toHaveBeenCalledWith(
      'FRONTEND ERROR INTERCEPTED:',
      mockError,
    );
  });
});
