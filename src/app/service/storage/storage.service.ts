import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private nativeStorage: NativeStorage
  ) { }

  getNormal(key): any {
    return this.nativeStorage.getItem(key).then(data => data).catch(err => err);
  }

  async save(key, data) {
    await this.nativeStorage.setItem(key, data);
    console.log('Storage saved!');
  }

  async get(key) {
    try{
      return await this.nativeStorage.getItem(key);
    }catch(err){
      return err;
    }
  }
  async clear() {
    return await this.nativeStorage.clear();
  }
}
