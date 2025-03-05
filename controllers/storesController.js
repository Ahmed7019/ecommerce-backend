import multer from "multer";

const upload = multer();

const stores = [
  {
    id: 1,
    name: "The Cozy Bookstore",
    bio: "Your neighborhood bookstore with a curated selection of books and a warm atmosphere.",
    sells: "Books, stationery, gifts",
  },
  {
    id: 2,
    name: "Green Thumb Gardens",
    bio: "We provide everything you need to cultivate your green oasis, from seeds and plants to tools and advice.",
    sells: "Plants, seeds, gardening tools, pots, fertilizers",
  },
  {
    id: 3,
    name: "Tech Haven",
    bio: "Your one-stop shop for the latest gadgets, electronics, and tech accessories.",
    sells: "Computers, laptops, smartphones, tablets, headphones, chargers",
  },
  {
    id: 4,
    name: "Artisan Crafts",
    bio: "Discover unique handmade crafts, jewelry, and home decor created by local artisans.",
    sells: "Handmade jewelry, pottery, paintings, textiles, candles",
  },
  {
    id: 5,
    name: "The Sweet Spot Bakery",
    bio: "Indulge in freshly baked cakes, pastries, and bread made with love and the finest ingredients.",
    sells: "Cakes, pastries, bread, cookies, cupcakes",
  },
  {
    id: 6,
    name: "Coffee & Co.",
    bio: "Fuel your day with our specialty coffee, delicious pastries, and cozy atmosphere.",
    sells: "Coffee, tea, pastries, sandwiches, salads",
  },
  {
    id: 7,
    name: "Fashion Fusion",
    bio: "Find the latest trends and timeless pieces to express your unique style.",
    sells: "Clothing, shoes, accessories, bags",
  },
  {
    id: 8,
    name: "The Pet Emporium",
    bio: "Everything your furry friends need, from food and toys to grooming supplies and accessories.",
    sells: "Pet food, toys, beds, collars, leashes, grooming supplies",
  },
  {
    id: 9,
    name: "Home & Harmony",
    bio: "Create a beautiful and functional home with our furniture, home decor, and kitchenware.",
    sells: "Furniture, home decor, kitchenware, bedding, rugs",
  },
  {
    id: 10,
    name: "The Sports Hub",
    bio: "Gear up for your favorite sports with our wide selection of equipment, apparel, and footwear.",
    sells: "Sports equipment, apparel, footwear, accessories",
  },
  {
    id: 11,
    name: "The Book Nook",
    bio: "A cozy haven for book lovers, offering a wide selection of new and used books.",
    sells: "Books, magazines, comics",
  },
  {
    id: 12,
    name: "Gadget Galaxy",
    bio: "Explore the latest and greatest in technology, from smartphones to smart home devices.",
    sells: "Smartphones, tablets, laptops, smart home devices, drones",
  },
  {
    id: 13,
    name: "Style Studio",
    bio: "Curated fashion for the modern individual, offering clothing and accessories with a unique edge.",
    sells: "Clothing, shoes, accessories, jewelry",
  },
  {
    id: 14,
    name: "The Toy Box",
    bio: "Spark imagination and creativity with our wide selection of toys for all ages.",
    sells: "Toys, games, puzzles, dolls, action figures",
  },
  {
    id: 15,
    name: "The Music Den",
    bio: "Your destination for musical instruments, equipment, and accessories.",
    sells: "Guitars, drums, keyboards, microphones, amplifiers",
  },
  {
    id: 16,
    name: "Art & Soul Gallery",
    bio: "Experience the beauty of art with our collection of paintings, sculptures, and photography.",
    sells: "Paintings, sculptures, photography, prints",
  },
  {
    id: 17,
    name: "The Health Hut",
    bio: "Nourish your body and mind with our natural health products, supplements, and organic foods.",
    sells: "Supplements, vitamins, organic foods, essential oils",
  },
  {
    id: 18,
    name: "The Gamer's Grotto",
    bio: "Level up your gaming experience with our selection of video games, consoles, and accessories.",
    sells: "Video games, consoles, controllers, gaming headsets",
  },
  {
    id: 19,
    name: "The Outdoor Adventure",
    bio: "Gear up for your next adventure with our camping, hiking, and outdoor equipment.",
    sells: "Tents, sleeping bags, backpacks, hiking boots, camping gear",
  },
  {
    id: 20,
    name: "The Foodie Market",
    bio: "Discover a world of flavors with our gourmet food, specialty ingredients, and artisanal products.",
    sells: "Gourmet food, cheese, charcuterie, spices, oils, vinegars",
  },
];

// @desc    Get all stores
// @route   /api/stores

export const getStores = (req, res, next) => {
  if (!stores) {
    const err = new Error(`No store was found`);
    err.status = 404;
    return next(err);
  }

  res.status(200).json(stores);
};

// @desc    Get a store by Id
// @route   /api/stores/id/:id

export const getStoreById = (req, res, next) => {
  if (parseInt(req.params.id)) {
    const id = parseInt(req.params.id);
    const store = stores.find((store) => store.id === id);

    if (!store) {
      const err = new Error(`Store with id ${id} was not found`);
      err.status = 404;
      return next(err);
    }

    res.status(200).json(store);
  }
};

// @desc    Get a store by name
// @route   GET /api/stores/ :name

export const getStoreByName = (req, res, next) => {
  if (isNaN(req.params.name)) {
    const name = req.params.name.toLowerCase();
    const storeName = stores.filter((store) =>
      store.name.toLowerCase().includes(name)
    );
    if (!storeName || storeName.length === 0) {
      const err = new Error(` ${req.params.name} was not found`);
      err.status = 404;
      return next(err);
    }

    res.status(201).json(storeName);
  }
};

// @desc    POST a store
// @route   POST /api/stores
export const createNewStore =
  (upload.array(),
  (req, res, next) => {
    // Handle error
    if (!req.body.name || !req.body.bio || !req.body.sells) {
      const err = new Error(`Please fill all the fields`);
      err.status = 400; // Bad HTTP req
      return next(err);
    }

    // Add the store to the array

    stores.push({
      id: stores.length + 1,
      name: req.body.name,
      bio: req.body.bio,
      sells: req.body.sells,
    });

    res.status(200).json(stores);
  });

// @desc    Update store info
// @route   PUT /api/stores/id/:id
export const updateInfo =
  (upload.any(),
  (req, res, next) => {
    const id = parseInt(req.params.id);
    const storeToUpdate = stores.find((store) => store.id === id);

    // Check if the store doesn't exist
    if (!storeToUpdate) {
      const err = new Error(`Store with id ${id} was not fonud`);
      err.status = 404;
      return next(err);
    }
    console.log(req.body);

    //   Check if one of the fields is missing
    if (!req.body.name || !req.body.bio || !req.body.sells) {
      const err = new Error(`Please fill all the fields`);
      err.status = 400; // Bad request
      return next(err);
    }

    storeToUpdate.name = req.body.name;
    storeToUpdate.bio = req.body.bio;
    storeToUpdate.sells = req.body.sells;

    res.status(200).json(storeToUpdate);
  });

// @desc    DELETE a store using id
// @route   DELETE /api/stores/id

export const deleteStore = (req, res, next) => {
  const id = parseInt(req.params.id);
  const storeToDelete = stores.find((store) => store.id === id);

  //Handle error
  if (!storeToDelete) {
    const err = new Error(`Store with id ${id} was not found`);
    err.status = 404; // Not found
    return next(err);
  }

  // If the store was found
  const newStores = stores.filter((store) => store.id !== id);

  res.status(200).json(newStores);
};
