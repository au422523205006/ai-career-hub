function ProgressBar({ total, done }) {
  const percent = total ? (done / total) * 100 : 0

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{
        height: "10px",
        background: "#ddd",
        borderRadius: "5px"
      }}>
        <div style={{
          width: percent + "%",
          height: "100%",
          background: "green"
        }} />
      </div>
      <p>{done} / {total} completed</p>
    </div>
  )
}

export default ProgressBar