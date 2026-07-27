import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/useRedux';
import axios from 'axios';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPanel from './pages/AdminPanel';
import AdminDashboard from './pages/AdminDashboard';
import OrdersPage from './pages/OrdersPage';
import PaymentPage from './pages/PaymentPage';
import AdminUsers from './pages/AdminUsers';

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(state => state.user.user);
  const cartItems = useAppSelector(state => state.cart.items);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <nav style={{ 
        padding: '1rem 2rem', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        marginBottom: '0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div>
            <Link to="/" style={{ 
              color: 'white', 
              textDecoration: 'none', 
              marginRight: '1.5rem',
              fontWeight: '600',
              fontSize: '1.1rem',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              🛒 ShopHub
            </Link>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Home
            </Link>
            {user?.isAdmin && (
              <>
                <Link to="/admin/dashboard" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
                  Dashboard
                </Link>
                <Link to="/admin" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
                  Products
                </Link>
                <Link to="/admin/users" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
                  Users
                </Link>
              </>
            )}
            {user && (
              <Link to="/orders" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
                Orders
              </Link>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/cart" style={{ 
              color: 'white', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            >
              🛒 Cart
              {cartItems.length > 0 && (
                <span style={{
                  background: '#ff4444',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 8px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  minWidth: '20px',
                  textAlign: 'center'
                }}>
                  {cartItems.length}
                </span>
              )}
            </Link>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ 
                  background: 'rgba(255,255,255,0.2)',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px'
                }}>
                  👤 {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  background: 'rgba(255,255,255,0.2)',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                  Login
                </Link>
                <Link to="/register" style={{ 
                  textDecoration: 'none',
                  background: 'rgba(255,255,255,0.9)',
                  color: '#667eea',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontWeight: '600',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        {user?.isAdmin && (
          <>
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </>
        )}
      </Routes>

      {/* Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 999,
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          ↑
        </button>
      )}

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '3rem 2rem 1rem',
        marginTop: '4rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>🛒 ShopHub</h3>
            <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
              Your one-stop shop for electronics, laptops, smartphones, and more. 
              Quality products at competitive prices.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>Home</Link>
              <Link to="/cart" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>Cart</Link>
              {user && <Link to="/orders" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>Orders</Link>}
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: 0.9 }}>
              <p>Mon-Sat: 9AM - 6PM</p>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Categories</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: 0.9 }}>
              <p>Electronics</p>
              <p>Laptops & Computers</p>
              <p>Smartphones</p>
              <p>Audio & Accessories</p>
            </div>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.2)',
          paddingTop: '1.5rem',
          textAlign: 'center',
          opacity: 0.8
        }}>
          <p>© 2026 ShopHub. All rights reserved. Made with ❤️ in India</p>
        </div>
      </footer>
    </div>
  );
};

export default App;