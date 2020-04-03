import React from "react";
import "./App.css";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

interface DataRocket {
  type: string;
  name: string;
}
interface Rocket {
  id: string;
  rocket: DataRocket;
  site: string;
}

const App: React.FC = () => {
  const GET_ROCKET = gql`
    query LaunchedRocket {
      launches(pageSize: 10, after: "10") {
        launches {
          id
          site
          rocket {
            name
            type
          }
        }
      }
    }
  `;

  const { loading, data } = useQuery(GET_ROCKET);

  return (
    <>
      <h1>Rockets data for 10 elements</h1>
      <div className="main">
        <div className="launches">
          {loading
            ? "Loading..."
            : data &&
              data.launches.launches.map(({ site, rocket, id }: Rocket) => {
                return (
                  <div className="block" key={id}>
                    <div>
                      <strong>Site:</strong> <i>{site}</i>
                    </div>

                    <hr />

                    <div>
                      <strong>Rocket:</strong>
                      <div>name: {rocket.name}</div>
                      <div>type: {rocket.type}</div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default App;
