// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

contract SustainabilityProject is Initializable {
    uint256 public productCounter;
    address payable public owner;

    function initialize() public initializer {
        owner = payable(msg.sender);
        productCounter = 0;
    }

    enum ProductStatus {
        MANUFACTURED,
        SOLD,
        RETURNED
    }

    struct Product {
        uint256 id;
        string name;
        uint256 plasticWeight;
        uint256 itemCount;
        address manufacturer;
    }

    struct ProductItem {
        string id;
        uint256 productId;
        ProductStatus status;
    }

    mapping(uint256 => Product) public products;
    mapping(string => ProductItem) public productItems;
    mapping(address => string[]) public inventory;

    event ProductCreated(
        uint256 productId,
        string name,
        uint256 plasticWeight,
        address manufacturer
    );
    event ProductQuantityUpdated(uint256 productId, uint256 quantity);
    event ProductItemAdded(string itemId, uint256 productId);
    event ProductItemSold(string itemId);
    event ProductItemReturned(string itemId);

    function addProduct(string memory _name, uint256 _plasticWeight) public {
        productCounter++;
        Product memory newProduct = Product({
            id: productCounter,
            name: _name,
            plasticWeight: _plasticWeight,
            itemCount: 0,
            manufacturer: msg.sender
        });

        products[productCounter] = newProduct;
        emit ProductCreated(productCounter, _name, _plasticWeight, msg.sender);
    }

    function addProductItems(uint256 _productId, uint256 _quantity) public {
        require(
            _quantity <= 10,
            'Cannot add more than 10 product items at a time.'
        );
        require(
            msg.sender == products[_productId].manufacturer,
            'Only the product manufacturer can add product items.'
        );
        require(
            products[_productId].id == _productId,
            'Product does not exist.'
        );

        for (uint256 i = 0; i < _quantity; i++) {
            products[_productId].itemCount++;
            string memory itemId = string.concat(
                Strings.toString(_productId),
                '-',
                Strings.toString(products[_productId].itemCount)
            );

            ProductItem memory newItem = ProductItem({
                id: itemId,
                productId: _productId,
                status: ProductStatus.MANUFACTURED
            });

            productItems[itemId] = newItem;
            inventory[msg.sender].push(itemId);
            emit ProductItemAdded(itemId, _productId);
        }
        emit ProductQuantityUpdated(_productId, products[_productId].itemCount);
    }

    function sellProductItem(string memory _itemId) public {
        require(
            productItems[_itemId].status == ProductStatus.MANUFACTURED,
            'Product Item cannot be sold.'
        );

        productItems[_itemId].status = ProductStatus.SOLD;
        emit ProductItemSold(_itemId);
    }

    function returnProductItem(string memory _itemId) public {
        require(
            productItems[_itemId].status == ProductStatus.SOLD,
            'Product Item cannot be returned.'
        );

        productItems[_itemId].status = ProductStatus.RETURNED;
        emit ProductItemReturned(_itemId);
    }
}
