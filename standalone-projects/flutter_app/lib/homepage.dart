import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import './page1.dart';
import './page2.dart';
import './productlist.dart';
import './transactions.dart';

class MyHomePage extends StatelessWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  Widget build(BuildContext context) {
    const String manufacturers = """
      query manufacturers {
        manufacturers {
          id
          manufacturedCount
          soldCount
          returnedCount
          createdAt
        }
        manufacturersCount {
          count
        }
      }
    """;

    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Query(
        options: QueryOptions(
          document: gql(manufacturers),
        ),
        builder: (QueryResult result,
            {VoidCallback? refetch, FetchMore? fetchMore}) {
          if (result.hasException) {
            return Text(result.exception.toString());
          }

          if (result.isLoading) {
            return const Text('Loading...');
          }

          List manufacturers = result.data?['manufacturers'] ?? [];
          return ListView.builder(
            itemCount: manufacturers.length,
            itemBuilder: (context, index) {
              final manufacturer = manufacturers[index];
              return ListTile(
                title: Text('Manufacturer ID: ${manufacturer['id']}'),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                        'Manufactured Count: ${manufacturer['manufacturedCount']}'),
                    Text('Sold Count: ${manufacturer['soldCount']}'),
                    Text('Returned Count: ${manufacturer['returnedCount']}'),
                    Text('Created At: ${manufacturer['createdAt']}'),
                  ],
                ),
              );
            },
          );
        },
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            const DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              child: Text('Drawer Header'),
            ),
            ListTile(
              title: const Text('Page 1'),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => Page1()),
                );
              },
            ),
            ListTile(
              title: const Text('Page 2'),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => Page2()),
                );
              },
            ),
            ListTile(
              title: const Text('Product list'),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => ProductList(
                            title: "Product List",
                          )),
                );
              },
            ),
            ListTile(
              title: const Text('Transactions'),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => Transactions(
                            title: "Transactions",
                          )),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}