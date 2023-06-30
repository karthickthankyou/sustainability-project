import 'package:flutter/material.dart';

typedef OnLoadMore = void Function();

class PaginatedList<T> extends StatefulWidget {
  final List<T> items;
  int itemsCount = 0;

  final Widget Function(BuildContext, T) itemBuilder;
  final OnLoadMore onLoadMore;
  final bool isLoading;
  final String? errorMessage;

  PaginatedList({
    required this.items,
    required this.itemBuilder,
    required this.onLoadMore,
    this.isLoading = false,
    this.errorMessage,
    required this.itemsCount,
  });

  @override
  // ignore: library_private_types_in_public_api
  _PaginatedListState<T> createState() => _PaginatedListState<T>();
}

class _PaginatedListState<T> extends State<PaginatedList<T>> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        if (widget.isLoading)
          const Center(child: CircularProgressIndicator())
        else if (widget.items.isEmpty)
          const Center(child: Text('No results')),
        if (!widget.isLoading && widget.items.isNotEmpty)
          Expanded(
            child: ListView.builder(
              itemCount: widget.items.length,
              itemBuilder: (context, index) =>
                  widget.itemBuilder(context, widget.items[index]),
            ),
          ),
        if (widget.errorMessage != null) Text('Error: ${widget.errorMessage}'),
        if (!widget.isLoading && widget.itemsCount > widget.items.length)
          ElevatedButton(
            onPressed: widget.onLoadMore,
            child: const Text('Load More'),
          )
        else if (!widget.isLoading && widget.itemsCount <= widget.items.length)
          const Text("Thats all. 🤷")
      ],
    );
  }
}
