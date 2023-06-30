import 'package:flutter/material.dart';
import 'package:flutter_app/components/ProductCard.dart';
import 'package:flutter_app/transactions.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import './components/PaginatedList.dart';
import 'manufacturers.dart';

class Products extends StatefulWidget {
  const Products({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  // ignore: library_private_types_in_public_api
  _ProductsState createState() => _ProductsState();
}

class _ProductsState extends State<Products> {
  int currentPage = 0; // Start at page 0
  final int limit = 8;

  List<Map<String, dynamic>> allProducts = [];
  int itemsCount = 0;

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
        title: Text(widget.title),
      ),
      body: Query(
        options: QueryOptions(
          document: gql(fetchProducts),
          variables: {
            'skip': currentPage * limit,
            'take': limit,
          },
          onComplete: (dynamic resultData) {
            List<Object?> rawList = resultData['products'] ?? [];
            int total = resultData['productsCount']['count'] ?? 0;

            List<Map<String, dynamic>> newProducts =
                rawList.map((e) => e as Map<String, dynamic>).toList();

            setState(() {
              allProducts.addAll(newProducts);
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
            items: allProducts,
            itemsCount: itemsCount,
            itemBuilder: (context, product) => ProductCard(product: product),
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
    );
  }
}
