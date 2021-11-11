import React from "react";

export default function Legends() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: 24
      }}
    >
      <div>
        <div style={{ fontWeight: "bold", marginTop: -26 }}>Links</div>
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
          <span>Same Cubicle</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", paddingBottom: 6 }}
        >
          <div
            style={{
              width: 20,
              height: 3,
              backgroundColor: "#ffa08f",
              marginRight: 4
            }}
          />
          <span>Meeting</span>
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
          <span>No Impact</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", paddingBottom: 6 }}
        >
          <div
            style={{
              width: 15,
              height: 15,
              borderRadius: "50%",
              backgroundColor: "#F38E06",
              marginRight: 4
            }}
          />
          <span>Quarantined / To Be Quarantined </span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", paddingBottom: 6 }}
        >
          <div
            style={{
              width: 15,
              height: 15,
              borderRadius: "50%",
              backgroundColor: "#C70039",
              marginRight: 4
            }}
          />
          <span>COVID Impacted </span>
        </div>
      </div>
    </div>
  );
}
