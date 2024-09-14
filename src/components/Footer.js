import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <footer className="small text-white text-center py-4">
            <div className="container">
                <p className="mb-0">
                    Made with <span role="img" aria-label="love">❤️</span> by{' '}
                    <a href="https://ajuroshan.me" className="text-white" target="_blank" rel="noopener noreferrer">
                        ajuroshan
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
