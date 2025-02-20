import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const SwapForm = () => {
  const [currencies, setCurrencies] = useState([]);
  const [prices, setPrices] = useState({});
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("https://interview.switcheo.com/prices.json");
        const data = await response.json();
        const uniqueCurrencies = [...new Set(data.map((item) => item.currency))];
        const priceMap = {};
        data.forEach((item) => {
          if (!priceMap[item.currency]) {
            priceMap[item.currency] = item.price;
          }
        });
        setCurrencies(uniqueCurrencies);
        setPrices(priceMap);
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };
    fetchPrices();
  }, []);

  const handleSwap = () => {
    if (!fromCurrency || !toCurrency || !amount || isNaN(amount)) {
      alert("Vui lòng nhập số tiền hợp lệ và chọn đơn vị tiền tệ.");
      return;
    }
    if (!prices[fromCurrency] || !prices[toCurrency]) {
      alert("Không thể lấy dữ liệu giá cho đơn vị tiền tệ này.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const convertedAmount = (amount * prices[fromCurrency]) / prices[toCurrency];
      setResult(convertedAmount.toFixed(6));
      setLoading(false);
    }, 1000);
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", padding: 2, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Currency Swap
        </Typography>
        <Select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          fullWidth
          displayEmpty
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>
            Chọn tiền tệ nguồn
          </MenuItem>
          {currencies.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          fullWidth
          displayEmpty
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>
            Chọn tiền tệ đích
          </MenuItem>
          {currencies.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Số lượng"
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSwap}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Swap"}
        </Button>

        {result !== null && (
          <Typography variant="h6" sx={{ mt: 2 }}>
            Kết quả: {result} {toCurrency}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default SwapForm;
