import '../request/request.dart';
import '../../../constants/api_path.dart';
import '../../../utils/services/storage/storage.dart';

class Auth{
  login(String userEmail, String password) async {
    return await post(url, <String, String> {
    'Content-Type': 'application/json',
    'Access-Control_Allow_Origin': '*'
    }, <String, String> {
      'userEmail': userEmail,
      'password': password
    }, 'login');
  }

  saveAuth(Map<String, dynamic> data){
    saveStorage("user", data);
  }

  getAuth() async{
    return await getStorage("user");
  }

  logout() async{
    return await getStorage("user");
  }

  isLoggedIn() async{
    return await getStorage("user");
  }
}