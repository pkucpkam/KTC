import React, { useState, useEffect } from 'react';
import { getProductById } from '../../services/productServices';
import type { Product } from '../../types/Product.types';
import { useParams } from 'react-router-dom';

const ProductDetail: React.FC = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const productId = useParams().id;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(Number(productId));
                setProduct(data);
            } catch (err) {
                console.error('Lỗi khi lấy thông tin sản phẩm:', err);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    if (loading) {
        return (
            <div style={{ 
                width: '100vw',
                minHeight: '100vh',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: '#f8f9fa'
            }}>
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontSize: '18px',
                    color: '#666'
                }}>
                    Đang tải thông tin sản phẩm...
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{ 
                width: '100vw',
                minHeight: '100vh',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: '#f8f9fa'
            }}>
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontSize: '18px',
                    color: '#666'
                }}>
                    Không tìm thấy sản phẩm.
                </div>
            </div>
        );
    }

    return (
        <div style={{ 
            width: '100vw',
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            padding: '24px',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div style={{ 
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto'
            }}>
                {/* Header */}
                <div style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '12px',
                    marginBottom: '24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h1 style={{ 
                        margin: 0,
                        fontSize: '28px',
                        fontWeight: 'bold',
                        color: '#2c3e50'
                    }}>
                        Chi tiết sản phẩm
                    </h1>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={() => {
                                window.location.href = '/';
                            }}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#5a6268';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#6c757d';
                            }}
                        >
                            ← Quay lại danh sách
                        </button>
                    </div>
                </div>

                {/* Product Detail Card */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }}>
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: '400px 1fr',
                        gap: '32px'
                    }}>
                        {/* Product Image */}
                        <div style={{
                            position: 'relative',
                            height: '400px',
                            backgroundColor: '#f8f9fa',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {product.imgUrl ? (
                                <img
                                    src={product.imgUrl}
                                    alt={product.name}
                                    style={{ 
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#6c757d',
                                    fontSize: '18px'
                                }}>
                                    Không có hình ảnh
                                </div>
                            )}
                        </div>

                        {/* Product Information */}
                        <div style={{ padding: '32px' }}>
                            <h2 style={{ 
                                margin: '0 0 16px 0',
                                fontSize: '32px',
                                fontWeight: 'bold',
                                color: '#2c3e50',
                                lineHeight: '1.3'
                            }}>
                                {product.name}
                            </h2>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                marginBottom: '24px',
                                padding: '16px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '8px'
                            }}>
                                <div>
                                    <div style={{ 
                                        fontSize: '32px',
                                        fontWeight: 'bold',
                                        color: '#e74c3c'
                                    }}>
                                        {product.price.toLocaleString()}₫
                                    </div>
                                </div>
                                <div style={{
                                    marginLeft: 'auto',
                                    padding: '8px 16px',
                                    backgroundColor: product.quantity > 0 ? '#d4edda' : '#f8d7da',
                                    color: product.quantity > 0 ? '#155724' : '#721c24',
                                    borderRadius: '20px',
                                    fontSize: '14px',
                                    fontWeight: '600'
                                }}>
                                    {product.quantity > 0 ? `Còn ${product.quantity} sản phẩm` : 'Hết hàng'}
                                </div>
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <h3 style={{
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    color: '#2c3e50',
                                    marginBottom: '8px'
                                }}>
                                    Mô tả sản phẩm:
                                </h3>
                                <p style={{ 
                                    fontSize: '16px',
                                    lineHeight: '1.6',
                                    color: '#495057',
                                    margin: 0
                                }}>
                                    {product.description || 'Không có mô tả cho sản phẩm này.'}
                                </p>
                            </div>

                            <div style={{
                                padding: '16px',
                                backgroundColor: '#e9ecef',
                                borderRadius: '8px',
                                marginBottom: '24px'
                            }}>
                                <div style={{ 
                                    fontSize: '14px',
                                    color: '#6c757d',
                                    marginBottom: '4px'
                                }}>
                                    Mã sản phẩm:
                                </div>
                                <div style={{ 
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#495057'
                                }}>
                                    {product.id}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div style={{ 
                                display: 'flex',
                                gap: '12px',
                                paddingTop: '16px',
                                borderTop: '1px solid #e9ecef'
                            }}>
                                <button
                                    onClick={() => {
                                        window.location.href = `/products/edit/${productId}`;
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: '14px 24px',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = '#0056b3';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = '#007bff';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    ✏️ Chỉnh sửa sản phẩm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
