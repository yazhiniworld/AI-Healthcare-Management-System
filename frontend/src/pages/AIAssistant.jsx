function AIAssistant() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>AI Health Assistant</h1>

      <textarea
        placeholder="Ask a medical question..."
        rows="8"
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px"
        }}
      />

      <br /><br />

      <button
        style={{
          padding: "12px 25px",
          border: "none",
          borderRadius: "10px",
          background: "#2563eb",
          color: "white"
        }}
      >
        Ask AI
      </button>
    </div>
  );
}

export default AIAssistant;