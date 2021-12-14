import './Pixel.css';

interface PixelParamsType {
  snake?: boolean;
}

export default function Pixel({snake}: PixelParamsType) {
  return (
    <div className={`pixel${snake ? ' snake' : ''}`}></div>
  )
}