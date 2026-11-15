import { useStatistics } from "../store/useStatisticsStore"


const Statistics = () => {
  const { good , neutral, bad } = useStatistics()
  const all = good + neutral + bad

  
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{good + neutral + bad}</td></tr>
          <tr><td>average</td><td>{all === 0 ? 0 : (good - bad) / (all)}</td></tr>
          <tr><td>positive</td><td>{all === 0 ? 0 :(good / (all)) * 100 } %</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
