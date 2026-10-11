import React from "react";
import "../../ui/Skeleton/Skeleton.css";

export interface MobileSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  circle?: boolean;
}

/**
 * Base shimmer block primitive with exact dimension support.
 */
export const MobileSkeleton: React.FC<MobileSkeletonProps> = ({
  width,
  height,
  borderRadius,
  circle = false,
  className = "",
  style,
  ...rest
}) => {
  const inlineStyle: React.CSSProperties = {
    width: width !== undefined ? (typeof width === "number" ? `${width}px` : width) : undefined,
    height: height !== undefined ? (typeof height === "number" ? `${height}px` : height) : undefined,
    borderRadius: circle
      ? "9999px"
      : borderRadius !== undefined
      ? typeof borderRadius === "number"
        ? `${borderRadius}px`
        : borderRadius
      : "12px",
    ...style,
  };

  return (
    <div
      aria-hidden="true"
      className={`skeleton-shimmer ${className}`}
      style={inlineStyle}
      {...rest}
    />
  );
};

/* -------------------------------------------------------------------------- */
/* 1. Continue Reading Card Skeleton (HomeScreen)                             */
/* -------------------------------------------------------------------------- */
export const SkeletonContinueReadingCard: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full bg-white rounded-3xl border border-slate-100/80 p-4 sm:p-5 shadow-xs overflow-hidden ${className}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0 pr-1">
          <MobileSkeleton width={76} height={18} borderRadius={999} className="mb-1" />
          <MobileSkeleton width={140} height={20} borderRadius={6} />
          <MobileSkeleton width={110} height={14} borderRadius={4} className="mt-0.5" />

          {/* Progress row */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1.5">
              <MobileSkeleton width={96} height={13} borderRadius={4} />
              <MobileSkeleton width={26} height={13} borderRadius={4} />
            </div>
            <MobileSkeleton width="100%" height={6} borderRadius={999} />
          </div>
        </div>

        {/* Thumbnail Graphic */}
        <MobileSkeleton
          width={96}
          height={96}
          borderRadius={16}
          className="shrink-0 sm:w-28 sm:h-28"
        />
      </div>

      {/* Sub-row: Last opened note + CTA */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <MobileSkeleton width={28} height={28} borderRadius={8} className="shrink-0" />
          <div className="space-y-1 min-w-0">
            <MobileSkeleton width={80} height={10} borderRadius={4} />
            <MobileSkeleton width={140} height={11} borderRadius={4} />
          </div>
        </div>
        <MobileSkeleton width={128} height={34} borderRadius={12} className="shrink-0" />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. Quick Action Tile Skeleton (HomeScreen)                                  */
/* -------------------------------------------------------------------------- */
export const SkeletonQuickActionTile: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`flex-1 min-w-19 bg-white rounded-2xl border border-slate-100 p-2.5 sm:p-3 flex flex-col items-center text-center shadow-xs ${className}`}
    >
      <MobileSkeleton width={40} height={40} circle className="mb-2 sm:w-11 sm:h-11" />
      <MobileSkeleton width={42} height={13} borderRadius={4} />
      <MobileSkeleton width={54} height={10} borderRadius={4} className="mt-1" />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. Compact Course Card Skeleton (HomeScreen 2-col flex row)                 */
/* -------------------------------------------------------------------------- */
export const SkeletonCompactCourseCard: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`flex-1 min-w-0 bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs flex flex-col ${className}`}
    >
      <div className="relative h-20 sm:h-22 w-full bg-slate-100">
        <MobileSkeleton width="100%" height="100%" borderRadius={0} />
        <div className="absolute top-2 left-2">
          <MobileSkeleton width={62} height={16} borderRadius={999} />
        </div>
        <div className="absolute top-1.5 right-1.5">
          <MobileSkeleton width={20} height={20} circle />
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <MobileSkeleton width="85%" height={14} borderRadius={4} />
          <MobileSkeleton width="60%" height={11} borderRadius={4} className="mt-1" />
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <MobileSkeleton width={80} height={11} borderRadius={4} />
            <MobileSkeleton width={24} height={11} borderRadius={4} />
          </div>
          <MobileSkeleton width="100%" height={6} borderRadius={999} />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. Full Course Card Skeleton (MyCoursesScreen)                              */
