import { useCallback, useEffect, useState } from "react";
import type { DashboardEnrollmentState } from "../config/env";
import { useAuth } from "../providers/AuthProvider";
// [AUTH-BACKEND DISABLED] listStudentCourses import commented out — no backend connection
// import {
//   listStudentCourses,
//   type StudentCourseItem,
// } from "../../features/student/api/studentCoursesApi";
import type { StudentCourseItem } from "../../features/student/api/studentCoursesApi";

export interface DashboardEnrollment {
  id: string;
}

export interface DashboardEnrollmentViewModel {
  status: DashboardEnrollmentState;
  enrolledCourses: DashboardEnrollment[];
  courses: StudentCourseItem[];
}

const STUDENT_DASHBOARD_BRAND = "elite" as const;

function canOpenCourse(course: StudentCourseItem): boolean {
  return course.access?.isEnrolled === true;
}

function toEnrollment(course: StudentCourseItem): DashboardEnrollment {
  return { id: course.courseId };
}

export function useDashboardEnrollment() {
  const auth = useAuth();
  const [retryIndex, setRetryIndex] = useState(0);
  const [viewModel, setViewModel] = useState<DashboardEnrollmentViewModel>({
    status: "loading",
    enrolledCourses: [],
    courses: [],
  });

  const retry = useCallback(() => {
    setRetryIndex((current) => current + 1);
  }, []);

  useEffect(() => {
    if (auth.status === "loading") {
      setViewModel({ status: "loading", enrolledCourses: [], courses: [] });
      return;
    }

    if (auth.status !== "authenticated") {
      setViewModel({ status: "empty", enrolledCourses: [], courses: [] });
      return;
    }

    // [AUTH-BACKEND DISABLED] API call to listStudentCourses commented out — no backend
    // const controller = new AbortController();
    // setViewModel({ status: "loading", enrolledCourses: [], courses: [] });
    // listStudentCourses({ brand: STUDENT_DASHBOARD_BRAND, page: 1, pageSize: 25, signal: controller.signal })
    //   .then((payload) => {
    //     if (controller.signal.aborted) return;
    //     const courses = [...payload.items];
    //     const enrolledCourses = courses.filter(canOpenCourse).map(toEnrollment);
    //     setViewModel({
    //       status: enrolledCourses.length > 0 ? "enrolled" : "empty",
    //       enrolledCourses,
    //       courses,
    //     });
    //   })
    //   .catch(() => {
    //     if (controller.signal.aborted) return;
    //     setViewModel({ status: "error", enrolledCourses: [], courses: [] });
    //   });
    // return () => controller.abort();

    // Stub: always show empty when authenticated but backend is disabled
    void STUDENT_DASHBOARD_BRAND; // prevent unused warning
    void canOpenCourse; void toEnrollment; // prevent unused warnings
    setViewModel({ status: "empty", enrolledCourses: [], courses: [] });
  }, [auth, auth.status, retryIndex]);

  return { ...viewModel, retry };
}
