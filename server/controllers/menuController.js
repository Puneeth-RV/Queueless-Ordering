const FoodItem = require('../models/FoodItem');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
const getMenuItems = async (req, res) => {
  try {
    const items = await FoodItem.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a menu item
// @route   POST /api/menu
// @access  Private/Admin
const createMenuItem = async (req, res) => {
  const { name, description, price, category, image, available } = req.body;

  try {
    const item = new FoodItem({
      name,
      description,
      price,
      category,
      image,
      available,
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
const updateMenuItem = async (req, res) => {
  const { name, description, price, category, image, available } = req.body;

  try {
    const item = await FoodItem.findById(req.params.id);

    if (item) {
      item.name = name || item.name;
      item.description = description || item.description;
      item.price = price || item.price;
      item.category = category || item.category;
      item.image = image || item.image;
      item.available = available !== undefined ? available : item.available;

      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
const deleteMenuItem = async (req, res) => {
  try {
    const item = await FoodItem.findById(req.params.id);

    if (item) {
      await item.deleteOne();
      res.json({ message: 'Menu item removed' });
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem };
