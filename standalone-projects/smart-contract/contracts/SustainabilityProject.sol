// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

contract SustainabilityProject is Initializable {
    uint256 public productCounter;

    function initialize() public initializer {
        productCounter = 0;
    }

    enum ProductStatus {
        Manufactured,
        Sold,
        Returned
    }

    struct Product {
        uint256 id;
        string name;
        uint256 plasticWeight;
        uint256 itemCount;
    }

    struct ProductItem {
        string id;
        uint256 productId;
        ProductStatus status;
    }

    mapping(uint256 => Product) public products;
    mapping(string => ProductItem) public productItems;
    mapping(address => string[]) public inventory;

    event ProductAdded(uint256 productId);
    event ProductItemAdded(string itemId, uint256 productId); // Change to string itemId
    event ProductItemSold(string itemId); // Change to string itemId
    event ProductItemReturned(string itemId); // Change to string itemId

    function addProduct(string memory _name, uint256 _plasticWeight) public {
        productCounter++;
        Product memory newProduct = Product({
            id: productCounter,
            name: _name,
            plasticWeight: _plasticWeight,
            itemCount: 0
        });

        products[productCounter] = newProduct;
        emit ProductAdded(productCounter);
    }

    function addProductItems(uint256 _productId, uint256 _quantity) public {
        require(
            _quantity <= 10,
            'Cannot add more than 10 product items at a time.'
        );
        require(
            products[_productId].id == _productId,
            'Product does not exist.'
        );

        for (uint256 i = 0; i < _quantity; i++) {
            products[_productId].itemCount++;
            string memory itemId = string(
                abi.encodePacked(
                    _productId,
                    '-',
                    products[_productId].itemCount
                )
            );

            ProductItem memory newItem = ProductItem({
                id: itemId,
                productId: _productId,
                status: ProductStatus.Manufactured
            });

            productItems[itemId] = newItem;
            inventory[msg.sender].push(itemId);
            emit ProductItemAdded(itemId, _productId);
        }
    }

    function sellProductItem(string memory _itemId) public {
        require(
            productItems[_itemId].status == ProductStatus.Manufactured,
            'Product Item cannot be sold.'
        );

        productItems[_itemId].status = ProductStatus.Sold;
        emit ProductItemSold(_itemId);
    }

    function returnProductItem(string memory _itemId) public {
        require(
            productItems[_itemId].status == ProductStatus.Sold,
            'Product Item cannot be returned.'
        );

        productItems[_itemId].status = ProductStatus.Returned;
        emit ProductItemReturned(_itemId);
    }
}
