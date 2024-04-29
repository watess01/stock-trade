import { useRef } from "react";
import Quagga from "@ericblade/quagga2";

interface BarcodeReaderProps {
  onDetected: (code: string) => void;
}

const BarcodeReader: React.FC<BarcodeReaderProps> = ({ onDetected }) => {
  const scannerRef = useRef(null);

  const startScanner = () => {
    if (scannerRef.current) {
      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            constraints: {
              width: { min: 640, max: 800 }, // Adjust these values
              height: { min: 480, max: 600 }, // Adjust these values
              aspectRatio: { min: 1, max: 100 },
              facingMode: "user",
            },
            target: scannerRef.current,
          },
          decoder: {
            readers: [
              "code_128_reader",
              "ean_reader",
              "ean_8_reader",
              "code_39_reader",
              "code_39_vin_reader",
              "codabar_reader",
              "upc_reader",
              "upc_e_reader",
              "i2of5_reader",
            ],
          },
        },
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected((result) => {
        if (result && result.codeResult) {
          if (result.codeResult.code?.length === 13) {
            console.log(`Code ${result.codeResult.code} found!`);
            onDetected(result.codeResult.code);
            Quagga.stop();
          }
        }
      });
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", border: "1px solid blue" }}>
      <div ref={scannerRef} style={{ border: "1px solid red" }} />
      <div>
        <button onClick={startScanner}>Start Scanner</button>
      </div>
    </div>
  );
};

export default BarcodeReader;
