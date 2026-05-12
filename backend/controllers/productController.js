import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};
    const category = req.query.category ? { category: req.query.category } : {};
    
    // Sort logic
    const sortStr = req.query.sort || '';
    let sortObj = {};
    if (sortStr === 'price_asc') sortObj = { price: 1 };
    else if (sortStr === 'price_desc') sortObj = { price: -1 };
    else sortObj = { createdAt: -1 }; // popularity/default

    const products = await Product.find({ ...keyword, ...category }).sort(sortObj);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin route
export const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: 'Sample Name', price: 0, category: 'Sample Category',
      description: 'Sample description', image: '/images/sample.jpg', stock: 10
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { name, price, description, image, category, stock } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name; product.price = price;
      product.description = description; product.image = image;
      product.category = category; product.stock = stock;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    // Correct method in newer mongoose versions is to use deleteOne
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
