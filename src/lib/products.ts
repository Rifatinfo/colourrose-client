export const products = [
  {
    "id": "1",
    "name": "Black Panjabi",
    "slug": "panjabi-black-01",

    "categories": [
      { "id": "men", "name": "Men" },
      { "id": "collection", "name": "Collection" }
    ],

    "subCategories": [
      { "id": "panjabi", "name": "Panjabi", "parentId": "men" },
      { "id": "eid-25", "name": "Eid Collection 2025", "parentId": "panjabi" }
    ],

    "pricing": {
      "regular": 2500,
      "sale": 2000
    },

    "sku": "P-1361",

    "stock": {
      "quantity": 100,
      "status": "IN_STOCK"
    },

    "variants": {
      "colors": ["#C45D48", "#000000", "#F57C00", "#FFD700"],
      "sizes": ["XS", "S", "M", "L", "XL", "XXL"]
    },

    "descriptions": {
      "short": "Premium black panjabi made from 100% bamboo silk.",
      "full": "This black panjabi is crafted from 100% bamboo silk, perfect for festive, wedding, and traditional occasions. Available in multiple colors and sizes."
    },

    "images": [
      "/images/products/panjabi-black-1.jpg",
      "/images/products/panjabi-black-2.jpg",
      "/images/products/panjabi-black-3.jpg"
    ],

    "tags": ["panjabi", "men-fashion", "eid-2025"],

    "additionalInformation": [
      { "label": "Weight", "value": "0.5 kg" },
      { "label": "Dimensions", "value": "30 × 20 × 5 cm" },
      { "label": "Material", "value": "100% Bamboo Silk" },
      { "label": "Color Options", "value": "Navy Blue, Black, White" },
      { "label": "Available Sizes", "value": "XS, S, M, L, XL, XXL, 3XL" },
      { "label": "Fit Type", "value": "Slim Fit" },
      { "label": "Occasion", "value": "Traditional, Festive, Wedding" },
      { "label": "Care", "value": "Dry Clean Only" },
      { "label": "Country of Origin", "value": "Bangladesh" },
      { "label": "SKU", "value": "P-1361" }
    ],
  }
];
