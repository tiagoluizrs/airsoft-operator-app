import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Http, HttpResponse } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService{

  constructor(
    private storageService: StorageService
  ) { }

  async post(url: string, headers: any, data: any) {
    headers = await this.setTokenHeader(url, headers);

    try {
      const response: HttpResponse = await Http.post({
        url,
        headers,
        data
      });
      return response;
    } catch (error) {
      console.log(`[[HttpService | post]] >> Um erro ocorreu durante este post. Descrição do erro: ${JSON.stringify(error)}`);
      return null;
    }
  }

  async put(url: string, headers: any, data: any) {
    headers = await this.setTokenHeader(url, headers);

    try {
      const response: HttpResponse = await Http.put({
        url,
        headers,
        data
      });
      return response;
    } catch (error) {
      console.log(`[[HttpService | post]] >> Um erro ocorreu durante este post. Descrição do erro: ${JSON.stringify(error)}`);
      return null;
    }
  }

  async get(url: string, headers: any, params: any) {
    headers = await this.setTokenHeader(url, headers);

    try {
      const response: HttpResponse = await Http.get({
        url,
        headers,
        params,
      });
      return response;
    } catch (error) {
      console.log(`[[HttpService | post]] >> Um erro ocorreu durante este post. Descrição do erro: ${JSON.stringify(error)}`);
      return null;
    }
  }

  async setTokenHeader(url, headers) {
    headers['Content-Type'] = 'application/json';

    // if (url.indexOf('auth') === -1) {
    //   const auth = await this.storageService.get('auth');

    //   const token = auth.token;
    //   headers.Authorization = `Bearer ${token}`;
    // }

    return headers;
  }
}
