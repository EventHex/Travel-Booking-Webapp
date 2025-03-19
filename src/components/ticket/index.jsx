import styled from "styled-components";
const Container = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: red;
  display: flex;
`

const First = styled.div`
width: 30%;
  
`
const Second = styled.div`
width: 30%;
  
  
`
const Third = styled.div`
width: 30%;
  
`
export default function App() {
  return <Container >
  <First>
    <h2>SHARIEFA VALIYAKATH 
    CHERIYAMALIYAKKAL</h2>
    <div>
      <p>Submitted on:   <span>Feb 19, 2025</span> </p>
      <p>Submitted at:       <span>11:14 AM </span> </p>
      <p>Passport Number:  <span>V7672497</span> </p>

    </div>
  </First>



  <Second></Second>
  <Third></Third>
  </Container>;
}
