import 'package:localstorage/localstorage.dart';
import 'dart:convert' as convert;

saveStorage(String key, Map<String, dynamic> data){
  final LocalStorage storage = new LocalStorage('localstorage_app');
  storage.setItem(key, convert.jsonEncode(data));
}

getStorage(String key) async{
  try{
    final LocalStorage storage = new LocalStorage('localstorage_app');
    Map<String, dynamic> data = convert.jsonDecode(await storage.getItem(key));
    return data;
  }catch(err){
    return null;
  }
}

clearStorage(String key) async {
  final LocalStorage storage = LocalStorage('localstorage_app');
  await storage.clear();
}