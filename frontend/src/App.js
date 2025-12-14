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
