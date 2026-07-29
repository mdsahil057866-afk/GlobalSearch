import React, { useState } from 'react';
import './Login.css'; 

const LoginPage = () => {
    const [activeTab, setActiveTab] = useState('login'); // 'login' या 'signup'

    return (
        <div className="login-container">
            <div className="login-left-panel">
                <div className="brand-box">
                    <h1 className="logo-text">Global<span>Search</span></h1>
                    <p className="tagline">भारत की अपनी खोज</p>
                </div>
            </div>

            <div className="login-right-panel">
                <div className="form-box">
                    <div className="tab-switcher">
                        <button 
                            className={activeTab === 'login' ? 'active' : ''} 
                            onClick={() => setActiveTab('login')}
                        >
                            लॉगइन
                        </button>
                        <button 
                            className={activeTab === 'signup' ? 'active' : ''} 
                            onClick={() => setActiveTab('signup')}
                        >
                            साइनअप
                        </button>
                    </div>

                    {activeTab === 'login' ? (
                        <form className="input-form">
                            <h2>वापसी पर स्वागत है!</h2>
                            <div className="input-group">
                                <label>मोबाइल नंबर</label>
                                <input type="tel" placeholder="+91 9876543210" required />
                            </div>
                            <div className="input-group">
                                <label>पासवर्ड</label>
                                <input type="password" placeholder="••••••••" required />
                                <span className="forgot-link">पासवर्ड भूल गए?</span>
                            </div>
                            <button type="submit" className="submit-btn">लॉगइन करें</button>
                            <div className="divider"><span>या</span></div>
                            <button type="button" className="google-btn">Google से लॉगइन करें</button>
                        </form>
                    ) : (
                        <form className="input-form">
                            <h2>GlobalSearch से जुड़ें</h2>
                            <div className="input-group">
                                <label>पूरा नाम</label>
                                <input type="text" placeholder="राहुल कुमार" required />
                            </div>
                            <div className="input-group">
                                <label>मोबाइल नंबर</label>
                                <input type="tel" placeholder="+91 9876543210" required />
                            </div>
                            <button type="submit" className="submit-btn">खाता बनाएँ</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
