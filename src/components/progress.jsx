import loadingImage from '../images/loading_animation.gif'


const Progress = (props) => {
    return (
        <>
            {
                props.display &&
                <>
                    <div className="loader-bg"></div>
                    <div className="loader-container">
                        <img src={loadingImage} height={"50px"} width={"50px"} alt="Loader" />
                    </div>
                </>
            }
        </>
    );
}

export default Progress;