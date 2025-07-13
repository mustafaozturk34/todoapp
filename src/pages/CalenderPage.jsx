import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { TaskContext } from '../context/TaskContext';
import { getDay, parseISO, isWithinInterval } from 'date-fns';
import { Form, Card } from 'react-bootstrap';

const CalendarPage = () => {
    const { tasks, completions } = useContext(TaskContext);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const tileClassName = ({ date, view }) => {
        if (view === 'month' && selectedTaskId) {
            const task = tasks.find(t => t.id === selectedTaskId);
            if (!task) return null;

            const isScheduled = isWithinInterval(date, { start: parseISO(task.startDate), end: parseISO(task.endDate) }) &&
                                task.frequency.includes(getDay(date));
            
            if (!isScheduled) return null;

            const dateString = date.toISOString().split('T')[0];
            const isCompleted = completions[selectedTaskId]?.includes(dateString);
            
            return isCompleted ? 'completed-day' : 'scheduled-day';
        }
        return null;
    };

    return (
        <Card>
            <Card.Header as="h3">Zincir Takvimi</Card.Header>
            <Card.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Görüntülenecek Görevi Seçin</Form.Label>
                    <Form.Select onChange={(e) => setSelectedTaskId(e.target.value)} value={selectedTaskId || ''}>
                        <option value="">-- Bir görev seçin --</option>
                        {tasks.map(task => (
                            <option key={task.id} value={task.id}>{task.taskName}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {selectedTaskId && (
                    <div className="d-flex justify-content-center">
                        <Calendar
                            className="full-year-calendar"
                            tileClassName={tileClassName}
                        />
                    </div>
                )}
                <style>{`
                    .scheduled-day {
                        background-color: #ffcccb;
                        border-radius: 50%;
                    }
                    .completed-day {
                        background-color: #90ee90;
                        border-radius: 50%;
                    }
                `}</style>
            </Card.Body>
        </Card>
    );
};

export default CalendarPage;