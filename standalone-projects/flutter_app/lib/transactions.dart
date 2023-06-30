import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import './components/TransactionCard.dart';
import './components/PaginatedList.dart';
import 'manufacturers.dart';
import 'products.dart';
import './design/color.dart';

class Transactions extends StatefulWidget {
  const Transactions({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  // ignore: library_private_types_in_public_api
  _TransactionsState createState() => _TransactionsState();
}

class _TransactionsState extends State<Transactions> {
  int currentPage = 0; // Start at page 0
  final int limit = 8;
  String? productItemId;

  List<Map<String, dynamic>> allTransactions = [];
  int itemsCount = 0;

  final String fetchTransactions = """
    query transactions(\$skip: Int, \$take: Int, \$where: TransactionWhereInput) {
      transactions(skip: \$skip, take: \$take, where: \$where) {
        createdAt
        id
        productItemId
        status
        productItem {
          product {
            name
          }
        }
      }
      transactionsCount(where: \$where) {
        count
      }
    }
  """;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Column(
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              onChanged: (value) {
                setState(() {
                  currentPage = 0;
                  productItemId = value;
                  allTransactions.clear(); // Clear previous transactions
                });
              },
              decoration: const InputDecoration(
                labelText: 'Enter product item ID',
                border: OutlineInputBorder(),
              ),
            ),
          ),
          Expanded(
            child: Query(
              options: QueryOptions(
                document: gql(fetchTransactions),
                variables: {
                  'skip': currentPage * limit,
                  'take': limit,
                  if (productItemId?.isNotEmpty == true)
                    'where': {
                      'productItemId': {'equals': productItemId}
                    }
                },
                onComplete: (dynamic resultData) {
                  List<Object?> rawList = resultData['transactions'] ?? [];
                  int total = resultData['transactionsCount']['count'] ?? 0;

                  List<Map<String, dynamic>> newTransactions =
                      rawList.map((e) => e as Map<String, dynamic>).toList();

                  // Append new transactions to allTransactions
                  setState(() {
                    allTransactions.addAll(newTransactions);
                    itemsCount = total;
                  });
                },
              ),
              builder: (
                QueryResult result, {
                VoidCallback? refetch,
                FetchMore? fetchMore,
              }) {
                return PaginatedList<Map<String, dynamic>>(
                  items: allTransactions,
                  itemsCount: itemsCount,
                  itemBuilder: (context, transaction) =>
                      TransactionCard(transaction: transaction),
                  onLoadMore: () {
                    setState(() {
                      currentPage++;
                    });
                  },
                  isLoading: result.isLoading,
                  errorMessage:
                      result.hasException ? result.exception.toString() : null,
                );
              },
            ),
          ),
        ],
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            const DrawerHeader(
              decoration: BoxDecoration(
                color: AppColors.primaryColor,
              ),
              child: Text('Menu'),
            ),
            ListTile(
              title: const Text('Product list'),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const Products(
                            title: "Product List",
                          )),
                );
              },
            ),
            ListTile(
              title: const Text('Manufacturers'),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const Manufacturers(
                            title: "Manufacturers",
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
                      builder: (context) => const Transactions(
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
