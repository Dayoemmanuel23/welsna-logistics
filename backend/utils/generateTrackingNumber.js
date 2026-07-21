import Counter from "../models/Counter.js";

const generateTrackingNumber = async () => {
  const counter = await Counter.findByIdAndUpdate(
    "shipmentTracking",
    {
      $inc: {
        sequenceValue: 1,
      },
    },
    {
      new: true,
      upsert: true,
    }
  );

  const year = new Date().getFullYear();

  const number = String(counter.sequenceValue).padStart(6, "0");

  return `WEL-${year}-${number}`;
};

export default generateTrackingNumber;