import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let store: { [key: string]: string } = {};

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => store[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => store[key] = value);
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => delete store[key]);
    spyOn(localStorage, 'clear').and.callFake(() => store = {});
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        { provide: PLATFORM_ID, useValue: 'browser'}
      ]
    });
    service = TestBed.inject(LocalStorageService);
  });

  afterEach(() => {
    store = {};
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set an item in localStorage', () => {
    service.setItem('testKey', 'testValue');
    expect(localStorage.setItem).toHaveBeenCalledWith('testKey', 'testValue');
    expect(service.getItem('testKey')).toBe('testValue');
  });

  it('should get an item from localStorage', () => {
    localStorage.setItem('anotherKey', 'anotherValue');
    expect(service.getItem('anotherKey')).toBe('anotherValue');
  });

  it('should return null if item does not exist', () => {
    expect(service.getItem('nonExistentKey')).toBeNull();
  });

  it('should remove an item from localStorage', () => {
    service.setItem('itemToRemove', 'value');
    service.removeItem('itemToRemove');
    expect(localStorage.removeItem).toHaveBeenCalledWith('itemToRemove');
    expect(service.getItem('itemToRemove')).toBeNull();
  });

  it('should clear localStorage', () => {
    service.setItem('key1', 'value1');
    service.setItem('key2', 'value2');
    service.clear();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(service.getItem('key1')).toBeNull();
    expect(service.getItem('key2')).toBeNull();
  });

});
