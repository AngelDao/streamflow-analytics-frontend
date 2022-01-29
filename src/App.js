import React, { useState, useEffect } from "react";
import { DataProvider } from "./context/dataContext";

import axios from "axios";

const nameMap = {
  unique_tokens: "# of Unique Tokens Streamed",
  streams_created: "# Total Streams Created",
  active_streams: "# Active Streams",
  value_sent: "Total Value Sent",
  value_locked: "Total Value Locked",
};

function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    (async () => {
      if (!data) {
        console.log("yo");
        const res = await axios.get("http://localhost:8080/query");
        console.log(res.data);
        setData(res.data.data);
      }
    })();
  });
  const credentials = {
    data,
    setData,
  };
  return (
    <DataProvider value={credentials}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
          marginTop: "20px",
        }}
      >
        <div>Streamflow Metrics</div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            width: "500px",
            height: "400px",
            border: "2px solid black",
            boxShadow: "-7px 7px 0px 0px rgba(0,0,0,1)",
            padding: "30px",
            fontSize: "20px",
            display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {data &&
            data.map((e, i) => {
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
          {/* <div style={{ width: "100%", display: "flex", marginTop: "10px" }}>
            <div style={{ width: "250px" }}>Total Value Sent:</div>
            <div>20,000,000</div>
          </div> */}
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
