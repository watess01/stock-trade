import { DvdInterface, DvdServiceInterface } from "../model/DvdInterface";

export async function dvdSearch(barcode: string): Promise<DvdServiceInterface> {
  try {
    console.log(`\n=========== dvdSearch.barcode:${barcode} ===========\n`);
    const response = await fetch(`http://localhost:3200/dvd/${barcode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const ret = await response.text(); // Get the response text

    console.log(`dvdSearch.ret...`);
    if (ret) {
      console.log(`dvdSearch.ret 1:${ret}`);
      const retData = JSON.parse(ret);
      console.log(`dvdSearch.ret.found 2:${retData.found}`);
      if (retData) {
        return retData as DvdServiceInterface;
      } else {
        console.log(`dvdSearch.retData: is empty`);
        return {
          found: false,
          message: "Not found",
        };
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
    return {
      found: false,
      message: "Server Error",
    };
  }
  return {
    found: false,
    message: "DVD Not Found",
  };
}
