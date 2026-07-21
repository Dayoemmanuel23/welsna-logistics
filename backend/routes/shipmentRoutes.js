import express from "express";

import {
  createShipment,
  getShipments,
  getShipment,
  updateShipment,
  deleteShipment,
  addTrackingHistory,
} from "../controllers/shipmentController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Shipment CRUD
|--------------------------------------------------------------------------
*/

router.post("/", createShipment);

router.get("/", getShipments);

/*
|--------------------------------------------------------------------------
| Public Tracking
|--------------------------------------------------------------------------
|
| Example:
| GET /api/shipments/WLS24000001
|
*/

router.get("/:trackingNumber", getShipment);

/*
|--------------------------------------------------------------------------
| Update Shipment
|--------------------------------------------------------------------------
*/

router.put("/:id", updateShipment);

/*
|--------------------------------------------------------------------------
| Add Tracking History
|--------------------------------------------------------------------------
|
| POST /api/shipments/:id/history
|
*/

router.post("/:id/history", addTrackingHistory);

/*
|--------------------------------------------------------------------------
| Delete Shipment
|--------------------------------------------------------------------------
*/

router.delete("/:id", deleteShipment);

export default router;