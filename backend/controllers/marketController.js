import axios from "axios";
import Market from "../models/Market.js";

const DATA_GOV_API_KEY = "579b464db66ec23bdd000001002f15a294a64c7f4bfb184c31ee0127";

// 🟢 Fetch from data.gov.in API
export const fetchMarketData = async (req, res) => {
  try {
    const { crop = "Tomato", state = "Maharashtra" } = req.query;

    const response = await axios.get(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
      {
        params: {
          "api-key": DATA_GOV_API_KEY,
          format: "json",
          limit: 10,
          "filters[commodity]": crop,
          "filters[state]": state,
        },
      }
    );

    const formattedData = response.data.records.map((item, index) => ({
      id: index + 1,
      crop: item.commodity,
      state: item.state,
      district: item.district,
      market: item.market,
      min: Number(item.min_price),
      max: Number(item.max_price),
      avg: Number(item.modal_price),
      unit: "quintal",
      createdAt: new Date(),
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("❌ Error fetching data:", error.message);
    res.status(500).json({ message: "Failed to fetch market data" });
  }
};

// 🟢 Get all saved market data
export const getAllMarkets = async (req, res) => {
  const markets = await Market.find();
  res.json(markets);
};

// 🟢 Add manually
export const addMarket = async (req, res) => {
  const market = new Market(req.body);
  await market.save();
  res.status(201).json(market);
};

// 🟢 Delete entry
export const deleteMarket = async (req, res) => {
  const { id } = req.params;
  await Market.findByIdAndDelete(id);
  res.json({ message: "Deleted successfully" });
};
