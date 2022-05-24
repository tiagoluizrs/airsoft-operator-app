import 'package:flutter/material.dart';
import 'core/auth/login/login.dart';
import 'core/home/home.dart';
import 'core/tabs/tabs.dart';
import '../../../utils/services/auth/auth.dart';

Auth auth = Auth();

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    dynamic isLoggedIn = auth.isLoggedIn();
    // if(isLoggedIn != null){
    //   return MaterialApp(
    //       theme: ThemeData(
    //         primarySwatch: Colors.lightGreen,
    //       ),
    //       home: HomePage(title: "Home")
    //   );
    // }else{
      return MaterialApp(
          theme: ThemeData(
            primarySwatch: Colors.lightGreen,
          ),
          home: Tabs()
          // home: LoginPage()
      );
    // }
  }
}
