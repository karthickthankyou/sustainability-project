import 'package:flutter/material.dart';
import 'package:flutter_app/components/ManufacturerCard.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import './components/PaginatedList.dart';

class Manufacturers extends StatefulWidget {
  const Manufacturers({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  // ignore: library_private_types_in_public_api
  _ManufacturersState createState() => _ManufacturersState();
}

class _ManufacturersState extends State<Manufacturers> {
  int currentPage = 0; // Start at page 0
  final int limit = 8;

  List<Map<String, dynamic>> allManufacturers = [];
  int itemsCount = 0;

  String manufacturers = """
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Query(
        options: QueryOptions(
          document: gql(manufacturers),
          variables: {
            'skip': currentPage * limit,
            'take': limit,
          },
          onComplete: (dynamic resultData) {
            List<Object?> rawList = resultData['manufacturers'] ?? [];
            int total = resultData['manufacturersCount']['count'] ?? 0;

            List<Map<String, dynamic>> newManufacturers =
                rawList.map((e) => e as Map<String, dynamic>).toList();

            setState(() {
              allManufacturers.addAll(newManufacturers);
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
            items: allManufacturers,
            itemsCount: itemsCount,
            itemBuilder: (context, manufacturer) =>
                ManufacturerCard(manufacturer: manufacturer),
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