/* -------------------------------------------------------------------------- */
export const SkeletonCourseCard: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`w-full bg-white rounded-3xl border border-slate-100/90 p-3.5 sm:p-4 shadow-2xs flex gap-3.5 sm:gap-4 ${className}`}
    >
      {/* Left Thumbnail */}
      <MobileSkeleton
        width={88}
        height={88}
        borderRadius={16}
        className="shrink-0 sm:w-26 sm:h-26"
      />

      {/* Right Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex items-center justify-between gap-2">
            <MobileSkeleton width={70} height={18} borderRadius={999} />
            <MobileSkeleton width={20} height={20} circle />
          </div>
          <div className="mt-1.5 space-y-1">
            <MobileSkeleton width="85%" height={16} borderRadius={4} />
            <MobileSkeleton width="60%" height={12} borderRadius={4} />
          </div>
        </div>

        <div className="mt-2.5">
          <div className="flex items-center justify-between mb-1">
            <MobileSkeleton width={96} height={12} borderRadius={4} />
            <MobileSkeleton width={28} height={12} borderRadius={4} />
          </div>
          <MobileSkeleton width="100%" height={6} borderRadius={999} />
        </div>

        <div className="mt-2.5 pt-1.5 flex items-center justify-between gap-2">
          <MobileSkeleton width={110} height={12} borderRadius={4} />
          <MobileSkeleton width={26} height={26} circle className="shrink-0" />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 5. Document List Row Skeleton (HomeScreen)                                  */
/* -------------------------------------------------------------------------- */
export const SkeletonDocumentListRow: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`w-full bg-white rounded-2xl border border-slate-100 p-3 flex items-center justify-between gap-3 shadow-xs ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <MobileSkeleton width={40} height={40} borderRadius={12} className="shrink-0" />
        <div className="min-w-0 flex-1 space-y-1">
          <MobileSkeleton width="75%" height={14} borderRadius={4} />
          <MobileSkeleton width="50%" height={12} borderRadius={4} />
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <MobileSkeleton width={48} height={12} borderRadius={4} />
        <MobileSkeleton width={16} height={16} circle />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 6. Weekly Study Goal Card Skeleton (HomeScreen & CalendarScreen)            */
/* -------------------------------------------------------------------------- */
export const SkeletonWeeklyStudyGoal: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`w-full bg-white rounded-3xl border border-slate-100/80 p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4 ${className}`}
    >
      {/* Left Progress Ring */}
      <div className="relative w-20 h-20 sm:w-22 sm:h-22 shrink-0 flex items-center justify-center">
        <MobileSkeleton width={80} height={80} circle className="sm:w-22 sm:h-22" />
      </div>

      {/* Middle Hours Text */}
      <div className="flex-1 min-w-0 pl-1 space-y-1.5">
        <MobileSkeleton width={100} height={18} borderRadius={4} />
        <MobileSkeleton width={75} height={13} borderRadius={4} />
      </div>

      {/* Right 7-bar chart */}
      <div className="flex items-end gap-2.5 shrink-0 h-14">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <MobileSkeleton width={9} height={40} borderRadius={999} />
            <MobileSkeleton width={8} height={10} borderRadius={2} />
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 7. Featured Path Card Skeleton (ExploreScreen)                              */
/* -------------------------------------------------------------------------- */
export const SkeletonFeaturedPathCard: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full rounded-3xl overflow-hidden bg-[#032e1e] p-4.5 sm:p-5 text-white shadow-md border border-emerald-800/40 ${className}`}
    >
      <div className="relative z-10 max-w-[70%] sm:max-w-[75%] space-y-3">
        <div className="flex items-center gap-1.5">
          <MobileSkeleton width={84} height={18} borderRadius={999} />
          <MobileSkeleton width={76} height={18} borderRadius={999} />
        </div>
        <MobileSkeleton width="88%" height={22} borderRadius={6} />
        <MobileSkeleton width="98%" height={14} borderRadius={4} />
        <div className="flex items-center gap-2 pt-1">
          <div className="flex -space-x-1.5">
            <MobileSkeleton width={24} height={24} circle />
            <MobileSkeleton width={24} height={24} circle />
            <MobileSkeleton width={24} height={24} circle />
          </div>
          <MobileSkeleton width={75} height={12} borderRadius={4} />
        </div>
        <div className="flex items-center gap-2 pt-1">
          <MobileSkeleton width={140} height={32} borderRadius={12} />
          <MobileSkeleton width={32} height={32} borderRadius={12} />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 8. Trending Row Skeleton (ExploreScreen & CommunityScreen)                  */
