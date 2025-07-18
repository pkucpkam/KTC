import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../../services/productServices';
import type { Product } from '../../types/Product.types';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts();
                setProducts(data);
                setError(null);
            } catch (err) {
                setError('Không thể tải danh sách sản phẩm');
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (productId: string) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            return;
        }

        try {
            setDeletingId(productId);
            await deleteProduct(Number(productId));
            setProducts(products.filter(product => product.id !== productId));
        } catch (err) {
            setError('Không thể xóa sản phẩm');
            console.error('Error deleting product:', err);
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '200px',
                fontSize: '18px',
                color: '#666'
            }}>
                Đang tải...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '200px',
                fontSize: '18px',
                color: '#dc3545'
            }}>
                Lỗi: {error}
            </div>
        );
    }

    return (
        <div style={{ 
            margin: '0 auto', 
            padding: '24px',
            backgroundColor: '#f8f9fa',
            minHeight: '100vh'
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '32px',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{ 
                    margin: 0,
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: '#2c3e50'
                }}>
                    Danh sách sản phẩm
                </h1>
                <button
                    onClick={() => {
                        window.location.href = '/products/add';
                    }}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#218838';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#28a745';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    + Thêm sản phẩm mới
                </button>
            </div>

            <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
                padding: '0 12px'
            }}>
                {products.map(product => (
                    <div 
                        key={product.id} 
                        style={{ 
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            padding: '20px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            transition: 'all 0.3s ease',
                            border: '1px solid #e9ecef'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }}
                    >
                        <div style={{ 
                            width: '100%', 
                            height: '180px', 
                            borderRadius: '12px', 
                            overflow: 'hidden',
                            marginBottom: '16px',
                            backgroundColor: '#f8f9fa'
                        }}>
                            <img 
                                src={product.imgUrl || 'https://via.placeholder.com/280x180'} 
                                alt={product.name} 
                                style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    objectFit: 'cover'
                                }} 
                            />
                        </div>
                        
                        <h3 style={{ 
                            margin: '0 0 8px 0',
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#2c3e50',
                            lineHeight: '1.3'
                        }}>
                            {product.name}
                        </h3>
                        
                        <p style={{ 
                            margin: '0 0 8px 0',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#e74c3c'
                        }}>
                            {product.price.toLocaleString()} VND
                        </p>
                        
                        <p style={{ 
                            margin: '0 0 16px 0',
                            color: '#6c757d', 
                            fontSize: '14px'
                        }}>
                            Số lượng: {product.quantity}
                        </p>

                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            gap: '8px'
                        }}>
                            <div style={{ 
                                display: 'flex', 
                                gap: '8px'
                            }}>
                                <button
                                    onClick={() => {
                                        // Navigate to product detail page
                                        window.location.href = `/products/${product.id}`;
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = '#0056b3';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = '#007bff';
                                    }}
                                >
                                    Xem chi tiết
                                </button>
                                
                                <button
                                    onClick={() => {
                                        // Navigate to edit product page
                                        window.location.href = `/products/edit/${product.id}`;
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        backgroundColor: '#ffc107',
                                        color: '#212529',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = '#e0a800';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = '#ffc107';
                                    }}
                                >
                                    Chỉnh sửa
                                </button>
                            </div>
                            
                            <button 
                                onClick={() => handleDelete(product.id)}
                                disabled={deletingId === product.id}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    backgroundColor: deletingId === product.id ? '#6c757d' : '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: deletingId === product.id ? 'not-allowed' : 'pointer',
                                    transition: 'background-color 0.3s ease'
                                }}
                                onMouseOver={(e) => {
                                    if (deletingId !== product.id) {
                                        e.currentTarget.style.backgroundColor = '#bd2130';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (deletingId !== product.id) {
                                        e.currentTarget.style.backgroundColor = '#dc3545';
                                    }
                                }}
                            >
                                {deletingId === product.id ? 'Đang xóa...' : 'Xóa sản phẩm'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;