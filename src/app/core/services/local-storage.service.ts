import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getItem(key: string): string | null {
    if (this.isBrowser) {
      try {
        return localStorage.getItem(key);
      }
      catch (e) {
        console.error(`LocalStorageService: Error getting item "${key}"`, e);
        return null;
      }
    }
    return null;
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      try {
        localStorage.setItem(key, value);
      }
      catch (e) {
        console.error(`LocalStorageService: Error adding item "${key}"`, e);
      }
    }
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      try {
        localStorage.removeItem(key);
      }
      catch (e) {
        console.error(`LocalStorageService: Error removing item "${key}"`, e);
      }
    }
  }

  clear(): void {
    if (this.isBrowser) {
      try {
        localStorage.clear();
      }
      catch (e) {
        console.error('LocalStorageService: Error clearing localStorage', e);
      }
    }
  }
}
