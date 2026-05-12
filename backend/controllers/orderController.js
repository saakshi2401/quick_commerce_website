import Order from '../models/Order.js';

export const addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;
  
  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  }
  
  try {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      totalPrice,
      status: 'Pending'
    });
    
    // Simulate slight delay for mock payment flow UX
    setTimeout(async () => {
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }, 1500);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
