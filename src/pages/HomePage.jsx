import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { isWithinInterval, parseISO, getDay, startOfDay } from 'date-fns';
import { ListGroup, Badge, ProgressBar, Form } from 'react-bootstrap';

const calculateTotalScheduledDays = (task) => {
    if (!task.startDate || !task.endDate) return 0;
    let count = 0;
    let currentDate = parseISO(task.startDate);
    const lastDate = parseISO(task.endDate);
    while (currentDate <= lastDate) {
        if (task.frequency.includes(getDay(currentDate))) {
            count++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
};

const HomePage = () => {
    const { tasks, completions, toggleTaskCompletion } = useContext(TaskContext);
    const today = startOfDay(new Date());
    const todayDayOfWeek = getDay(today);

    const todaysTasks = tasks.filter(task => {
        const start = parseISO(task.startDate);
        const end = parseISO(task.endDate);
        return isWithinInterval(today, { start, end }) && task.frequency.includes(todayDayOfWeek);
    });

    const getVariantForTitle = (title) => {
        const variants = {
            'Sağlık': 'success',
            'Dış Görünüş': 'info',
            'Zeka': 'warning',
            'Sosyal Beceri': 'danger',
            'Araba': 'secondary',
            'Ev': 'primary',
        };
        return variants[title] || 'light';
    };

    const calculateCompletionPercent = (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return 0;
        const totalDays = calculateTotalScheduledDays(task);
        if (totalDays === 0) return 0;
        const completedCount = completions[taskId]?.length || 0;
        return Math.round((completedCount / totalDays) * 100);
    };

    return (
        <div>
            <h1 className="mb-4">Bugünün Zincir Halkaları - {today.toLocaleDateString('tr-TR')}</h1>
            <ListGroup>
                {todaysTasks.length > 0 ? (
                    todaysTasks.map(task => {
                        const isCompletedToday = completions[task.id]?.includes(today.toISOString().split('T')[0]);
                        const percent = calculateCompletionPercent(task.id);
                        const variant = getVariantForTitle(task.title);

                        return (
                            <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
                                <Form.Check 
                                    type="checkbox"
                                    id={`task-${task.id}`}
                                    label={
                                        <>
                                            <span className="fw-bold">{task.taskName}</span>
                                            <Badge bg={variant} pill className="ms-2">{task.title}</Badge>
                                        </>
                                    }
                                    checked={isCompletedToday || false}
                                    onChange={() => toggleTaskCompletion(task.id, today)}
                                />
                                <div style={{ width: '150px' }}>
                                    <ProgressBar now={percent} label={`${percent}%`} variant={variant} />
                                </div>
                            </ListGroup.Item>
                        );
                    })
                ) : (
                    <p>Bugün için planlanmış bir göreviniz yok. Yeni bir zincir başlatmaya ne dersin?</p>
                )}
            </ListGroup>
        </div>
    );
};

export default HomePage;