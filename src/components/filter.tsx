import * as React from "react";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";

interface Instance {
  vcpu: string;
  memory: string;
  instances: [
    {
      _id: string;
      price_per_unit: number;
      instance_type: string;
      location: string;
      unit: string;
    }
  ];
}

export default function Filter() {
  const [formValues, setFormValues] = useState({
    cloudProvider: "AWS",
    region: "Europe",
    currency: "EUR",
    minCPU: "",
    maxCPU: "",
    minRAM: "",
    maxRAM: "",
  });

  const [instances, setInstances] = useState<Instance[]>([]);
  const [visibleInstances, setVisibleInstances] = useState<any>([]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const fetchInstances = async () => {
    const { minCPU, minRAM, maxCPU, maxRAM } = formValues;
    try {
      const response = await axios.get(
        `http://localhost:5020/api/products/filter`,
        {
          params: {
            minRAM,
            maxRAM,
            minCPU,
            maxCPU,
          },
        }
      );
      setInstances(response.data.data);
      //   setTotalPages(Math.ceil(response.data.totalRecords / limit));
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const handleClearFilters = () => {
    fetchInstances();
    setFormValues({
      cloudProvider: "",
      region: "",
      currency: "",
      minCPU: "",
      maxCPU: "",
      minRAM: "",
      maxRAM: "",
    });
  };

  const handleClick = () => {
    fetchInstances();
  };

  const handleShowMore = (rowIndex: number) => {
    setVisibleInstances((prevVisible) => {
      const updatedVisible = { ...prevVisible };
      const visibleCount = updatedVisible[rowIndex] || 3;
      const newVisibleCount = visibleCount + 3;

      updatedVisible[rowIndex] = newVisibleCount;

      return updatedVisible;
    });
  };

  const handleShowLess = (rowIndex: number) => {
    setVisibleInstances((prevVisible) => {
      const updatedVisible = { ...prevVisible };
      updatedVisible[rowIndex] = 3; // Show only 3 instances initially

      return updatedVisible;
    });
  };

  useEffect(() => {
    fetchInstances();
  }, []);

  return (
    <Container>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: 2,
          width: "100%",
          marginBlock: "30px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Cloud provider</InputLabel>
          <Select
            name="cloudProvider"
            value={formValues.cloudProvider}
            label="Cloud provider"
            onChange={handleSelectChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="AWS">AWS</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Region</InputLabel>
          <Select
            name="region"
            value={formValues.region}
            label="Region"
            onChange={handleSelectChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Currency</InputLabel>
          <Select
            name="currency"
            value={formValues.currency}
            label="Currency"
            onChange={handleSelectChange}
          >
            <MenuItem value="EUR">EUR</MenuItem>
          </Select>
        </FormControl>

        <TextField
          type="number"
          name="minCPU"
          label="Min CPU"
          variant="outlined"
          fullWidth
          onChange={handleInputChange}
          value={formValues.minCPU}
        />
        <TextField
          type="number"
          name="maxCPU"
          label="Max CPU"
          variant="outlined"
          fullWidth
          onChange={handleInputChange}
          value={formValues.maxCPU}
        />
        <TextField
          type="number"
          name="minRAM"
          label="Min RAM"
          variant="outlined"
          fullWidth
          onChange={handleInputChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">GiB</InputAdornment>,
          }}
          value={formValues.minRAM}
        />
        <TextField
          type="number"
          name="maxRAM"
          label="Max RAM"
          variant="outlined"
          fullWidth
          onChange={handleInputChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">GiB</InputAdornment>,
          }}
          value={formValues.maxRAM}
        />

        <Button variant="contained" onClick={handleClick}>
          Filter
        </Button>
        <Button
          variant="outlined"
          onClick={handleClearFilters}
          sx={{ color: "gray" }}
        >
          Clear Filter
        </Button>
      </Box>

      {instances.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 450 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell sortDirection="desc">CPU</TableCell>
                  <TableCell align="right">RAM</TableCell>
                  <TableCell align="right">AWS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {instances.map((instance, index) => {
                  const visibleCount = visibleInstances[index] || 3;
                  const visibleInstanceDetails = instance.instances.slice(
                    0,
                    visibleCount
                  );

                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {instance.vcpu}
                      </TableCell>
                      <TableCell align="right">{instance.memory}</TableCell>
                      <TableCell align="right">
                        {visibleInstanceDetails.map((instanceDetail) => (
                          <Box
                            key={instanceDetail._id}
                            sx={{
                              // padding: "5px",
                              // border: "1px solid #ddd",
                              marginBottom: "10px",
                            }}
                          >
                            <strong>Instance Type:</strong>{" "}
                            {instanceDetail.instance_type}
                            <br />
                            <strong>Location:</strong> {instanceDetail.location}
                            <br />
                            <strong>Price:</strong> $
                            {Number(instanceDetail.price_per_unit).toFixed(4)}{" "}
                            per {instanceDetail.unit}
                          </Box>
                        ))}
                        {visibleCount < instance.instances.length ? (
                          <Button
                            variant="text"
                            onClick={() => handleShowMore(index)}
                            // sx={{ marginTop: 1 }}
                          >
                            Show More
                          </Button>
                        ) : (
                          visibleCount > 3 && (
                            <Button
                              variant="text"
                              onClick={() => handleShowLess(index)}
                              sx={{ marginTop: 1 }}
                            >
                              Show Less
                            </Button>
                          )
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
}
