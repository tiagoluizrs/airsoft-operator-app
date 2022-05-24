import 'package:flutter/material.dart';
import 'dart:convert' as convert;
import 'package:http/http.dart' as http;

import '../../tabs/tabs.dart';
import '../../../utils/services/auth/auth.dart';
import '../../../utils/services/toast/toast.dart';

Auth auth = Auth();
ToastService toast = ToastService();

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {

  final userEmailController = TextEditingController();
  final passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    super.dispose();
    userEmailController.dispose();
    passwordController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.only(top: 60.0),
                child: Center(
                  child: Container(
                      margin: const EdgeInsets.only(top: 60),
                      width: 200,
                      height: 150,
                      child: Image.asset('assets/images/logo.jpeg')),
                ),
              ),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 15, vertical: 10),
                child: TextFormField(
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Campo obrigatório.';
                    }
                    return null;
                  },
                  controller: userEmailController,
                  style: TextStyle(color: Colors.lightGreen),
                  decoration: InputDecoration(
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.lightGreen),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.lightGreen),
                      ),
                      errorBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.redAccent),
                      ),
                      focusedErrorBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.lightGreen),
                      ),
                      disabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.grey),
                      ),
                      border: OutlineInputBorder(),
                      labelStyle: TextStyle(
                        color: Colors.lightGreen,
                      ),
                      labelText: 'E-mail ou Usuário'
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 15, vertical: 10),
                child: TextFormField(
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Campo obrigatório.';
                    }
                    return null;
                  },
                  controller: passwordController,
                  style: TextStyle(color: Colors.lightGreen),
                  obscureText: true,
                  decoration: InputDecoration(
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.lightGreen),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.lightGreen),
                      ),
                      errorBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.redAccent),
                      ),
                      focusedErrorBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.lightGreen),
                      ),
                      disabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.grey),
                      ),
                      border: OutlineInputBorder(),
                      labelStyle: TextStyle(
                        color: Colors.lightGreen,
                      ),
                      labelText: 'Senha'
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 15, vertical: 10),
                child: Container(
                  height: 50,
                  constraints: const BoxConstraints(minWidth: double.infinity),
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(5),
                      color: Colors.lightGreen),
                  child: FlatButton(
                    onPressed: () async {
                      if (_formKey.currentState!.validate()) {
                        http.Response response = await auth.login(userEmailController.text, passwordController.text);
                        dynamic data = convert.jsonDecode(response.body);
                        if (response.statusCode == 200) {
                          auth.saveAuth(data);
                          Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (_) => Tabs()), (Route<dynamic> route) => false);
                        } else {
                          toast.toast(data["message"], "long", "bottom");
                        }
                      }
                    },
                    child: Text(
                      'Login',
                      style: TextStyle(color: Colors.white, fontSize: 16),
                    ),
                  ),
                ),
              ),
              SizedBox(
                height: 130,
              ),
              Text('New User? Create Account')
            ],
          ),
        ),
      ),
    );
  }
}