import './Mouse.css';

export default function Mouse({position}: any) {
  return (
    <div className="mouse" style={{
      left: position.col*10 + 2,
      top: position.line*10 + 2
    }}></div>
  )
}