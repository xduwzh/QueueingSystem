import SignupList from "../components/SignupList"
import SignupForm from "../components/SignupForm"
import SubstituteList from "../components/SubstituteList"

const Home = () => {
  return (
    <div>
      <h1>周五羽毛球接龙</h1>
      <SignupForm />
      <SignupList />
      <SubstituteList />
    </div>
  )
}

export default Home
