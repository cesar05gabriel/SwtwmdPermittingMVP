import { XMLParser } from "fast-xml-parser";

const USPS_USERID = process.env.USPS_USERID!;

export async function validateAddressWithUSPS(input: {
  address: string;
  city: string;
  state: string;
  zip: string;
}) {

  const xml = `
    <AddressValidateRequest USERID="${USPS_USERID}">
      <Revision>1</Revision>
      <Address ID="0">
        <Address1></Address1>
        <Address2>${input.address}</Address2>
        <City>${input.city}</City>
        <State>${input.state}</State>
        <Zip5>${input.zip}</Zip5>
        <Zip4></Zip4>
      </Address>
    </AddressValidateRequest>
  `.trim();

  const encodedXML = encodeURIComponent(xml);

  const url = `https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=${encodedXML}`;

  const response = await fetch(url);
  const xmlText = await response.text();

  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(xmlText);

  const result = parsed.AddressValidateResponse.Address;

  if (result.Error) {
    return {
      success: false,
      reason: result.Error.Description ?? "Unknown USPS error",
    };
  }

  const dpv = result.DPVConfirmation;

  if (dpv !== "Y") {
    return {
      success: false,
      reason: "Address is not deliverable (DPV not Y)",
    };
  }

  return {
    success: true,
    validatedAddress: {
      street: result.Address2,
      city: result.City,
      state: result.State,
      zip: result.Zip5,
    },
  };
}

