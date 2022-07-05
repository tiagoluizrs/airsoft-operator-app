import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { ToastService } from '../toast/toast.service';
import { PreloaderService } from '../preloader/preloader.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private toastService: ToastService,
    private preloaderService: PreloaderService
  ) { }

  async updateUser(id, data) {
    const preloader = this.preloaderService.preloading("Atualizando dados.");

    try{
      const response = await this.requestService.put(`${environment.url}/user/${id}`, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, data);

      if (response.status === 200) {
        const result = JSON.parse(await response.data);
        if (result.hasOwnProperty('msg')){
          this.toastService.presentToast(result.msg);
        }else{
          this.authService.saveAuth(result);
          this.toastService.presentToast(`Dados atualizados com sucesso.`);
        }
      } else {
        this.toastService.presentToast('Erro ao atualizar dados.');
      }
    }catch(err){
      console.log(err)
    }

    (await preloader).dismiss()
  }
}
