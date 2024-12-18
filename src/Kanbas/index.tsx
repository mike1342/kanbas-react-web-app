import React, { useEffect } from 'react';
import Account from './Account';
import { Routes, Route, Navigate } from 'react-router';
import Dashboard from './Dashboard';
import KanbasNavigation from './Navigation';
import Courses from './Courses';
import './styles.css';
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import { useState } from "react";
import ProtectedRoute from './Account/ProtectedRoute';
import Session from './Account/Session';
import { useSelector } from 'react-redux';

const Kanbas: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [allCourses, setAllCourses] = useState<any[]>([]);
    const [course, setCourse] = useState<any>({
        name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

    const fetchAllCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            setAllCourses(allCourses);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const courses = await userClient.findCoursesForUser(currentUser._id);
                setCourses(courses);
            } catch (error) {
                console.error(error);
            }
        };
        if (currentUser) fetchCourses();
    }, [currentUser, enrollments]);

    useEffect(() => {
        fetchAllCourses();
    }, []);

    const addNewCourse = async () => {
        const newCourse = await courseClient.createCourse(course);
        setCourses([ ...courses, newCourse ]);
    };
    
    const deleteCourse = async (courseId: string) => {
        await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
      };

    const updateCourse = async () => {
        await courseClient.updateCourse(course);
        setCourses(courses.map((c) => {
                if (c._id === course._id) { return course; }
                else { return c; }
            })
        );
    };
    

    return (
        <Session>
            <div id='wd-kanbas'>
                <KanbasNavigation />
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Dashboard" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="/Dashboard" element={
                            <ProtectedRoute>
                                <Dashboard
                                    courses={allCourses}
                                    userCourses={courses}
                                    course={course}
                                    setCourse={setCourse}
                                    addNewCourse={addNewCourse}
                                    deleteCourse={deleteCourse}
                                    updateCourse={updateCourse}/>
                            </ProtectedRoute>} />
                        <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
                        <Route path="/Calendar" element={<h1>Calendar</h1>} />
                        <Route path="/Inbox" element={<h1>Inbox</h1>} />
                    </Routes>
                </div>
            </div>
        </Session>
    );
};

export default Kanbas;