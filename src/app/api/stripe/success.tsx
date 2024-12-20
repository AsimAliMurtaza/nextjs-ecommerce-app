import React from 'react';

const SuccessPage: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Payment Successful!</h1>
            <p>Thank you for your purchase. Your payment has been processed successfully.</p>
            <a href="/">Go back to Home</a>
        </div>
    );
};

export default SuccessPage;