import 'package:airsoft_operator/core/home/home.dart';
import 'package:airsoft_operator/core/profile/profile.dart';
import 'package:airsoft_operator/core/auth/login/login.dart';
import 'package:airsoft_operator/utils/services/auth/auth.dart';
import 'package:flutter/material.dart';

Auth auth = Auth();

class Tabs extends StatelessWidget {
  const Tabs({Key? key}) : super(key: key);

  static const String _title = 'Flutter Code Sample';

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: _title,
      home: MyStatelessWidget(),
    );
  }
}

const List<Tab> tabs = <Tab>[
  Tab(text: 'Home'),
  Tab(text: 'Profile')
];

class MyStatelessWidget extends StatelessWidget {
  const MyStatelessWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: tabs.length,
      // The Builder widget is used to have a different BuildContext to access
      // closest DefaultTabController.
      child: Builder(builder: (BuildContext context) {
        final TabController tabController = DefaultTabController.of(context)!;
        tabController.addListener(() {
          if (!tabController.indexIsChanging) {
            // Your code goes here.
            // To get index of current tab use tabController.index
          }
        });
        return Scaffold(
          appBar: AppBar(
            centerTitle: false,
            title: Text("Meu operador"),
            bottom: TabBar(
              tabs: tabs,
            ),
            backgroundColor: Colors.lightGreen,
            actions: <Widget>[
              IconButton(icon: Icon(Icons.exit_to_app), onPressed: () {
                auth.logout();
                Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (_) => LoginPage()), (Route<dynamic> route) => false);
              }),
            ],
          ),
          body: TabBarView(
            children: <Widget>[
                HomePage(),
                ProfilePage()
              ]
          ),
        );
      }),
    );
  }
}