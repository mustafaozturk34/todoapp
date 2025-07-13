import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import HomePage from './pages/HomePage';
import AddTaskPage from './pages/AddTaskPage';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CalendarPage from './pages/CalenderPage';

function App() {
  return (
    <TaskProvider>
      <Router>
        {/* Navbar moved outside the Container */}
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4" style={{width: '100vw'}}>
          <Container> {/* Add a Container *inside* the Navbar for branding and links */}
            <Navbar.Brand as={Link} to="/">⛓️ Zinciri Kırma</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Anasayfa</Nav.Link>
                <Nav.Link as={Link} to="/add-task">Task Ekle</Nav.Link>
                <Nav.Link as={Link} to="/calendar">Takvim</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* The main content remains within its own Container */}
        <Container>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add-task" element={<AddTaskPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
            </Routes>
          </main>
        </Container>
      </Router>
    </TaskProvider>
  );
}

export default App;