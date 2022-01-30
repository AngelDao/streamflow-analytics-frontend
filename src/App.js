import React, { useState, useEffect } from "react";
import { DataProvider } from "./context/dataContext";
import { data } from "./testData";
import truncateAddress from "./utils/handleAdress";

import axios from "axios";

const nameMap = {
  unique_tokens: "# of Unique Tokens Streamed",
  streams_created: "# Total Streams Created",
  active_streams: "# Active Streams",
  value_sent: "Total Value Sent",
  value_locked: "Total Value Locked",
};

function App() {
  // const [data, setData] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     if (!data) {
  //       console.log("yo");
  //       const res = await axios.get("http://localhost:8080/query");
  //       console.log(res.data);
  //       setData(res.data);
  //     }
  //   })();
  // });

  // const credentials = {
  //   data,
  //   setData,
  // };
  console.log(data);
  return (
    <DataProvider>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
          marginTop: "20px",
          marginBottom: "60px",
        }}
      >
        <div>Streamflow Metrics</div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            width: "400px",
            height: "450px",
            border: "2px solid black",
            boxShadow: "-7px 7px 0px 0px rgba(0,0,0,1)",
            padding: "10px 30px",
            fontSize: "20px",
            display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ marginBottom: "40px", fontSize: "24px" }}>
            Protocol Data
          </div>
          {data &&
            data.data.map((e, i) => {
              return (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    marginTop: i !== 0 && "60px",
                  }}
                >
                  <div style={{ width: "375px" }}>{nameMap[e.target]}</div>
                  <div>{parseInt(e.datapoints[0])}</div>
                </div>
              );
            })}
        </div>
        <div
          style={{
            width: "650px",
            height: "450px",
            border: "2px solid black",
            boxShadow: "-7px 7px 0px 0px rgba(0,0,0,1)",
            padding: "10px 30px",
            fontSize: "15px",
            display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
            flexDirection: "column",
            overflowY: "scroll",
          }}
        >
          <div style={{ marginBottom: "10px", fontSize: "24px" }}>
            Token Data
          </div>
          <table
            style={{
              textAlign: "left",
              width: "100%",
              borderSpacing: "20px 0px",
            }}
          >
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Mint</th>
              <th># of Streams</th>
              <th>Price</th>
              <th>Value</th>
            </tr>
            {data &&
              Object.entries(data.token_data)
                .sort((a, b) => {
                  const [akey, avalue] = a;
                  const [bkey, bvalue] = b;
                  const atotal = parseInt(
                    (avalue.amount_sent / Math.pow(10, avalue.decimals)) *
                      avalue.price
                  );
                  const btotal = parseInt(
                    (bvalue.amount_sent / Math.pow(10, bvalue.decimals)) *
                      bvalue.price
                  );
                  return btotal - atotal;
                })
                .map((e, i) => {
                  const [key, value] = e;
                  return (
                    <>
                      <tr>
                        <td>{value.name}</td>
                        <td>{value.symbol}</td>
                        <td>
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href={`https://solscan.io/token/${key}`}
                          >
                            {truncateAddress(key)}
                          </a>
                        </td>
                        <td>{value.amount_of_streams}</td>
                        <td>${value.price}</td>
                        <td>
                          $
                          {parseInt(
                            (value.amount_sent / Math.pow(10, value.decimals)) *
                              value.price
                          )}
                        </td>
                      </tr>
                    </>
                  );
                })}
          </table>
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
