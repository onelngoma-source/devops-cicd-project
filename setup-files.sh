#!/bin/bash

# Créer App.js
cat > frontend/src/App.js << 'APPEOF'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

function App() {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
    fetchStats();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/items`);
      setItems(response.data.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/stats`);
      setStats(response.data.data);
    } catch (err) {
      console.error('Erreur stats:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description) {
      setError('Tous les champs sont requis');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/items/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/items`, formData);
      }
      
      setFormData({ name: '', description: '' });
      fetchItems();
      fetchStats();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name, description: item.description });
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet élément ?')) return;

    try {
      await axios.delete(`${API_URL}/items/${id}`);
      fetchItems();
      fetchStats();
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '' });
    setEditingId(null);
  };

  if (loading && items.length === 0) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>🚀 DevOps CI/CD Dashboard</h1>
          <p>Pipeline d'intégration et déploiement continu</p>
        </header>

        {error && <div className="error">⚠️ {error}</div>}

        {stats && (
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-label">Total Items</div>
                <div className="stat-value">{stats.totalItems}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-label">Actifs</div>
                <div className="stat-value">{stats.activeItems}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔄</div>
              <div className="stat-content">
                <div className="stat-label">Status</div>
                <div className="stat-value">
                  <span className="badge badge-success">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <h2>{editingId ? '✏️ Modifier' : '➕ Ajouter'} un élément</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                className="input"
                placeholder="Ex: Terraform"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="input"
                placeholder="Ex: Infrastructure as Code"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? '💾 Mettre à jour' : '➕ Ajouter'}
              </button>
              {editingId && (
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  ❌ Annuler
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="items-container">
          <h2>📋 Liste des éléments DevOps</h2>
          {items.length === 0 ? (
            <div className="empty-state">
              <p>Aucun élément. Ajoutez-en un !</p>
            </div>
          ) : (
            <div className="items-grid">
              {items.map((item) => (
                <div key={item.id} className="item-card">
                  <div className="item-header">
                    <h3>{item.name}</h3>
                    <span className="badge badge-info">{item.status}</span>
                  </div>
                  <p className="item-description">{item.description}</p>
                  <div className="item-actions">
                    <button className="btn btn-sm btn-primary" onClick={() => handleEdit(item)}>
                      ✏️ Modifier
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
APPEOF

# Créer App.css
cat > frontend/src/App.css << 'CSSEOF'
.App {
  min-height: 100vh;
  color: #333;
}

.header {
  text-align: center;
  color: white;
  padding: 40px 20px;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #718096;
  text-transform: uppercase;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 700;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #4a5568;
}

.input {
  width: 100%;
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
}

.input:focus {
  outline: none;
  border-color: #667eea;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-secondary {
  background: #718096;
  color: white;
}

.btn-danger {
  background: #f56565;
  color: white;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.item-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.badge-success {
  background: #c6f6d5;
  color: #22543d;
}

.badge-info {
  background: #bee3f8;
  color: #2c5282;
}

.loading {
  text-align: center;
  padding: 40px;
  color: white;
}

.error {
  background: #fed7d7;
  color: #742a2a;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
CSSEOF

# Créer index.css
cat > frontend/src/index.css << 'INDEXCSSEOF'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}
INDEXCSSEOF

# Créer App.test.js
cat > frontend/src/App.test.js << 'TESTEOF'
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('axios');

describe('App Component', () => {
  test('renders header', () => {
    render(<App />);
    const headerElement = screen.getByText(/DevOps CI\/CD Dashboard/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders form', () => {
    render(<App />);
    const nameLabel = screen.getByText(/Nom/i);
    expect(nameLabel).toBeInTheDocument();
  });
});
TESTEOF

# Créer setupTests.js
cat > frontend/src/setupTests.js << 'SETUPEOF'
import '@testing-library/jest-dom';
