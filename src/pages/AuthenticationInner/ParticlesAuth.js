import React from 'react';
import withRouter from '../../Components/Common/withRouter';

const ParticlesAuth = ({ children }) => {
    return (
        <React.Fragment>
            <div className="auth-page-wrapper " >
                
                {/* pass the children */}
                {children}

                {/* <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center">
                                    <p className="mb-0 text-muted">&copy; {new Date().getFullYear()} AI ENHANCE.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer> */}
            </div>
        </React.Fragment>
    );
};

export default withRouter(ParticlesAuth);