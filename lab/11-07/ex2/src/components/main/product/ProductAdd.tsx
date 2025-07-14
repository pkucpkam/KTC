import React, { useState } from 'react';
import { createProduct } from '../../services/productServices';
import type { Product } from '../../types/Product.types';


type ProductFormData = Omit<Product, 'id'>;

const ProductAdd: React.FC = () => {
    const [product, setProduct] = useState<ProductFormData>({
        name: '',
        price: 0,
        description: '',
        imgUrl: '',
        quantity: 0,
    });

    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            await createProduct(product);
            setMessage('Sản phẩm đã được thêm thành công!');
            setProduct({ name: '', price: 0, description: '', imgUrl: '', quantity: 0 });
        } catch (err) {
            setError('Không thể thêm sản phẩm. Vui lòng thử lại!');
            console.error('Lỗi khi thêm sản phẩm:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            width: '100vw',
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            padding: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{ 
                maxWidth: '600px',
                width: '100%',
                margin: '0 auto',
                backgroundColor: 'white',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ 
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    marginBottom: '24px',
                    textAlign: 'center'
                }}>
                    Thêm sản phẩm mới
                </h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: '16px', color: '#2c3e50', fontWeight: '600' }}>
                            Tên sản phẩm:
                            <input
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                required
                                type="text"
                                style={{ 
                                    width: '100%', 
                                    padding: '12px 0px 12px 12px',
                                    marginTop: 8, 
                                    border: '1px solid #ced4da', 
                                    borderRadius: '8px',
                                    fontSize: '16px'
                                }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: '16px', color: '#2c3e50', fontWeight: '600' }}>
                            Giá:
                            <input
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                required
                                type="number"
                                min="0"
                                step="0.01"
                                style={{ 
                                    width: '100%', 
                                    padding: '12px 0px 12px 12px',
                                    marginTop: 8, 
                                    border: '1px solid #ced4da', 
                                    borderRadius: '8px',
                                    fontSize: '16px'
                                }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: '16px', color: '#2c3e50', fontWeight: '600' }}>
                            Mô tả:
                            <textarea
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                style={{ 
                                    width: '100%', 
                                    padding: '12px 0px 12px 12px',
                                    marginTop: 8, 
                                    border: '1px solid #ced4da', 
                                    borderRadius: '8px',
                                    fontSize: '16px'
                                }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: '16px', color: '#2c3e50', fontWeight: '600' }}>
                            URL hình ảnh:
                            <input
                                name="imgUrl"
                                value={product.imgUrl}
                                onChange={handleChange}
                                required
                                type="url"
                                style={{ 
                                    width: '100%', 
                                    padding: '12px 0px 12px 12px',
                                    marginTop: 8, 
                                    border: '1px solid #ced4da', 
                                    borderRadius: '8px',
                                    fontSize: '16px'
                                }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: 24 }}>
                        <label style={{ fontSize: '16px', color: '#2c3e50', fontWeight: '600' }}>
                            Số lượng:
                            <input
                                name="quantity"
                                value={product.quantity}
                                onChange={handleChange}
                                required
                                type="number"
                                min="0"
                                style={{ 
                                    width: '100%', 
                                    padding: '12px 0px 12px 12px',
                                    marginTop: 8, 
                                    border: '1px solid #ced4da', 
                                    borderRadius: '8px',
                                    fontSize: '16px'
                                }}
                            />
                        </label>
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ 
                            width: '100%', 
                            padding: '12px', 
                            backgroundColor: loading ? '#ccc' : '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                            if (!loading) {
                                e.currentTarget.style.backgroundColor = '#0056b3';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!loading) {
                                e.currentTarget.style.backgroundColor = '#007bff';
                            }
                        }}
                    >
                        {loading ? 'Đang thêm...' : 'Thêm sản phẩm'}
                    </button>
                </form>
                {message && <p style={{ color: 'green', marginTop: 16, textAlign: 'center' }}>{message}</p>}
                {error && <p style={{ color: 'red', marginTop: 16, textAlign: 'center' }}>{error}</p>}
            </div>
        </div>
    );
};

export default ProductAdd;
