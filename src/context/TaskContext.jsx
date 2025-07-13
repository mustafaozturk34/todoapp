import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Yardımcı fonksiyonlar
const getTasksFromLocalStorage = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
};

const getCompletionsFromLocalStorage = () => {
    const completions = localStorage.getItem('taskCompletions');
    return completions ? JSON.parse(completions) : {};
};

/* eslint-disable react-refresh/only-export-components */
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(getTasksFromLocalStorage);
    const [completions, setCompletions] = useState(getCompletionsFromLocalStorage);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('taskCompletions', JSON.stringify(completions));
    }, [completions]);

    const addTask = (task) => {
        const newTask = { ...task, id: uuidv4(), status: 'doing' };
        setTasks([...tasks, newTask]);
    };

    const toggleTaskCompletion = (taskId, date) => {
        const dateString = date.toISOString().split('T')[0]; // 'YYYY-MM-DD' formatı
        const taskCompletions = { ...completions };

        if (!taskCompletions[taskId]) {
            taskCompletions[taskId] = [];
        }

        const dateIndex = taskCompletions[taskId].indexOf(dateString);

        if (dateIndex > -1) {
            taskCompletions[taskId].splice(dateIndex, 1);
        } else {
            taskCompletions[taskId].push(dateString);
        }
        setCompletions(taskCompletions);
    };

    return (
        <TaskContext.Provider value={{ tasks, completions, addTask, toggleTaskCompletion }}>
            {children}
        </TaskContext.Provider>
    );
};