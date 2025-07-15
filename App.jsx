import React, { useEffect, useState } from "react";
import { Table, Input, Modal, Image, Tag } from "antd";
import "./App.css";

const { Search } = Input;

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,subregion,area,population,timezones,cca3,independent"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          console.error("Unexpected data format:", data);
          setCountries([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch countries:", err.message);
      });
  }, []);

  const filtered = Array.isArray(countries)
    ? countries.filter((country) =>
        (country.name.common + (country.capital?.[0] || ""))
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];

  const columns = [
    {
      title: "Flag",
      dataIndex: "flag",
      key: "flag",
      render: (_, record) => (
        <Image width={30} src={record.flags.png} alt="flag" />
      ),
    },
    {
      title: "Name",
      dataIndex: ["name", "common"],
      key: "name",
    },
    {
      title: "Capital",
      dataIndex: "capital",
      key: "capital",
      render: (capital) => capital?.[0] || "—",
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "Independent",
      dataIndex: "independent",
      key: "independent",
      render: (value) => (
        <Tag color={value ? "green" : "red"}>{value ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Area (km²)",
      dataIndex: "area",
      key: "area",
      render: (area) => area.toLocaleString(),
    },
  ];

  return (
    <div className="app-fullscreen">
      <header className="app-header">
        <h1> World Countries Desk</h1>
        <Search
          placeholder="Search by name or capital"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={(value) => setSearch(value)}
          enterButton
          style={{ maxWidth: 400, marginTop: 10 }}
        />
      </header>

      <div className="app-table">
        <Table
          rowKey="cca3"
          columns={columns}
          dataSource={filtered}
          onRow={(record) => ({
            onClick: () => setSelected(record),
          })}
          pagination={{ pageSize: 10 }}
          bordered
        />
      </div>

      <Modal
        open={!!selected}
        onCancel={() => setSelected(null)}
        footer={null}
        title={selected?.name?.common}
      >
        {selected && (
          <div>
            <Image
              width={80}
              src={selected.flags.png}
              alt="flag"
              style={{ marginBottom: "10px" }}
            />
            <p>
              <strong>Official Name:</strong> {selected.name.official}
            </p>
            <p>
              <strong>Capital:</strong> {selected.capital?.[0] || "—"}
            </p>
            <p>
              <strong>Region:</strong> {selected.region}
            </p>
            <p>
              <strong>Subregion:</strong> {selected.subregion}
            </p>
            <p>
              <strong>Population:</strong>{" "}
              {selected.population.toLocaleString()}
            </p>
            <p>
              <strong>Area:</strong> {selected.area.toLocaleString()} km²
            </p>
            <p>
              <strong>Timezones:</strong> {selected.timezones.join(", ")}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