/* -------------------------------------------------------------------------- */
export const SkeletonTrendingRow: React.FC<{
  withRank?: boolean;
  className?: string;
}> = ({ withRank = true, className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={`w-full bg-white rounded-2xl border border-slate-100 p-3.5 flex items-center justify-between gap-3 shadow-2xs ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {withRank && (
          <MobileSkeleton width={20} height={18} borderRadius={4} className="shrink-0" />
        )}
        <MobileSkeleton width={40} height={40} borderRadius={12} className="shrink-0" />
        <div className="min-w-0 flex-1 space-y-1">
          <MobileSkeleton width="75%" height={14} borderRadius={4} />
          <MobileSkeleton width="50%" height={11} borderRadius={4} />
        </div>
      </div>
      <MobileSkeleton width={38} height={16} borderRadius={999} className="shrink-0" />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 9. Resource Card Skeleton (ExploreScreen 2-col Grid)                        */
/* -------------------------------------------------------------------------- */
export const SkeletonResourceCard: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`flex-1 min-w-0 bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-2xs flex flex-col ${className}`}
    >
      <div className="relative h-20 sm:h-22 w-full bg-slate-100">
        <MobileSkeleton width="100%" height="100%" borderRadius={0} />
        <div className="absolute top-2 left-2">
          <MobileSkeleton width={58} height={16} borderRadius={6} />
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <MobileSkeleton width="85%" height={14} borderRadius={4} />
          <MobileSkeleton width="60%" height={11} borderRadius={4} className="mt-1" />
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100/80 flex items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <MobileSkeleton width={38} height={11} borderRadius={4} />
            <MobileSkeleton width={32} height={11} borderRadius={4} />
          </div>
          <MobileSkeleton width={24} height={24} circle className="shrink-0" />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 10. Event Card Skeleton (CalendarScreen with timeline spine)                */
/* -------------------------------------------------------------------------- */
export const SkeletonEventCard: React.FC<{
  isLast?: boolean;
  className?: string;
}> = ({ isLast = false, className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={`flex items-stretch gap-2.5 sm:gap-3 ${className}`}
    >
      {/* 1. Left Time Column (w-16) */}
      <div className="flex flex-col items-start justify-start pt-3 shrink-0 w-16 text-left space-y-1">
        <MobileSkeleton width={52} height={13} borderRadius={4} />
        <MobileSkeleton width={42} height={11} borderRadius={4} />
      </div>

      {/* 2. Timeline spine with node dot */}
      <div className="relative flex flex-col items-center shrink-0 w-3">
        {!isLast && <div className="absolute top-4.5 bottom-0 w-0.5 bg-slate-100" />}
        <div className="absolute -top-3.5 bottom-0 w-0.5 bg-slate-100" />
        <MobileSkeleton width={10} height={10} circle className="mt-3.5 z-10" />
      </div>

      {/* 3. Event Card Bubble */}
      <div className="flex-1 text-left rounded-2xl sm:rounded-3xl border border-slate-100/90 p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-2xs bg-white">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <MobileSkeleton width={20} height={20} borderRadius={6} className="shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex items-center gap-2">
              <MobileSkeleton width="60%" height={15} borderRadius={4} />
              <MobileSkeleton width={32} height={14} borderRadius={999} />
            </div>
            <MobileSkeleton width="85%" height={12} borderRadius={4} />
          </div>
        </div>
        <MobileSkeleton width={16} height={16} borderRadius={4} className="shrink-0" />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 11. Reminder Row Skeleton (CalendarScreen & HelpCenterScreen)               */
/* -------------------------------------------------------------------------- */
export const SkeletonReminderRow: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`w-full bg-white rounded-2xl border border-slate-100/80 p-3.5 flex items-center justify-between gap-3 shadow-2xs ${className}`}
    >
      <MobileSkeleton width={36} height={36} borderRadius={12} className="shrink-0" />
      <div className="flex-1 space-y-1 min-w-0">
        <MobileSkeleton width="75%" height={14} borderRadius={4} />
        <MobileSkeleton width="45%" height={11} borderRadius={4} />
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <MobileSkeleton width={60} height={18} borderRadius={999} />
        <MobileSkeleton width={16} height={16} borderRadius={4} />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 12. Assignment Card Skeleton (AssignmentsScreen)                            */
/* -------------------------------------------------------------------------- */
export const SkeletonAssignmentCard: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <article
      aria-hidden="true"
      className={`w-full bg-white rounded-3xl border border-slate-100 shadow-2xs p-4 flex flex-col gap-3 ${className}`}
    >
      {/* Top row */}
      <div className="flex items-center justify-between gap-2">
        <MobileSkeleton width={70} height={12} borderRadius={4} />
        <div className="flex items-center gap-1.5 shrink-0">
          <MobileSkeleton width={72} height={20} borderRadius={999} />
          <MobileSkeleton width={16} height={16} circle />
        </div>
      </div>

      {/* Middle row: Organ Image + Title & description */}
      <div className="flex items-start gap-3.5">
        <MobileSkeleton
          width={64}
          height={64}
          borderRadius={16}
          className="shrink-0 sm:size-18"
        />
        <div className="flex-1 min-w-0 space-y-1.5">
          <MobileSkeleton width="85%" height={16} borderRadius={4} />
          <MobileSkeleton width="95%" height={13} borderRadius={4} />
          <div className="flex items-center gap-2 mt-2">
            <MobileSkeleton width={80} height={12} borderRadius={4} />
            <MobileSkeleton width={45} height={18} borderRadius={999} />
          </div>
        </div>
      </div>

      {/* Bottom row: Points/progress + CTA */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0 pr-2 space-y-1.5">
          <div className="flex items-center justify-between">
            <MobileSkeleton width={55} height={12} borderRadius={4} />
            <MobileSkeleton width={28} height={12} borderRadius={4} />
          </div>
          <MobileSkeleton width="100%" height={6} borderRadius={999} />
        </div>
        <MobileSkeleton width={85} height={30} borderRadius={12} className="shrink-0" />
      </div>
    </article>
  );
};

/* -------------------------------------------------------------------------- */
/* 13. Assignment Progress Ring Skeleton (AssignmentsScreen)                   */
/* -------------------------------------------------------------------------- */
export const SkeletonAssignmentProgressRing: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`w-full bg-white rounded-3xl border border-slate-100/80 p-4 sm:p-5 shadow-xs ${className}`}
    >
      <div className="flex items-center justify-between mb-3.5">
        <MobileSkeleton width={95} height={16} borderRadius={4} />
        <MobileSkeleton width={80} height={14} borderRadius={4} />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="relative size-26 shrink-0 flex items-center justify-center">
          <MobileSkeleton width={104} height={104} circle />
        </div>
        <div className="flex-1 min-w-0 space-y-2.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MobileSkeleton width={8} height={8} circle />
                <MobileSkeleton width={70} height={12} borderRadius={4} />
              </div>
              <MobileSkeleton width={30} height={12} borderRadius={4} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 14. Discussion Card Skeleton (CommunityScreen)                              */
/* -------------------------------------------------------------------------- */
export const SkeletonDiscussionCard: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`p-3.5 bg-white rounded-2xl border border-slate-100 shadow-2xs space-y-2.5 ${className}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <MobileSkeleton width={28} height={28} circle className="shrink-0" />
          <div className="space-y-1 min-w-0">
            <MobileSkeleton width={75} height={12} borderRadius={4} />
            <MobileSkeleton width={45} height={10} borderRadius={4} />
          </div>
        </div>
        <MobileSkeleton width={55} height={18} borderRadius={999} />
      </div>
      <MobileSkeleton width="90%" height={15} borderRadius={4} />
      <div className="flex items-center justify-between pt-1 border-t border-slate-50">
        <div className="flex items-center gap-3">
          <MobileSkeleton width={55} height={12} borderRadius={4} />
          <MobileSkeleton width={45} height={12} borderRadius={4} />
        </div>
        <MobileSkeleton width={16} height={16} borderRadius={4} />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 15. Conversation Row Skeleton (MessagesListScreen)                          */
/* -------------------------------------------------------------------------- */
export const SkeletonConversationRow: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`w-full p-3.5 flex items-start gap-3 ${className}`}
    >
      <div className="relative shrink-0">
        <MobileSkeleton width={44} height={44} circle />
        <MobileSkeleton
          width={12}
          height={12}
          circle
          className="absolute bottom-0 right-0 border-2 border-white"
        />
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-1">
          <MobileSkeleton width="45%" height={14} borderRadius={4} />
          <MobileSkeleton width={35} height={10} borderRadius={4} />
        </div>
        <MobileSkeleton width="30%" height={11} borderRadius={4} />
        <MobileSkeleton width="85%" height={13} borderRadius={4} className="mt-1" />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 16. Help Category Card Skeleton (HelpCenterScreen 2-col Grid)               */
/* -------------------------------------------------------------------------- */
export const SkeletonHelpCategoryCard: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`p-3 bg-white rounded-2xl border border-slate-100 shadow-2xs flex flex-col justify-between ${className}`}
    >
      <div>
        <MobileSkeleton width={32} height={32} borderRadius={12} className="mb-2" />
        <MobileSkeleton width="75%" height={13} borderRadius={4} />
        <MobileSkeleton width="90%" height={10} borderRadius={4} className="mt-1" />
      </div>
      <div className="mt-2.5 pt-2 border-t border-slate-50 flex items-center justify-between">
        <MobileSkeleton width={45} height={10} borderRadius={4} />
        <MobileSkeleton width={14} height={14} borderRadius={4} />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 17. Mentor Spotlight Skeleton (CommunityScreen)                             */
/* -------------------------------------------------------------------------- */
export const SkeletonMentorSpotlight: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`p-4 bg-white rounded-3xl border border-slate-100 shadow-2xs flex items-center justify-between gap-3 ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <MobileSkeleton width={48} height={48} circle className="shrink-0" />
        <div className="space-y-1 min-w-0">
          <MobileSkeleton width={110} height={14} borderRadius={4} />
          <MobileSkeleton width={140} height={11} borderRadius={4} />
          <MobileSkeleton width={90} height={10} borderRadius={4} />
        </div>
      </div>
      <MobileSkeleton width={80} height={32} borderRadius={12} className="shrink-0" />
    </div>
  );
};
