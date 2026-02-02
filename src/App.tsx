// import { Accordion } from "./components/Accordion";
// import { Content } from "./components/Content";
import GuessNumberGame from "./components/Game";
// import { GuessNumberRange } from "./components/GuessNumberRange";
// import { Header } from "./components/Header";
// import { Parent } from "./components/level5/Parent";
// import Card from "./components/level6/Card";
// import { LoginForm } from "./components/LoginForm";
// import { Model } from "./components/Modal";
// import { FocusInput } from "./FocusInput";
// import { ReactMount } from "./ReactMount";
// import { TabExample } from "./TabExample";
// import { UserList } from "./UserList";

function App() {

  return (
    <>
    <GuessNumberGame />
    {/* <GuessNumberRange /> */}
    {/* <Model>
      <Model.Toggle>Open Model</Model.Toggle>
      <Model.Content>
        <div style={{width:"200px", height:'200px', background:'red'}}>hello</div>
      </Model.Content>
    </Model> */}
      {/* <LoginForm submit={handleFormSubmit}>
        <LoginForm.Input name="username" label="Username:" />
        <LoginForm.Input name="password" label="Password:" type="password" />
        <LoginForm.Input name="email" label="Email:" type="email" />
        <LoginForm.Submit>Login</LoginForm.Submit>
      </LoginForm> */}
      {/* <Accordion>
        <Accordion.Item index={0}>
          <Accordion.Header index={0}>Section 1</Accordion.Header>
          <Accordion.Body index={0}>Content for section 1</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item index={1}>
          <Accordion.Header index={1}>Section 2</Accordion.Header>
          <Accordion.Body index={1}>Content for section 2</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item index={2}>
          <Accordion.Header index={2}>Section 3</Accordion.Header>
          <Accordion.Body index={2}>Content for section 3</Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
      {/* <Card>
        <Card.Header>
          <Header />
          <TabExample />
        </Card.Header>
        <Card.Body>
          <Content />
        </Card.Body>
        <Card.Footer>Actions.</Card.Footer>
      </Card>
      <Parent />

      <UserList />
      <FocusInput /> */}
      {/* <ReactMount /> */}
    </>
  );
}

export default App;
