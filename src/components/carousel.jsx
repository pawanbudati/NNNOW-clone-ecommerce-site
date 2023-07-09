import Carousel from 'react-bootstrap/Carousel';

function CarouselComponent({ carouselOfferLinkes, width, defaultCarouselInterval }) {
    return (
        <div style={{ display: 'block', width: width, padding: 10 }}>
            <Carousel >
                {carouselOfferLinkes.map(item =>
                    <Carousel.Item interval={defaultCarouselInterval || 1000} key={item[0]}>
                        <a href={item[1]}>
                            <img
                                className='d-block w-100'
                                src={item[0]}
                                alt='offer'
                            />
                        </a>
                    </Carousel.Item>
                )}
            </Carousel>
        </div>
    );
}

export default CarouselComponent;

