const PRODUCTS = [
    {
        id: "tshirt-moveon",
        name: "تيشيرت MOVE ON",
        price: 450,
        description: "خامة تقيلة، قصة ستريت، وهوية واضحة",
        images: {
            "أسود": "images/products/tshirt-black.jpg",
            "أبيض": "images/products/tshirt-white.jpg",
            "موف": "images/products/tshirt-purple.jpg"
        },
        stock: {
            "أسود": { S: 5, M: 3, L: 0, XL: 2 },
            "أبيض": { S: 2, M: 4, L: 6, XL: 1 },
            "موف": { S: 1, M: 0, L: 3, XL: 0 }
        }
    },

    {
        id: "hoodie-moveon",
        name: "هودي MOVE ON",
        price: 750,
        description: "هودي شتوي تقيل – مريح جدًا",
        images: {
            "أسود": "images/products/hoodie-black.jpg",
            "رمادي": "images/products/hoodie-gray.jpg"
        },
        stock: {
            "أسود": { M: 5, L: 2, XL: 1 },
            "رمادي": { M: 3, L: 4, XL: 0 }
        }
    }
];

