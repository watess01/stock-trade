// react component
// with text input and button
// button will call the function onButtonClick which will send contents of the text input to the server

import { useRef, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { DvdInterface, DvdServiceInterface } from "../model/DvdInterface";
import BarcodeReader from "./BarcodeReader";
import { dvdSearch } from "../services/MyDvd";

export const DvdComponent = () => {
  const barcodeRef = useRef<HTMLInputElement>(null);
  const defaultData: DvdServiceInterface = {
    found: false,
    data: {} as DvdInterface,
  };

  const [serviceData, setResult] = useState<DvdServiceInterface>(defaultData);
  const [isReadOnly, setIsReadOnly] = useState(true);

  function setBarcode(barcode: string) {
    setField({ barcode: barcode });
  }

  function setField({
    barcode,
    description,
    format,
    title,
    id,
  }: {
    barcode?: string;
    description?: string;
    format?: string;
    title?: string;
    id?: string;
  }) {
    setResult({
      ...serviceData,
      data: serviceData.data
        ? {
            ...serviceData.data,
            barcode: barcode || serviceData.data.barcode,
            description: description || serviceData.data.description,
            format: format || serviceData.data.format,
            title: title || serviceData.data.title,
            id: id || serviceData.data.id,
            // inStock: serviceData.data.inStock,
          }
        : undefined,
    });
  }

  const onCheckClick = async () => {
    if (!serviceData.data?.barcode && barcodeRef.current) {
      setField({ barcode: barcodeRef.current?.value });
    }
    if (!serviceData.data?.barcode) {
      console.log("dvdComponent.onButtonClick: Barcode is empty");
      return;
    }
    console.log(`dvdComponent.onButtonClick: ${serviceData?.data?.barcode}`);

    const ret = (await dvdSearch(
      serviceData.data?.barcode
    )) as DvdServiceInterface;

    console.log(`dvdComponent found: ${ret.found}`);

    console.log(`ret: ${JSON.stringify(ret)}`);
    console.log(`ret.data: ${JSON.stringify(ret.data)}`);
    if (ret.data) {
      // output the result data type
      console.log(`ret.data type: ${typeof ret.data}`);
      console.log(`ret.data: ${ret.data}`);

      console.log(`dvdComponent.Title: ${ret.data.title}`);

      // const data = ret.data as DvdInterface;
      console.log(`dvdComponent.onButtonClick.ret: ${JSON.stringify(ret)}`);
    } else {
      console.log(`dvdComponent.onButtonClick: No data`);
      ret.found = false;
      ret!.data = {
        id: "",
        barcode: serviceData.data?.barcode,
        title: "",
        description: "",
        format: "",
        inStock: false,
      };
    }
    setIsReadOnly(ret.found);

    // setBarcode(ret.data.barcode);
    setResult(ret);
  };

  const onBuyClick = async () => {};
  const onSellClick = async () => {};

  const getTextClass = () => {
    return serviceData?.found ? "readonly-text" : "input-text";
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <div
        style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}
      >
        <BarcodeReader onDetected={setBarcode} />
      </div>
      <div>
        <div>
          <TextField
            className="input-text"
            inputRef={barcodeRef}
            label="Barcode"
            InputProps={{ readOnly: false }}
            InputLabelProps={{ shrink: true }}
            value={serviceData.data ? serviceData.data?.barcode : ""}
            onChange={(e) => setField({ barcode: e.target.value })}
            // variant="outlined"
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={onCheckClick}
            className="button-style"
          >
            Check
          </Button>
          <Button
            onClick={onBuyClick}
            variant="contained"
            color="primary"
            className="button-style"
          >
            Buy
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onSellClick}
            className="button-style"
          >
            Sell
          </Button>
        </div>
      </div>
      <div>
        <div>
          <TextField
            className={getTextClass()}
            InputProps={{ readOnly: isReadOnly }}
            InputLabelProps={{ shrink: true }}
            label="Title"
            fullWidth
            onChange={(e) => setField({ title: e.target.value })}
            value={serviceData.data ? serviceData.data?.title : ""}
          />
        </div>
        <div style={{ textAlign: "left" }}>
          <TextField
            label="Status"
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }}
            value={
              serviceData.data && serviceData.data?.id
                ? serviceData?.found
                  ? "Owned"
                  : "Not Owned"
                : ""
            }
          />
        </div>
        <div style={{ textAlign: "left" }}>
          <TextField
            className={getTextClass()}
            InputProps={{ readOnly: isReadOnly }}
            InputLabelProps={{ shrink: true }}
            label="Format"
            onChange={(e) => setField({ format: e.target.value })}
            value={serviceData.data ? serviceData.data?.format : ""}
          />
          {/* </div>
        <div style={{ textAlign: "left" }}> */}
          <TextField
            className={getTextClass()}
            InputProps={{ readOnly: isReadOnly }}
            InputLabelProps={{ shrink: true }}
            label="InStock"
            value={
              serviceData.data && serviceData.data?.id
                ? serviceData?.found
                  ? "In Stock"
                  : "Out of Stock"
                : ""
            }
          />
        </div>
        <div>
          <TextField
            className={getTextClass()}
            InputProps={{ readOnly: isReadOnly }}
            InputLabelProps={{ shrink: true }}
            label="Description"
            multiline={true}
            onChange={(e) => setField({ description: e.target.value })}
            value={serviceData.data ? serviceData.data?.description : ""}
            fullWidth
            minRows={4}
            maxRows={6}
          />
        </div>
      </div>
    </div>
  );
};
