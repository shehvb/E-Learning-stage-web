import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppShell } from "../../../components/layout/AppShell";
import { SearchBar } from "../../../components/ui/SearchBar";
import { UserHeaderActions } from "../../../components/ui/UserHeaderActions";
import { PageBreadcrumb } from "../../../components/ui/PageBreadcrumb";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { MobileLayout } from "../../../components/mobile/MobileLayout";
import { useGamification } from "../../../app/providers/GamificationProvider";
import { useAuth } from "../../../app/providers/AuthProvider";

import { lazy, Suspense } from "react";

import { MobileMessagesProvider } from "../../../components/mobile/data/useMobileMessages";
import { RouteErrorBoundary } from "../../../components/layout/RouteErrorBoundary";
import { RouteLoadingFallback } from "../../../components/layout/RouteLoadingFallback";

const CourseOverviewScreen = lazy(() => import("../../../components/mobile/screens/CourseOverviewScreen").then((m) => ({ default: m.CourseOverviewScreen })));
const MobileLearningPathStubScreen = lazy(() => import("../../../components/mobile/screens/MobileLearningPathStubScreen").then((m) => ({ default: m.MobileLearningPathStubScreen })));

export function StudentLayout() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { xpTotal } = useGamification();
  const auth = useAuth();
  const pathname = location.pathname;

  // Render Mobile Layout when viewport matches <= 767px
  if (isMobile) {
    if (pathname.startsWith("/my-courses/") && pathname !== "/my-courses") {
      return (
        <RouteErrorBoundary isMobile>
          <Suspense fallback={<RouteLoadingFallback isMobile message="Loading course..." />}>
            <MobileMessagesProvider>
              <CourseOverviewScreen />
            </MobileMessagesProvider>
          </Suspense>
        </RouteErrorBoundary>
      );
    }
    if (pathname.startsWith("/explore/paths/") && pathname !== "/explore/paths") {
      return (
        <RouteErrorBoundary isMobile>
          <Suspense fallback={<RouteLoadingFallback isMobile message="Loading learning path..." />}>
            <MobileLearningPathStubScreen />
          </Suspense>
        </RouteErrorBoundary>
      );
    }
    return <MobileLayout />;
  }

  // Prevent flash while measuring initial viewport on client mount
  if (isMobile === undefined) {
    return null;
  }

  const courseRouteMatch = pathname.match(/^\/my-courses\/([^/]+)(?:\/lessons\/([^/]+))?$/);
  const courseRouteState = location.state as { courseTitle?: unknown; courseId?: unknown } | null;
  const currentCourseTitle = typeof courseRouteState?.courseTitle === "string" && courseRouteState.courseTitle.trim() ? courseRouteState.courseTitle : "Subject overview";
  const currentCourseId = courseRouteMatch?.[1] ?? "";

  const isHome = pathname === "/" || pathname === "";
  const isProfile = pathname === "/profile";
  const isMyCourses = pathname === "/my-courses";
  const isCourseOverview = Boolean(courseRouteMatch && !courseRouteMatch[2]);
  const isLessonPlayer = Boolean(courseRouteMatch?.[2]);
  const isExplore = pathname === "/explore";
  const isAssignments = pathname === "/assignments";
  const isAssignmentDetail = pathname.startsWith("/assignments/");
  const isCalendar = pathname === "/calendar";
  const isMessages = pathname === "/messages";
  const isCommunity = pathname === "/community";
  const isHelp = pathname === "/help";
  const isSettings = pathname === "/settings";
  const isTestXP = pathname === "/test-xp";
  const isTestInactivity = pathname === "/test-inactivity";
  const isTestStreak = pathname === "/test-streak";
  const isInstructorProfile = pathname === "/instructor-profile" || pathname.startsWith("/instructors");

  // Search bar in the topbar is shown for Home
  const showCenteredSearch = isHome;

  const renderBreadcrumb = () => {
    if (isSettings) {
      return (
        <PageBreadcrumb
          trail={[{ label: "LEARNING SPACE", to: "/" }]}
          title="Settings"
        />
      );
    }

    if (isHelp) {
      return (
        <PageBreadcrumb
          trail={[{ label: "LEARNING SPACE", to: "/" }]}
          title="Help Center"
        />
      );
    }

    if (isInstructorProfile) {
      return (
        <PageBreadcrumb
          trail={[{ label: "PROFILE", to: "/" }]}
          title="Instructor Profile"
        />
      );
    }

    if (isProfile) {
      return (
        <PageBreadcrumb
          trail={[{ label: "STUDENT ACCOUNT", to: "/" }]}
          title="My Profile"
        />
      );
    }

    if (isCommunity) {
      return (
        <PageBreadcrumb
          trail={[{ label: "LEARNING SPACE", to: "/" }]}
          title="Community"
        />
      );
    }

    if (isCourseOverview) {
      return (
        <PageBreadcrumb
          trail={[{ label: "MY COURSES", to: "/my-courses" }]}
          title={currentCourseTitle}
        />
      );
    }

    if (isLessonPlayer) {
      return (
        <PageBreadcrumb
          trail={[
            { label: "MY COURSES", to: "/my-courses" },
            { label: currentCourseTitle.toUpperCase(), to: `/my-courses/${currentCourseId}` },
          ]}
          title="Lesson Player"
        />
      );
    }

    if (isAssignmentDetail) {
      return (
        <PageBreadcrumb
          trail={[
            { label: "LEARNING SPACE", to: "/" },
            { label: "ASSIGNMENTS", to: "/assignments" },
          ]}
          title="Clinical Case Review"
        />
      );
    }

    if (isMyCourses) {
      return (
        <PageBreadcrumb
          trail={[{ label: "LEARNING SPACE", to: "/" }]}
          title="My Courses"
        />
      );
    }

    let title = "Dashboard";
    let trailLabel = "LEARNING SPACE";

    if (isExplore) {
      title = "Explore";
      trailLabel = "DISCOVER";
    } else if (isAssignments) {
      title = "Assignments";
      trailLabel = "LEARNING SPACE";
    } else if (isCalendar) {
      title = "Calendar";
      trailLabel = "SCHEDULE";
    } else if (isMessages) {
      title = "Messages";
      trailLabel = "COMMUNICATION";
    } else if (isTestInactivity) {
      title = "Inactivity Prompt Test";
      trailLabel = "TESTING";
    } else if (isTestXP) {
      title = "XP Reward Test";
      trailLabel = "TESTING";
    } else if (isTestStreak) {
      title = "Streak Analytics Test";
      trailLabel = "TESTING";
    } else {
      const segments = pathname.split("/").filter(Boolean);
      const lastSegment = segments[segments.length - 1] || "Dashboard";
      title = lastSegment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return (
      <PageBreadcrumb
        trail={[{ label: trailLabel, to: "/" }]}
        title={title}
      />
    );
  };

  const isScrollablePage = isTestXP || isTestStreak || isTestInactivity;

  return (
    <AppShell>
      <div
        className={`student-dashboard${isHome ? " student-dashboard--home" : ""}${
          isProfile ? " student-dashboard--profile" : ""
        }${isInstructorProfile ? " student-dashboard--instructor-profile" : ""}${
          isMyCourses ? " student-dashboard--my-courses" : ""
        }${isCourseOverview ? " student-dashboard--course-overview" : ""}${
          isAssignments ? " student-dashboard--assignments" : ""
        }${isAssignmentDetail ? " student-dashboard--assignment-detail" : ""}${
          isCalendar ? " student-dashboard--calendar" : ""
        }${isMessages ? " student-dashboard--messages" : ""}${
          isCommunity ? " student-dashboard--community" : ""
        }${isHelp ? " student-dashboard--help" : ""}${
          isSettings ? " student-dashboard--settings" : ""
        }${
          isScrollablePage ? " student-dashboard--scrollable" : ""}`}
      >
        <header
          className={`student-dashboard__header${showCenteredSearch ? " student-dashboard__header--home" : ""}`}
          aria-label="Student dashboard header"
        >
          {showCenteredSearch ? (
            <div className="student-dashboard__search">
              <SearchBar
                placeholder="Search courses, topics or skills..."
                isLoading={auth.status === "loading"}
              />
            </div>
          ) : (
            renderBreadcrumb()
          )}
          <div className="student-dashboard__actions">
            {auth.status === "authenticated" ? (
              <UserHeaderActions
                avatarSrc="https://i.pravatar.cc/112?img=47"
                avatarAlt="Student account"
                userName={auth.user?.name ?? "Student"}
                userRole="Student"
                xp={xpTotal}
                hasNotification
                onViewProfile={() => navigate("/profile")}
                onMenuItemClick={(itemKey) => {
                  if (itemKey === "profile") navigate("/profile");
                  else if (itemKey === "settings") navigate("/settings");
                  else if (itemKey === "notifications") navigate("/settings");
                  else if (itemKey === "help") navigate("/help");
                  else if (itemKey === "certificates") navigate("/profile?tab=achievements");
                }}
                onLogOut={() => {
                  auth.signOut();
                  navigate("/", { replace: true });
                }}
              />
            ) : (
              <button
                type="button"
                className="student-dashboard__signin-button"
                onClick={() => navigate("/auth/sign-in", { state: { from: "/" } })}
              >
                Sign in
              </button>
            )}
          </div>
        </header>
        <div className="student-dashboard__content">
          <Outlet />
        </div>
      </div>
    </AppShell>
  );
}
