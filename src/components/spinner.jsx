import SpinnerGif from "../assets/Spinner.gif";

function Spinner() {
    return (
        <>
            <img src={SpinnerGif} alt="Loading"
                className="d-block m-auto"
                style={{ width: "200px" }} />
        </>
    )
}

export default Spinner;