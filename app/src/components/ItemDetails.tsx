// react component
// with text input and button
// button will call the function onButtonClick which will send contents of the text input to the server

import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { dvdSearch } from "../services/MyDvd";
import { DvdInterface, DvdServiceInterface } from "../model/DvdInterface";

import BarcodeReader from "./BarcodeReader";

export const DvdComponent = () => {
  const defaultData: DvdServiceInterface = {
    found: false,
    data: {} as DvdInterface,
  };

  const [serviceData, setResult] = useState<DvdServiceInterface>(defaultData);
  const [barcode, setBarcode] = useState<string | null>("");
  const [description, setDescription] = useState<string | null>("");
  const [title, setTitle] = useState<string>("");
  const [format, setFormat] = useState<string | null>("");

  const onButtonClick = async () => {
    if (!barcode) {
      console.log("dvdComponent.onButtonClick: Barcode is empty");
      return;
    }
    console.log(`dvdComponent.onButtonClick: ${serviceData?.data?.barcode}`);

    const ret = (await dvdSearch(barcode)) as DvdServiceInterface;

    console.log(`dvdComponent.onButtonClick: ${ret}`);

    if (ret?.found && ret.data) {
      const data = ret.data as DvdInterface;
      console.log(`dvdComponent.onButtonClick.Data: ${JSON.stringify(data)}`);
      setIsReadOnly(true);
    } else {
      ret.found = false;
      ret!.data = {
        id: "",
        barcode: barcode,
        title: title,
        description: "",
        format: "",
        inStock: false,
      };
      setIsReadOnly(false);
    }
    setResult(ret);
    // toggleReadOnly();
  };
  const [isReadOnly, setIsReadOnly] = useState(true);

  const toggleReadOnly = () => {
    // setIsReadOnly(!isReadOnly);
    var state = false;
    if (serviceData) {
      console.log("chkIsFound: serviceData has data");
      if (serviceData?.found) {
        console.log("chkIsFound: serviceData?.found = %s", serviceData?.found);
        state = true;
      }
    }
    console.log("Set isReadOnly = %s", state ? "true" : "false");

    setIsReadOnly(state);
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <div>
        <TextField
          label="Description"
          InputProps={{
            readOnly: isReadOnly,
          }}
          // className={serviceData?.found ? "readonly-text" : "input-text"}
        />
        <button onClick={toggleReadOnly}>Edit</button>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}
      >
        <BarcodeReader onDetected={setBarcode} />
      </div>
      <div>
        <div>
          <TextField
            className="input-text"
            label="Barcode"
            InputProps={{ readOnly: false }}
            value={barcode || ""}
            onChange={(e) => setBarcode(e.target.value)}
            variant="outlined"
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={onButtonClick}
            className="button-style"
          >
            Check
          </Button>
          <Button
            onClick={onButtonClick}
            variant="contained"
            color="primary"
            className="button-style"
          >
            Buy
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onButtonClick}
            className="button-style"
          >
            Sell
          </Button>
        </div>
      </div>
      <div>
        <div>
          <TextField
            label="Title"
            // value={serviceData?.data?.title}
            InputProps={{
              readOnly: isReadOnly,
            }}
            // InputLabelProps={{ shrink: true }}
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Status"
            value={serviceData?.found ? "Found" : "Not Found"}
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div>
          <TextField
            label="Format"
            value={serviceData?.data?.format}
            InputProps={{ readOnly: isReadOnly }}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setFormat(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Description"
            value={serviceData?.data?.description}
            className={serviceData?.found ? "readonly-text" : "input-text"}
            multiline={true}
            InputProps={{
              readOnly: serviceData?.found,
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth
            minRows={4}
            maxRows={6}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
