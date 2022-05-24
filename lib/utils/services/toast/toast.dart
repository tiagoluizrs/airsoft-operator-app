import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class ToastService{
  Map <String, dynamic> toastLength = {
    "short": Toast.LENGTH_SHORT,
    "long": Toast.LENGTH_LONG
  };
  Map <String, dynamic> toastGravity = {
    "top": ToastGravity.TOP,
    "center": ToastGravity.CENTER,
    "bottom": ToastGravity.BOTTOM
  };

  toast(String msg, String toastLength, String toastGravity, {String webPosition = "center"}) {
    Fluttertoast.showToast(
        msg: msg,
        toastLength: this.toastLength[toastLength],
        gravity: this.toastGravity[toastGravity],
        timeInSecForIosWeb: 1,
        backgroundColor: Colors.black,
        textColor: Colors.white,
        fontSize: 16.0,
        webBgColor: "#333",
        webPosition: webPosition
    );
  }
}