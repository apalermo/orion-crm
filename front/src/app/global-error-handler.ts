import { ErrorHandler, inject, Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from './config';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private injector = inject(Injector);

  handleError(error: any): void {
    const http = this.injector.get(HttpClient);

    const logData = {
      message: error.message || 'Erreur front-end inattendue',
      stack: error.stack,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };

    http.post(`${API_BASE_URL}/api/logs/frontend`, logData).subscribe({
      error: (e) => console.error('Échec de l’envoi du log de télémétrie', e),
    });

    console.error('FRONTEND ERROR INTERCEPTED:', error);
  }
}
