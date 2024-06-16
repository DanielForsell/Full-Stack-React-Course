const Total = ({ number }) => {
    return (
        <div>
            <ul>total of {number.parts.reduce((a, b) => a + b.exercises, 0)} exercises</ul>
        </div>
    )
}

export default Total