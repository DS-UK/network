import React from "react";
import "./Connections.css";
import { ConnectionData } from "./connectionsData";

export const Connections = () => {
  return (
    <>
      <HomePageHeader />
      <div className="stock-container">
        {ConnectionData.map((data, key) => {
          return (
            <div key={key}>
              <Connection
                key={key}
                Name={data.Name}
                PSID={data.PSID}
                Count={data.Count}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

const HomePageHeader = () => {
  return (
    <header className="header">
      <h2>Your Connection Frequency list</h2>
    </header>
  );
};

const Connection = ({ Name,PSID, Count}) => {
  if (!PSID) return <div />;
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <h5>{Name}</h5>
          </td>
          <td>
            <h5>{PSID}</h5>
          </td>
          <td>
            <h4>{Count}</h4>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
