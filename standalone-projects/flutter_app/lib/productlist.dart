import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class ProductList extends StatelessWidget {
  ProductList({Key? key, required this.title}) : super(key: key);

  final int limit = 10;
  int offset = 0;
  final String title;

  final String fetchProducts = """
    query products(\$skip: Int, \$take: Int) {
      products(skip: \$skip, take: \$take) {
        id
        name
        plasticWeight
        quantity
        createdAt
        updatedAt
        manufacturerId
        returnedCount
        soldCount
      }
      productsCount {
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
          document: gql(fetchProducts),
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

          List products = result.data?['products'];

          FetchMoreOptions fetchMoreOpts = FetchMoreOptions(
            variables: {'skip': offset += limit, 'take': limit},
            updateQuery: (previousResultData, fetchMoreResultData) {
              List newProducts = [
                ...previousResultData?['products'] as List,
                ...fetchMoreResultData?['products'] as List
              ];

              fetchMoreResultData?['products'] = newProducts;

              return fetchMoreResultData;
            },
          );

          return ListView.builder(
            itemCount: products.length,
            itemBuilder: (context, index) {
              return ListTile(
                title: Text(products[index]['name']),
                // Add more fields as needed
              );
            },
            controller: ScrollController()
              ..addListener(() {
                if (result.isLoading) return;
                fetchMore?.call(fetchMoreOpts);
              }),
          );
        },
      ),
    );
  }
}
