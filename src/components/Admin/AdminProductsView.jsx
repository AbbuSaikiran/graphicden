import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Package, Plus, Trash2, Edit2, Search, Sparkles, 
  Check, X, Image as ImageIcon, Tag
} from 'lucide-react';
import { CATEGORIES } from '../../data/initialData';

export const AdminProductsView = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();

  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [editStock, setEditStock] = useState('');

  // New product form
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Acrylic Lamps');
  const [price, setPrice] = useState(1199);
  const [originalPrice, setOriginalPrice] = useState(2199);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80');
  const [description, setDescription] = useState('High-quality personalized gift item crafted exclusively for GraphicDen customers.');
  const [inStock, setInStock] = useState(30);
  const [isCustomizable, setIsCustomizable] = useState(true);

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateProduct = (e) => {
    e.preventDefault();
    addProduct({
      name,
      category,
      price: Number(price),
      originalPrice: Number(originalPrice),
      image,
      description,
      inStock: Number(inStock),
      isCustomizable,
      tags: ['New Arrival'],
      allowPhotoUpload: true,
      customFieldPlaceholder: 'Enter custom name/text'
    });
    setIsAddModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPrice(1199);
    setOriginalPrice(2199);
    setInStock(30);
  };

  const startEdit = (prod) => {
    setEditingId(prod.id);
    setEditPrice(prod.price);
    setEditStock(prod.inStock);
  };

  const saveEdit = (id) => {
    updateProduct(id, {
      price: Number(editPrice),
      inStock: Number(editStock)
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Gift Products Catalogue</h1>
          <p className="text-xs text-slate-400 mt-1">Manage pricing, inventory and personalization options</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/20 flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Gift Product</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, category, or SKU..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 uppercase font-bold text-[10px] text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-4 py-4">Category</th>
                <th className="px-4 py-4">Selling Price</th>
                <th className="px-4 py-4">Stock</th>
                <th className="px-4 py-4">Personalization</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map(product => {
                const isEditing = editingId === product.id;

                return (
                  <tr key={product.id} className="hover:bg-slate-800/30 transition">
                    
                    {/* Title & Image */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-700 bg-slate-800"
                        />
                        <div className="max-w-xs">
                          <p className="font-bold text-white line-clamp-1">{product.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">SKU: {product.sku}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-800 text-slate-300">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-20 px-2 py-1 bg-slate-950 border border-rose-500 rounded text-xs text-white"
                        />
                      ) : (
                        <div>
                          <span className="font-bold text-white">₹{product.price.toLocaleString('en-IN')}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-[10px] text-slate-500 line-through ml-1.5">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="px-4 py-4">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editStock}
                          onChange={(e) => setEditStock(e.target.value)}
                          className="w-16 px-2 py-1 bg-slate-950 border border-rose-500 rounded text-xs text-white"
                        />
                      ) : (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          product.inStock > 20
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : product.inStock > 5
                            ? 'bg-amber-500/15 text-amber-400'
                            : 'bg-rose-500/15 text-rose-400'
                        }`}>
                          {product.inStock} units
                        </span>
                      )}
                    </td>

                    {/* Personalization status */}
                    <td className="px-4 py-4">
                      {product.isCustomizable ? (
                        <span className="flex items-center gap-1 text-[11px] text-rose-400 font-medium">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Engraving / Photo</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">Ready-Made</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => saveEdit(product.id)}
                            className="p-1.5 text-emerald-400 hover:bg-slate-800 rounded"
                            title="Save changes"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 text-slate-500 hover:bg-slate-800 rounded"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => startEdit(product)}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                            title="Edit Price/Stock"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete product "${product.name}"?`)) {
                                deleteProduct(product.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full text-slate-200 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Add New Gift Product</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Customized 3D Crystal Heart Lamp"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
                  >
                    {CATEGORIES.filter(c => c !== 'All Gifts').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Stock Units</label>
                  <input
                    type="number"
                    required
                    value={inStock}
                    onChange={(e) => setInStock(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="customCheck"
                  checked={isCustomizable}
                  onChange={(e) => setIsCustomizable(e.target.checked)}
                  className="rounded text-rose-600"
                />
                <label htmlFor="customCheck" className="text-white font-medium cursor-pointer">
                  Enable Customer Photo & Engraving Options
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold shadow-md shadow-rose-600/20"
                >
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

