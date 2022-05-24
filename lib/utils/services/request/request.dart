import 'package:http/http.dart' as http;
import 'dart:convert' as convert;

Future<http.Response> get(String url, Map<String, String> header, String endpoint) async {
  return await http.get(
      Uri.parse("${url}/${endpoint}"),
      headers: header
  );
}

Future<http.Response> post(String url, Map<String, String> header, Map<String, String> body, String endpoint) async {
  return await http.post(
    Uri.parse("${url}/${endpoint}"),
    headers: header,
    body: convert.jsonEncode(body)
  );
}

Future<http.Response> put(String url, Map<String, String> header, Map<String, String> body, String endpoint, int id) async {
  return await http.put(
      Uri.parse("${url}/${endpoint}/${id}"),
      headers: header,
      body: convert.jsonEncode(body)
  );
}

Future<http.Response> delete(String url, Map<String, String> header, String endpoint, int id) async {
  return await http.put(
      Uri.parse("${url}/${endpoint}/${id}"),
      headers: header
  );
}

// Future<http.Response> login(String username, String password) {
//   return http.post(
//     Uri.parse("${url}/login"),
//     headers: <String, String>{
//       'Content-Type': 'application/json; charset=UTF-8',
//     },
//     body: convert.jsonEncode(<String, String>{
//       'username': username,
//       'password': password
//     }),
//   );
// }
//
// Future<http.Response> register(String email, String username, String password) {
//   return http.post(
//     Uri.parse("${url}/register"),
//     headers: <String, String>{
//       'Content-Type': 'application/json; charset=UTF-8',
//     },
//     body: convert.jsonEncode(<String, String>{
//       'username': username,
//       'password': password,
//       'email': password
//     }),
//   );
// }