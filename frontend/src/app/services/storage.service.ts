import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  key: string = "40100";

  constructor() {
  }

  public stringEscape(str: string): string {
    let regex: RegExp = /\"\'/gi;
    return str.replace(regex, "\\'");
  }

  public saveData(key: string, value: string): void {
    localStorage.setItem(key, this.encrypt(value));
  }

  public getData(key: string) {
    let data = localStorage.getItem(key) || "";
    return this.decrypt(data);
  }

  public removeData(key: string): void {
    localStorage.removeItem(key);
  }

  public clearData(): void {
    localStorage.clear();
  }

  public getLength(): number {
    return localStorage.length;
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}