import 'package:flutter/material.dart';

class ManufacturerCard extends StatelessWidget {
  final Map<String, dynamic> manufacturer;

  ManufacturerCard({required this.manufacturer});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text('ID: ${manufacturer['id']}'),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
                'Manufactured Count: ${manufacturer['manufacturedCount'].toString()}'),
            Text('Sold Count: ${manufacturer['soldCount'].toString()}'),
            Text('Returned Count: ${manufacturer['returnedCount'].toString()}'),
          ],
        ),
        trailing: Text('Created At: ${manufacturer['createdAt']}'),
      ),
    );
  }
}
