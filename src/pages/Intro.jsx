import { Link } from "react-router-dom";


const Intro = () => {
    return (
        <div>
            <h1>React Design Pattern : Part - 3</h1>
            <p>
                <b>
                    <Link to='/tasks'>
                        State Reducer Patternand &
                        Component Composition Pattern
                    </Link>
                </b>
            </p>
        </div>
    )
}


export default Intro;