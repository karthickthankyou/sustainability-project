import 'package:flutter/material.dart';
import 'package:flutter_app/transactions.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'design/color.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    final HttpLink httpLink = HttpLink(
      'http://localhost:3000/graphql',
    );

    ValueNotifier<GraphQLClient> client = ValueNotifier(
      GraphQLClient(
        cache: GraphQLCache(),
        link: httpLink,
      ),
    );

    return GraphQLProvider(
      client: client,
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: AppColors.primaryPalette,
        ),
        home: const Transactions(title: 'Sustainability project'),
      ),
    );
  }
}
