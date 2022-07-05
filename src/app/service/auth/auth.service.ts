import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RequestService } from '../request/request.service';
import { environment } from '../../../environments/environment';
import { ToastService } from '../toast/toast.service';
import { PreloaderService } from '../preloader/preloader.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private navCtrl: NavController,
    private requestService: RequestService,
    private toastService: ToastService,
    private preloaderService: PreloaderService,
    private storageService: StorageService,
  ) { }

  async isLoggedIn() {
    // this.navCtrl.navigateRoot('tabs/tab1');
    // return;
    try{
      const verify = await this.getAuth();
      if(verify.id === undefined){
        this.navCtrl.navigateRoot('login');
      }else{
        this.navCtrl.navigateRoot('tabs/tab1');
      }
    }catch(err){
      console.log(`[[isLoggedIn]] >> Erro ${err}`);
      this.storageService.clear();
      this.navCtrl.navigateRoot('login');
    };
  }

  async login(data){
    const preloader = this.preloaderService.preloading('Verificando dados.');
    // const response = await this.requestService.post(`${environment.url}/api/token/`, {}, data);

    try{
      // if (response.status === 200) {
        const id = 1;
        const user = await this.requestService.get(`${environment.url}/api/profile/${id}`, {
        }, {});
        const d = {
          ...user.data,
          // ...response.data
        };
        this.saveAuth(d);

        this.navCtrl.navigateRoot('tabs');
        this.toastService.presentToast(`Seja bem-vindo ${data.username}`);
      // } else {
      //   this.toastService.presentToast('Dados de usuário incorretos.');
      // }
    }catch(err){
      this.toastService.presentToast('Um erro ocorreu. Contate o administrador.');
    }

    (await preloader).dismiss();
  }

  async register(data) {
    const preloader = this.preloaderService.preloading('Registrando usuário.');
    const response = await this.requestService.post(`${environment.url}/user`, {}, data);

    try {
      if (response.status === 201) {
        this.toastService.presentToast(`Usuário registrado com sucesso. Confirme seu e-mail para fazer login.`);
      } else {
        this.toastService.presentToast('Não foi possível criar este usuário, tente novamente.');
      }
    } catch (err) {
      this.toastService.presentToast('Um erro ocorreu. Contate o administrador.');
    }

    (await preloader).dismiss();
  }

  async saveAuth(data){
    await this.storageService.save('auth', data);
  }

  async getAuth() {
    return await this.storageService.get('auth');
  }

  logout(){
    this.storageService.clear();
    this.navCtrl.navigateRoot('login');
    this.toastService.presentToast('Deslogado com sucesso!');
  }
}
