const Total = ({ number }) => {
    return (
        <div>
            <ul>
                <b>total of {number.parts.reduce((a, b) => a + b.exercises, 0)} exercises</b>
                </ul>
        </div>
    )
}

export default Total