const UsefulLinks = ({ usefulLinks }) => {
    return (<>
        <div className='u-links'>
            <center>
                <h3>USEFUL LINKS</h3>
                {
                    usefulLinks.map(
                        link => (<a href={link[1]} key={link[0]}>{link[0]} <br /></a>)
                    )
                }
                <br />
                <hr />
                <br />
                <img width={250} src='https://logan.nnnow.com/content/dam/nnnow-project/16-dec-2022/hp/18DE22-CK-HP-TOPSMALL.jpg' alt='offer page' />
            </center>
        </div>
    </>);
}

export default UsefulLinks;

