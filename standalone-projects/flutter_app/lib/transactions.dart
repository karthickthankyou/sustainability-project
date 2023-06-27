import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'dart:developer';
import './components/TransactionCard.dart';

class Transactions extends StatefulWidget {
  const Transactions({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _TransactionsState createState() => _TransactionsState();
}

class _TransactionsState extends State<Transactions> {
  int offset = 0;
  final int limit = 8;
  String? productItemId;

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

      transactionsCount {
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
                  offset = 0;
                  productItemId = value;
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
                  'skip': offset,
                  'take': limit,
                  if (productItemId?.isNotEmpty == true)
                    'where': {
                      'productItemId': {'equals': productItemId}
                    }
                },
              ),
              builder: (
                QueryResult result, {
                VoidCallback? refetch,
                FetchMore? fetchMore,
              }) {
                if (result.isLoading && result.data == null) {
                  return const Center(
                    child: CircularProgressIndicator(),
                  );
                }

                if (result.hasException) {
                  return Text(result.exception.toString());
                }

                List transactions = result.data?['transactions'];
                int transactionsCount =
                    result.data?['transactionsCount']['count'];

                if (transactions.isEmpty) {
                  return const Center(
                    child: Text('No results'),
                  );
                }

                return Column(
                  children: <Widget>[
                    Expanded(
                      child: ListView.builder(
                        itemCount: transactions.length,
                        itemBuilder: (context, index) {
                          return TransactionCard(
                              transaction: transactions[index]);
                        },
                      ),
                    ),
                    if (!result.isLoading &&
                        transactionsCount > transactions.length)
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: ElevatedButton(
                          onPressed: () {
                            offset += limit;

                            FetchMoreOptions fetchMoreOpts = FetchMoreOptions(
                              variables: {
                                'skip': offset,
                                'take': limit,
                                if (productItemId?.isNotEmpty == true)
                                  'where': {
                                    'productItemId': {'equals': productItemId}
                                  }
                              },
                              updateQuery:
                                  (previousResultData, fetchMoreResultData) {
                                List newTransactions = [
                                  ...previousResultData?['transactions']
                                      as List,
                                  ...fetchMoreResultData?['transactions']
                                      as List
                                ];

                                fetchMoreResultData?['transactions'] =
                                    newTransactions;

                                return fetchMoreResultData;
                              },
                            );

                            fetchMore?.call(fetchMoreOpts);
                          },
                          child: const Text('Load More'),
                        ),
                      ),
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
