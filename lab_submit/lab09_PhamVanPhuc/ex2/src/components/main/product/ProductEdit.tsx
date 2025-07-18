import React, { useState, useEffect } from "react";
import { getProductById, updateProduct } from '../../services/productServices';
import type { Product } from '../../types/Product.types';
import { useParams } from "react-router-dom";



const ProductEdit: React.FC = () => {
    const [product, setProduct] = useState<Product>({
        id: "",
        name: "",
        price: 0,
        description: "",
        imgUrl: "",
        quantity: 0,
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const productId = useParams().id;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(Number(productId));
                setProduct(data);
                setError('');
            } catch (err) {
                setError('Không thể tải thông tin sản phẩm');
                console.error('Lỗi khi lấy thông tin sản phẩm:', err);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: name === "price" || name === "quantity" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!window.confirm('Bạn có chắc chắn muốn lưu các thay đổi cho sản phẩm này?')) {
            return;
        }

        setSaving(true);
        setError('');
        setMessage('');

        try {
            await updateProduct(Number(productId), product);
            setMessage('Sản phẩm đã được cập nhật thành công!');
        } catch (err) {
            setError('Không thể cập nhật sản phẩm. Vui lòng thử lại!');
            console.error('Lỗi khi cập nhật sản phẩm:', err);
        } finally {
            setSaving(false);
        }
    };

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

    if (error && !product.id) {
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
                    color: '#dc3545',
                    fontSize: '18px'
                }}>
                    Lỗi: {error}
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
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{ 
                maxWidth: '800px',
                width: '100%',
                margin: '0 auto'
            }}>
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
                        Chỉnh sửa sản phẩm
                    </h1>
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

                {/* Form Container */}
                <div style={{
                    backgroundColor: 'white',
                    padding: '32px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 300px))', gap: '48px', margin: 'auto' }}>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#2c3e50'
                                }}>
                                    Tên sản phẩm *
                                </label>
                                <input
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px 16px', 
                                        border: '2px solid #e9ecef',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        transition: 'border-color 0.3s ease',
                                        backgroundColor: '#ffffff'
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = '#007bff';
                                        e.currentTarget.style.outline = 'none';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = '#e9ecef';
                                    }}
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#2c3e50'
                                }}>
                                    Giá (VND) *
                                </label>
                                <input
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                    required
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px 16px', 
                                        border: '2px solid #e9ecef',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        transition: 'border-color 0.3s ease'
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = '#007bff';
                                        e.currentTarget.style.outline = 'none';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = '#e9ecef';
                                    }}
                                />
                            </div>

                            {/* Quantity */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#2c3e50'
                                }}>
                                    Số lượng *
                                </label>
                                <input
                                    name="quantity"
                                    value={product.quantity}
                                    onChange={handleChange}
                                    required
                                    type="number"
                                    min={0}
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px 16px', 
                                        border: '2px solid #e9ecef',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        transition: 'border-color 0.3s ease'
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = '#007bff';
                                        e.currentTarget.style.outline = 'none';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = '#e9ecef';
                                    }}
                                />
                            </div>

                            {/* Image URL */}
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#2c3e50'
                                }}>
                                    URL hình ảnh *
                                </label>
                                <input
                                    name="imgUrl"
                                    value={product.imgUrl}
                                    onChange={handleChange}
                                    required
                                    type="url"
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px 16px', 
                                        border: '2px solid #e9ecef',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        transition: 'border-color 0.3s ease'
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = '#007bff';
                                        e.currentTarget.style.outline = 'none';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = '#e9ecef';
                                    }}
                                />
                            </div>

                            {/* Description */}
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#2c3e50'
                                }}>
                                    Mô tả
                                </label>
                                <textarea
                                    name="description"
                                    value={product.description}
                                    onChange={handleChange}
                                    rows={4}
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px 16px', 
                                        border: '2px solid #e9ecef',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        transition: 'border-color 0.3s ease',
                                        resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = '#007bff';
                                        e.currentTarget.style.outline = 'none';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = '#e9ecef';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Image Preview */}
                        {product.imgUrl && (
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#2c3e50'
                                }}>
                                    Xem trước hình ảnh:
                                </label>
                                <div style={{
                                    width: '200px',
                                    height: '150px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    border: '2px solid #e9ecef'
                                }}>
                                    <img 
                                        src={product.imgUrl} 
                                        alt="Preview" 
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div style={{ 
                            display: 'flex', 
                            gap: '16px',
                            paddingTop: '24px',
                            borderTop: '1px solid #e9ecef'
                        }}>
                            <button 
                                type="submit"
                                disabled={saving}
                                style={{
                                    flex: 1,
                                    padding: '14px 24px',
                                    backgroundColor: saving ? '#6c757d' : '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: saving ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {
                                    if (!saving) {
                                        e.currentTarget.style.backgroundColor = '#218838';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (!saving) {
                                        e.currentTarget.style.backgroundColor = '#28a745';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }
                                }}
                            >
                                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                            </button>
                            
                            <button 
                                type="button"
                                onClick={() => {
                                    window.location.href = `/products/${productId}`;
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
                                Xem chi tiết
                            </button>
                        </div>

                        {message && (
                            <div style={{ 
                                marginTop: '20px',
                                padding: '12px 16px',
                                backgroundColor: '#d4edda',
                                color: '#155724',
                                border: '1px solid #c3e6cb',
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}>
                                {message}
                            </div>
                        )}
                        
                        {error && (
                            <div style={{ 
                                marginTop: '20px',
                                padding: '12px 16px',
                                backgroundColor: '#f8d7da',
                                color: '#721c24',
                                border: '1px solid #f5c6cb',
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}>
                                {error}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductEdit;
