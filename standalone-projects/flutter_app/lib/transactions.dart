import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'dart:developer';

class Transactions extends StatelessWidget {
  Transactions({Key? key, required this.title}) : super(key: key);

  int offset = 0;
  final int limit = 8;
  final String title;

  final String fetchTransactions = """
    query transactions(\$skip: Int, \$take: Int) {
      transactions(
        skip: \$skip
        take: \$take
      ) {
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
        title: Text(title),
      ),
      body: Query(
        options: QueryOptions(
          document: gql(fetchTransactions),
          variables: {
            'skip': offset,
            'take': limit,
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
          int transactionsCount = result.data?['transactionsCount']['count'];

          print('$transactions.length:  $transactionsCount $limit $offset');

          return Column(
            children: <Widget>[
              Expanded(
                child: ListView.builder(
                  itemCount: transactions.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                      title: Text(transactions[index]['id'].toString()),
                      // Add more fields as needed
                    );
                  },
                ),
              ),
              if (!result.isLoading && transactionsCount > transactions.length)
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: ElevatedButton(
                    onPressed: () {
                      offset += limit;

                      FetchMoreOptions fetchMoreOpts = FetchMoreOptions(
                        variables: {'skip': offset, 'take': limit},
                        updateQuery: (previousResultData, fetchMoreResultData) {
                          List newTransactions = [
                            ...previousResultData?['transactions'] as List,
                            ...fetchMoreResultData?['transactions'] as List
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
    );
  }
}
