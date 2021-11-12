import React from "react";

export default function Legends() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        padding: 10,
        marginRight: 24
      }}
    >
      <div>
        <div style={{ fontWeight: "bold" }}>Links</div>
        <div
          style={{ display: "flex", alignItems: "center", paddingBottom: 6 }}
        >
          <div
            style={{
              width: 20,
              height: 3,
              backgroundColor: "DodgerBlue",
              marginRight: 4
            }}
          />
          <span>Hackathon </span>
        </div>

          <div
              style={{ display: "flex", alignItems: "center", paddingBottom: 6 }}
          >
              <div
                  style={{
                      width: 20,
                      height: 3,
                      backgroundColor: "#f7e8be",
                      marginRight: 4
                  }}
              />
              <span>EEP28 </span>
          </div>

          <div
              style={{ display: "flex", alignItems: "center", paddingBottom: 6 }}
          >
              <div
                  style={{
                      width: 20,
                      height: 3,
                      backgroundColor: "orange",
                      marginRight: 4
                  }}
              />
              <span>EEP31 </span>
          </div>

          <div
              style={{ display: "flex", alignItems: "center", paddingBottom: 6 }}
          >
              <div
                  style={{
                      width: 20,
                      height: 3,
                      backgroundColor: "pink",
                      marginRight: 4
                  }}
              />
              <span>project team </span>
          </div>
      </div>
      <div style={{ marginLeft: 24 }}>
        <div style={{ fontWeight: "bold" }}>Nodes</div>
        <div
          style={{ display: "flex", alignItems: "center", paddingBottom: 6 }}
        >
          <div
            style={{
              width: 15,
              height: 15,
              borderRadius: "50%",
              backgroundColor: "#437D00",
              marginRight: 4
            }}
          />
          <span>online</span>
        </div>

          <div
              style={{ display: "flex", alignItems: "center", paddingBottom: 6 }}
          >
              <div
                  style={{
                      width: 15,
                      height: 15,
                      borderRadius: "50%",
                      backgroundColor: "grey",
                      marginRight: 4
                  }}
              />
              <span>offline</span>
          </div>
      </div>
    </div>
  );
}
