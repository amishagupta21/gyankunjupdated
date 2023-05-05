import { useState } from "react";
import assignmentContext from "./AssignmentContext";

const AssignmentState = (props) => {

    const [state, setState] = useState("Test from useContext")

    return (
        <assignmentContext.Provider value={state}>
            {props.children}
        </assignmentContext.Provider>
    )

}

export default AssignmentState;