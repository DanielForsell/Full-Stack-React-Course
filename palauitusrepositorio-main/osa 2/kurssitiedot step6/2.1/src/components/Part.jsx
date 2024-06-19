const Part = ({part, exercises}) => {
    console.log(part + exercises)
  
    return (
      <div>
        <p>{part} {exercises}</p>
      </div>
    )
  }

export default Part