const express = require('express');
const router = express.Router();

// Base de données en mémoire (pour la démo)
let items = [
  { id: 1, name: 'DevOps', description: 'Culture et pratiques DevOps', status: 'active', createdAt: new Date().toISOString() },
  { id: 2, name: 'CI/CD', description: 'Intégration et déploiement continu', status: 'active', createdAt: new Date().toISOString() },
  { id: 3, name: 'Docker', description: 'Containerisation d\'applications', status: 'active', createdAt: new Date().toISOString() },
  { id: 4, name: 'Kubernetes', description: 'Orchestration de conteneurs', status: 'active', createdAt: new Date().toISOString() }
];

// GET all items
router.get('/items', (req, res) => {
  res.json({
    success: true,
    count: items.length,
    data: items
  });
});

// GET single item by ID
router.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  
  if (!item) {
    return res.status(404).json({
      success: false,
      error: 'Item not found'
    });
  }
  
  res.json({
    success: true,
    data: item
  });
});

// POST create new item
router.post('/items', (req, res) => {
  const { name, description } = req.body;
  
  // Validation
  if (!name || !description) {
    return res.status(400).json({
      success: false,
      error: 'Name and description are required'
    });
  }
  
  if (name.length < 3) {
    return res.status(400).json({
      success: false,
      error: 'Name must be at least 3 characters'
    });
  }
  
  // Créer le nouvel item
  const newItem = {
    id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
    name,
    description,
    status: 'active',
    createdAt: new Date().toISOString()
  };
  
  items.push(newItem);
  
  res.status(201).json({
    success: true,
    message: 'Item created successfully',
    data: newItem
  });
});

// PUT update item
router.put('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  
  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Item not found'
    });
  }
  
  const { name, description, status } = req.body;
  
  // Validation
  if (name && name.length < 3) {
    return res.status(400).json({
      success: false,
      error: 'Name must be at least 3 characters'
    });
  }
  
  // Mettre à jour l'item
  items[itemIndex] = {
    ...items[itemIndex],
    ...(name && { name }),
    ...(description && { description }),
    ...(status && { status }),
    updatedAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    message: 'Item updated successfully',
    data: items[itemIndex]
  });
});

// DELETE item
router.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  
  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Item not found'
    });
  }
  
  const deletedItem = items[itemIndex];
  items.splice(itemIndex, 1);
  
  res.json({
    success: true,
    message: 'Item deleted successfully',
    data: deletedItem
  });
});

// GET statistics
router.get('/stats', (req, res) => {
  const stats = {
    totalItems: items.length,
    activeItems: items.filter(i => i.status === 'active').length,
    inactiveItems: items.filter(i => i.status === 'inactive').length,
    timestamp: new Date().toISOString()
  };
  
  res.json({
    success: true,
    data: stats
  });
});

module.exports = router;
