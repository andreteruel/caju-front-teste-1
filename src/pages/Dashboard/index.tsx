import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useEffect, useState } from "react";
import { getRegistrations, Registration } from "~/services/registrations";
import { LoadingSpinner } from "~/components/Loading";

const DashboardPage = () => {
  const [registrations, setRegistrations ] = useState<Registration[]>();
  const [searchCpf, setSearchCpf ] = useState('');
  const [loading, setLoading ] = useState(true);

  const loadRegistrations = async () =>{
    setLoading(true);
    const response = await getRegistrations(searchCpf);
    setRegistrations(response);
    setLoading(false);
  }

  useEffect(() => {
    loadRegistrations();
  }, [searchCpf])

  return (
    <>
      {loading && <LoadingSpinner />}
      <S.Container>
        <SearchBar loadRegistrations={loadRegistrations} setSearchCpf={setSearchCpf} />
        <Collumns registrations={registrations} setLoading={setLoading} loadRegistrations={loadRegistrations} />
      </S.Container>
    </>
  );
};

export default DashboardPage;
