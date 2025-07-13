// src/pages/AddTaskPage.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

const AddTaskPage = () => {
  const { addTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("Sağlık");
  const [taskName, setTaskName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [frequency, setFrequency] = useState([]);
  const [price, setPrice] = useState(0);

  const handleFrequencyChange = (e) => {
    const { value, checked } = e.target;
    const dayIndex = parseInt(value);
    if (checked) {
      setFrequency([...frequency, dayIndex]);
    } else {
      setFrequency(frequency.filter((day) => day !== dayIndex));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !startDate || !endDate || frequency.length === 0) {
      alert("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }
    addTask({
      title,
      taskName,
      startDate,
      endDate,
      frequency: frequency.sort(),
      price,
    });
    navigate("/");
  };

  const daysOfWeek = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];
  const taskCategories = [
    "Sağlık",
    "Dış Görünüş",
    "Zeka",
    "Sosyal Beceri",
    "Araba",
    "Ev",
  ];

  return (
    <Card>
      <Card.Header as="h3">Yeni Bir Zincir Başlat</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="taskName">
                <Form.Label>Görev Adı</Form.Label>
                <Form.Control
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="Örn: Her gün 15 sayfa kitap oku"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="taskCategory">
                <Form.Label>Kategori (Title)</Form.Label>
                <Form.Select
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                >
                  {taskCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="startDate">
                <Form.Label>Başlangıç Tarihi</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="endDate">
                <Form.Label>Bitiş Tarihi</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Maliyet/Ödül (Opsiyonel)</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="frequency">
            <Form.Label>Tekrarlanma Sıklığı</Form.Label>
            <div>
              {daysOfWeek.map((day, index) => (
                <Form.Check
                  inline
                  key={index}
                  label={day}
                  type="checkbox"
                  value={index}
                  onChange={handleFrequencyChange}
                />
              ))}
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Task Ekle
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddTaskPage;
