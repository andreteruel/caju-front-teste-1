import Router from "~/router";
import { Header } from "./components/Header";
import ContainerToast from "./components/Toast";

function App() {
  return (
    <>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <ContainerToast />
      <Router />
    </>
  );
}

export default App;
