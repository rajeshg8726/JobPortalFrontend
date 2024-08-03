import React from 'react'
import './Stylesheet.css';


const Slider = () => {
    return (
        <div className='container'  >
            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src={`${process.env.PUBLIC_URL}/images/j2.jpeg`} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Jobs Hiring</h5>
                                {/* <p>Some representative placeholder content for the first slide.</p> */}
                            </div>
                            
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src={`${process.env.PUBLIC_URL}/images/j1.jpg`} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Find Your Suitable Jobs</h5>
                                {/* <p>Some representative placeholder content for the second slide.</p> */}
                            </div>
                    </div>
                   
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </div>
    )
}

export default Slider