const request = require('supertest');
const app = require('../src/server');

describe('API Endpoints', () => {
  
  // Health check
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/health')
        .expect(200);
      
      expect(res.body).toHaveProperty('status', 'healthy');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('uptime');
    });
  });

  // GET all items
  describe('GET /api/items', () => {
    it('should return all items', async () => {
      const res = await request(app)
        .get('/api/items')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty('count');
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  // GET single item
  describe('GET /api/items/:id', () => {
    it('should return a single item', async () => {
      const res = await request(app)
        .get('/api/items/1')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id', 1);
      expect(res.body.data).toHaveProperty('name');
      expect(res.body.data).toHaveProperty('description');
    });

    it('should return 404 for non-existent item', async () => {
      const res = await request(app)
        .get('/api/items/9999')
        .expect(404);
      
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Item not found');
    });
  });

  // POST create item
  describe('POST /api/items', () => {
    it('should create a new item', async () => {
      const newItem = {
        name: 'GitHub Actions',
        description: 'CI/CD automation platform'
      };

      const res = await request(app)
        .post('/api/items')
        .send(newItem)
        .expect(201);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.name).toBe(newItem.name);
      expect(res.body.data.status).toBe('active');
      expect(res.body.data).toHaveProperty('createdAt');
    });

    it('should return 400 if name is missing', async () => {
      const res = await request(app)
        .post('/api/items')
        .send({ description: 'Test description' })
        .expect(400);
      
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('required');
    });

    it('should return 400 if name is too short', async () => {
      const res = await request(app)
        .post('/api/items')
        .send({ name: 'AB', description: 'Test' })
        .expect(400);
      
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('at least 3 characters');
    });
  });

  // PUT update item
  describe('PUT /api/items/:id', () => {
    it('should update an item', async () => {
      const updates = {
        name: 'DevOps Updated',
        description: 'Updated description'
      };

      const res = await request(app)
        .put('/api/items/1')
        .send(updates)
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(updates.name);
      expect(res.body.data).toHaveProperty('updatedAt');
    });

    it('should return 404 for non-existent item', async () => {
      const res = await request(app)
        .put('/api/items/9999')
        .send({ name: 'Test' })
        .expect(404);
      
      expect(res.body.success).toBe(false);
    });

    it('should return 400 if name is too short', async () => {
      const res = await request(app)
        .put('/api/items/1')
        .send({ name: 'AB' })
        .expect(400);
      
      expect(res.body.success).toBe(false);
    });
  });

  // DELETE item
  describe('DELETE /api/items/:id', () => {
    it('should delete an item', async () => {
      const res = await request(app)
        .delete('/api/items/2')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain('deleted');
    });

    it('should return 404 for non-existent item', async () => {
      const res = await request(app)
        .delete('/api/items/9999')
        .expect(404);
      
      expect(res.body.success).toBe(false);
    });
  });

  // GET statistics
  describe('GET /api/stats', () => {
    it('should return statistics', async () => {
      const res = await request(app)
        .get('/api/stats')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('totalItems');
      expect(res.body.data).toHaveProperty('activeItems');
      expect(res.body.data).toHaveProperty('timestamp');
      expect(typeof res.body.data.totalItems).toBe('number');
    });
  });

  // 404 Handler
  describe('404 Handler', () => {
    it('should return 404 for unknown routes', async () => {
      const res = await request(app)
        .get('/unknown-route')
        .expect(404);
      
      expect(res.body).toHaveProperty('error');
      expect(res.body.success).toBe(false);
    });
  });
});
