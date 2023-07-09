import '../styles/main-styles.css'


const ExtraTopHeader = ({ eHeaderAd }) => {

    const locateUs = () => {
        console.log('Locating nearby store!!');
    }
    const getApp = () => {
        console.log('redirecting to app download page!!');
    }
    const trackOrder = () => {
        console.log('redirecting to tracking page!!');
    }
    const eHeaderAdClick = () => {
        console.log('redirecting to eHeaderAd!!');
    }
    const loyality = () => {
        console.log('loyality dunction is called!!');
    }

    return (
        <>
            <div className='eh-container' id='eh-container'>
                <div className='eh-left' >
                    <div className='eh-store-locator' onClick={e => locateUs()}>
                        <i className='fa fa-map-marker' ></i>
                        <span>Locate Us</span>
                    </div>
                    <span className='eh-separator'>|</span>
                    <div className='eh-get-app' onClick={e => getApp()}>
                        <i className='fa fa-arrow-down' aria-hidden='true'></i>
                        <span>Get App</span>
                    </div>
                    <span className='eh-separator'>|</span>
                </div>
                <div className='eh-middle' onClick={e => eHeaderAdClick()}>
                    <span>
                        {eHeaderAd ? <p>{eHeaderAd}</p> : 'Extra 10% off on a buy of Rs.1999 | Code: ALL10'}
                    </span>
                </div>
                <div className='eh-right'>
                    <span className='eh-separator'>|</span>
                    <div className='eh-track-order' onClick={e => trackOrder()}>
                        <i className='fa fa-truck' aria-hidden='true'></i>
                        <span>Track Order</span>
                    </div>
                    <span className='eh-separator'>|</span>
                    <div className='eh-loyality' onClick={e => loyality()}>
                        <i className='fa fa-glass' aria-hidden='true'></i>
                        <span>Loyality</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ExtraTopHeader;