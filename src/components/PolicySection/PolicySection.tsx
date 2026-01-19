import React from 'react';
import { policyList } from './PolicySectionData';
import './PolicySection.css';

const PolicySection = () => {
    return (
        <div className="policy-wrapper">
            <div className="policy-container">
                <div className="policy-grid">
                    {policyList.map((item) => (
                        <div key={item.id} className="policy-item">
                            <div className="policy-icon-box">
                                <img src={item.icon} alt={item.title} loading="lazy" />
                            </div>
                            <div className="policy-content">
                                <p className="policy-title">{item.title}</p>
                                <p className="policy-desc">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PolicySection;