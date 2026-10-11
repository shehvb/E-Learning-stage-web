import React from "react";
import {
  MobileSkeleton,
  SkeletonContinueReadingCard,
  SkeletonQuickActionTile,
  SkeletonCompactCourseCard,
  SkeletonCourseCard,
  SkeletonDocumentListRow,
  SkeletonWeeklyStudyGoal,
  SkeletonFeaturedPathCard,
  SkeletonTrendingRow,
  SkeletonResourceCard,
  SkeletonEventCard,
  SkeletonReminderRow,
  SkeletonAssignmentCard,
  SkeletonAssignmentProgressRing,
  SkeletonDiscussionCard,
  SkeletonConversationRow,
  SkeletonHelpCategoryCard,
  SkeletonMentorSpotlight,
} from "./SkeletonMobile";

/* -------------------------------------------------------------------------- */
/* Common Top App Bars & Layout Primitives                                    */
/* -------------------------------------------------------------------------- */

export const SkeletonTopAppBar: React.FC = () => (
  <header
    className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100/90 shadow-2xs select-none"
    style={{ paddingTop: "max(0.5rem, env(safe-area-inset-top, 0px))" }}
  >
    <div className="mobile-topbar-inner h-10 px-3.5 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <MobileSkeleton width={28} height={28} borderRadius={8} />
        <MobileSkeleton width={80} height={16} borderRadius={4} />
      </div>
      <div className="flex items-center gap-2">
        <MobileSkeleton width={28} height={28} circle />
        <MobileSkeleton width={64} height={24} borderRadius={999} />
        <MobileSkeleton width={32} height={32} circle />
      </div>
    </div>
  </header>
);

export const SkeletonHeaderWithBack: React.FC<{ titleWidth?: number }> = ({
  titleWidth = 90,
}) => (
  <header
    className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100/90 shadow-2xs select-none"
    style={{ paddingTop: "max(0.5rem, env(safe-area-inset-top, 0px))" }}
  >
    <div className="h-12 px-3.5 flex items-center gap-2 max-w-lg mx-auto">
      <MobileSkeleton width={24} height={24} borderRadius={6} />
      <MobileSkeleton width={titleWidth} height={18} borderRadius={6} />
    </div>
  </header>
);

export const SkeletonHeroBand: React.FC<{
  eyebrowWidth?: number;
  headingWidth?: number;
  subtitleWidth?: number;
  hasBanner?: boolean;
  hasIllustration?: boolean;
}> = ({
  eyebrowWidth = 90,
  headingWidth = 140,
  subtitleWidth = 200,
  hasBanner = false,
  hasIllustration = false,
}) => (
  <div className="mobile-hero-band relative w-full overflow-hidden px-4 pt-4 pb-4.5 bg-linear-to-b from-[#eef9f2] via-[#e6f7ee]/80 to-transparent">
    <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
      <div className="flex-1 min-w-0 space-y-2">
        {eyebrowWidth > 0 && <MobileSkeleton width={eyebrowWidth} height={12} borderRadius={4} />}
        <MobileSkeleton width={headingWidth} height={24} borderRadius={6} />
        {subtitleWidth > 0 && <MobileSkeleton width={subtitleWidth} height={13} borderRadius={4} />}
        {hasBanner && (
          <MobileSkeleton width={140} height={22} borderRadius={999} className="mt-2" />
        )}
      </div>
      {hasIllustration && (
        <div className="shrink-0 relative z-0 flex items-center justify-end -mr-1">
          <MobileSkeleton width={110} height={85} borderRadius={16} />
        </div>
      )}
    </div>
  </div>
);

export const SkeletonSearchBar: React.FC = () => (
  <div className="w-full bg-white rounded-2xl border border-slate-200/80 px-3.5 py-2.5 flex items-center gap-2.5 shadow-2xs">
    <MobileSkeleton width={18} height={18} circle />
    <MobileSkeleton width="60%" height={14} borderRadius={4} />
  </div>
);

export const SkeletonSectionHeader: React.FC<{
  titleWidth?: number;
  hasAction?: boolean;
}> = ({ titleWidth = 110, hasAction = true }) => (
  <div className="flex items-center justify-between px-0.5 mb-2">
    <MobileSkeleton width={titleWidth} height={16} borderRadius={4} />
    {hasAction && <MobileSkeleton width={56} height={13} borderRadius={4} />}
  </div>
);

/* -------------------------------------------------------------------------- */
/* 1. Mobile Home Screen Skeleton                                              */
/* -------------------------------------------------------------------------- */
export const MobileHomeScreenSkeleton: React.FC = () => {
  return (
    <div
      className="flex-1 flex flex-col min-h-0 w-full bg-slate-50/50"
      aria-busy="true"
      aria-label="Loading home"
    >
      <SkeletonTopAppBar />
      <div className="flex-1 overflow-y-auto">
        <SkeletonHeroBand
          eyebrowWidth={85}
          headingWidth={120}
          subtitleWidth={190}
          hasBanner
          hasIllustration
        />
        <div className="px-4 pt-2 pb-8 space-y-6 max-w-lg mx-auto">
          {/* 1. Continue Reading Card */}
          <SkeletonContinueReadingCard />

          {/* 2. Quick Actions 4-Column Grid */}
          <section aria-label="Quick Actions">
            <SkeletonSectionHeader titleWidth={95} hasAction />
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              <SkeletonQuickActionTile />
              <SkeletonQuickActionTile />
              <SkeletonQuickActionTile />
              <SkeletonQuickActionTile />
            </div>
          </section>

          {/* 3. My Courses 2 Side-by-Side Compact Cards */}
          <section aria-label="My Courses">
            <SkeletonSectionHeader titleWidth={80} hasAction />
            <div className="flex items-stretch gap-3">
              <SkeletonCompactCourseCard />
              <SkeletonCompactCourseCard />
            </div>
          </section>

          {/* 4. Weekly Study Goal Ring & 7-bar chart */}
          <section aria-label="Weekly Study Goal">
            <SkeletonSectionHeader titleWidth={130} hasAction />
            <SkeletonWeeklyStudyGoal />
          </section>

          {/* 5. Recent Documents List */}
          <section aria-label="Recent Documents">
            <SkeletonSectionHeader titleWidth={125} hasAction />
            <div className="space-y-2.5">
              <SkeletonDocumentListRow />
              <SkeletonDocumentListRow />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. Mobile My Courses Screen Skeleton                                        */
/* -------------------------------------------------------------------------- */
export const MobileMyCoursesScreenSkeleton: React.FC = () => {
  return (
    <div
      className="flex-1 flex flex-col min-h-0 w-full bg-slate-50/50"
      aria-busy="true"
      aria-label="Loading my courses"
    >
      <SkeletonTopAppBar />
      <div className="flex-1 overflow-y-auto">
        <SkeletonHeroBand eyebrowWidth={0} headingWidth={130} subtitleWidth={220} />
        <div className="px-4 pb-12 space-y-4 max-w-lg mx-auto">
          <SkeletonSearchBar />

          {/* Status filter pills + Sort button */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl">
              <MobileSkeleton width={88} height={32} borderRadius={12} />
              <MobileSkeleton width={88} height={32} borderRadius={12} />
              <MobileSkeleton width={68} height={32} borderRadius={12} />
            </div>
            <MobileSkeleton width={86} height={40} borderRadius={16} />
          </div>

          {/* Full Course Cards List */}
          <div className="space-y-3 pt-1">
            <SkeletonCourseCard />
            <SkeletonCourseCard />
            <SkeletonCourseCard />
            <SkeletonCourseCard />
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. Mobile Explore Screen Skeleton                                           */
/* -------------------------------------------------------------------------- */
export const MobileExploreScreenSkeleton: React.FC = () => {
  return (
    <div
      className="flex-1 flex flex-col min-h-0 w-full bg-slate-50/50"
      aria-busy="true"
      aria-label="Loading explore"
    >
      <SkeletonTopAppBar />
      <div className="flex-1 overflow-y-auto">
        <SkeletonHeroBand eyebrowWidth={0} headingWidth={110} subtitleWidth={230} />
        <div className="px-4 pb-12 space-y-5 max-w-lg mx-auto">
          {/* Search bar + filter button */}
          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <SkeletonSearchBar />
            </div>
            <MobileSkeleton width={42} height={42} borderRadius={16} className="shrink-0" />
          </div>

          {/* Category chips row */}
          <div className="flex items-center gap-2 overflow-x-hidden py-1">
            <MobileSkeleton width={44} height={32} borderRadius={999} className="shrink-0" />
            <MobileSkeleton width={80} height={32} borderRadius={999} className="shrink-0" />
            <MobileSkeleton width={86} height={32} borderRadius={999} className="shrink-0" />
            <MobileSkeleton width={90} height={32} borderRadius={999} className="shrink-0" />
            <MobileSkeleton width={84} height={32} borderRadius={999} className="shrink-0" />
          </div>

          {/* Featured Path Card */}
          <SkeletonFeaturedPathCard />

          {/* Trending now Section */}
          <section aria-label="Trending now">
            <SkeletonSectionHeader titleWidth={95} hasAction />
            <div className="space-y-2.5">
              <SkeletonTrendingRow withRank />
              <SkeletonTrendingRow withRank />
              <SkeletonTrendingRow withRank />
            </div>
          </section>

          {/* Medical Modules 2-col Grid */}
          <section aria-label="Medical Modules For You">
            <SkeletonSectionHeader titleWidth={170} hasAction />
            <div className="grid grid-cols-2 gap-3">
              <SkeletonResourceCard />
              <SkeletonResourceCard />
              <SkeletonResourceCard />
              <SkeletonResourceCard />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. Mobile Calendar Screen Skeleton                                          */
/* -------------------------------------------------------------------------- */
export const MobileCalendarScreenSkeleton: React.FC = () => {
  return (
    <div
      className="flex-1 flex flex-col min-h-0 w-full bg-slate-50/50"
      aria-busy="true"
      aria-label="Loading calendar"
    >
      <SkeletonTopAppBar />
      <div className="flex-1 overflow-y-auto">
        <SkeletonHeroBand
          eyebrowWidth={110}
          headingWidth={130}
          subtitleWidth={210}
          hasBanner
          hasIllustration
        />
        <div className="px-4 pt-2 pb-10 space-y-6 max-w-lg mx-auto">
          {/* Controls toolbar card: View toggle & day strip */}
          <div className="bg-white rounded-2xl border border-slate-100/80 p-3.5 sm:p-4 shadow-xs space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center p-1 rounded-2xl bg-slate-100/90 border border-slate-200/50">
                <MobileSkeleton width={58} height={28} borderRadius={10} />
                <MobileSkeleton width={58} height={28} borderRadius={10} />
              </div>
              <div className="flex items-center gap-1.5">
                <MobileSkeleton width={52} height={28} borderRadius={12} />
                <MobileSkeleton width={28} height={28} borderRadius={12} />
                <MobileSkeleton width={28} height={28} borderRadius={12} />
              </div>
            </div>

            {/* 7-col Week Day Strip */}
            <div className="grid grid-cols-7 border border-slate-200/70 rounded-2xl overflow-hidden divide-x divide-slate-100 bg-white">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center py-2 gap-1.5">
                  <MobileSkeleton width={18} height={10} borderRadius={2} />
                  <MobileSkeleton width={26} height={26} circle />
                </div>
              ))}
            </div>
          </div>

          {/* Schedule Events Timeline */}
          <div className="space-y-3">
            <SkeletonSectionHeader titleWidth={130} hasAction />
            <div className="space-y-3">
              <SkeletonEventCard />
              <SkeletonEventCard />
              <SkeletonEventCard isLast />
            </div>
          </div>

          {/* Quick Reminders */}
          <div className="space-y-2.5">
            <SkeletonSectionHeader titleWidth={115} hasAction />
            <div className="space-y-2">
              <SkeletonReminderRow />
              <SkeletonReminderRow />
            </div>
          </div>

          {/* Weekly Study Goal */}
          <div className="space-y-2.5">
            <SkeletonSectionHeader titleWidth={130} hasAction />
            <SkeletonWeeklyStudyGoal />
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 5. Mobile Settings Screen Skeleton                                          */
/* -------------------------------------------------------------------------- */
export const MobileSettingsScreenSkeleton: React.FC = () => {
  return (
    <div
      className="flex-1 flex flex-col min-h-0 w-full bg-[#f8fafc]"
      aria-busy="true"
      aria-label="Loading settings"
    >
      <SkeletonHeaderWithBack titleWidth={70} />
      <div className="flex-1 overflow-y-auto px-4 pt-3.5 pb-20 space-y-5 max-w-lg mx-auto w-full">
        {/* Profile Card mint gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#eafaf1] via-[#ebf9f2] to-[#ddf4e7] p-4 sm:p-5 border border-emerald-100/80 shadow-xs">
          <div className="flex items-start justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <MobileSkeleton width={56} height={56} circle className="shrink-0" />
              <div className="space-y-1 min-w-0">
                <MobileSkeleton width={120} height={18} borderRadius={4} />
                <MobileSkeleton width={100} height={12} borderRadius={4} />
                <MobileSkeleton width={140} height={11} borderRadius={4} />
              </div>
            </div>
            <MobileSkeleton width={78} height={26} borderRadius={8} className="shrink-0" />
          </div>
          <div className="mt-3.5 pt-3 border-t border-emerald-200/50 grid grid-cols-2 gap-2 text-[11px] relative z-10">
            <MobileSkeleton width="80%" height={12} borderRadius={4} />
            <MobileSkeleton width="75%" height={12} borderRadius={4} />
            <MobileSkeleton width="85%" height={12} borderRadius={4} />
            <MobileSkeleton width="70%" height={12} borderRadius={4} />
          </div>
        </div>

        {/* Section: Account */}
        <div className="space-y-1.5">
          <div className="px-0.5 mb-1">
            <MobileSkeleton width={70} height={14} borderRadius={4} />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="w-full bg-white rounded-xl p-3 flex items-center justify-between border border-slate-100 shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <MobileSkeleton width={36} height={36} circle className="shrink-0" />
                  <div className="space-y-1 min-w-0">
                    <MobileSkeleton width={100} height={13} borderRadius={4} />
                    <MobileSkeleton width={140} height={10} borderRadius={4} />
                  </div>
                </div>
                <MobileSkeleton width={16} height={16} borderRadius={4} />
              </div>
            ))}
          </div>
        </div>

        {/* Section: Community & Comms */}
        <div className="space-y-1.5">
          <div className="px-0.5 mb-1">
            <MobileSkeleton width={120} height={14} borderRadius={4} />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="w-full bg-white rounded-xl p-3 flex items-center justify-between border border-slate-100 shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <MobileSkeleton width={36} height={36} circle className="shrink-0" />
                  <div className="space-y-1 min-w-0">
                    <MobileSkeleton width={80} height={13} borderRadius={4} />
                    <MobileSkeleton width={150} height={10} borderRadius={4} />
                  </div>
                </div>
                <MobileSkeleton width={16} height={16} borderRadius={4} />
              </div>
            ))}
          </div>
        </div>

        {/* Section: Security */}
        <div className="space-y-1.5">
          <div className="px-0.5 mb-1">
            <MobileSkeleton width={70} height={14} borderRadius={4} />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="w-full bg-white rounded-xl p-3 flex items-center justify-between border border-slate-100 shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <MobileSkeleton width={36} height={36} circle className="shrink-0" />
                  <div className="space-y-1 min-w-0">
                    <MobileSkeleton width={110} height={13} borderRadius={4} />
                    <MobileSkeleton width={130} height={10} borderRadius={4} />
                  </div>
                </div>
                <MobileSkeleton width={16} height={16} borderRadius={4} />
              </div>
            ))}
          </div>
        </div>

        {/* Log out CTA */}
        <div className="pt-2">
          <MobileSkeleton width="100%" height={46} borderRadius={14} />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 6. Mobile Messages Screen Skeleton                                          */
/* -------------------------------------------------------------------------- */
export const MobileMessagesScreenSkeleton: React.FC = () => {
  return (
    <div
      className="flex-1 flex flex-col min-h-0 w-full bg-slate-50/50"
      aria-busy="true"
      aria-label="Loading messages"
    >
      <SkeletonTopAppBar />
      <div className="flex-1 overflow-y-auto">
        <SkeletonHeroBand eyebrowWidth={0} headingWidth={120} subtitleWidth={250} />
        <div className="px-4 pb-12 space-y-3.5 max-w-lg mx-auto">
          <SkeletonSearchBar />

          {/* Conversations list container */}
          <div className="bg-white rounded-3xl border border-slate-100 divide-y divide-slate-100 overflow-hidden shadow-2xs">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonConversationRow key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 7. Mobile Community Screen Skeleton                                         */
/* -------------------------------------------------------------------------- */
export const MobileCommunityScreenSkeleton: React.FC = () => {
  return (
    <div
      className="flex-1 flex flex-col min-h-0 w-full bg-slate-50/50"
      aria-busy="true"
      aria-label="Loading community"
    >
      <SkeletonTopAppBar />
      <div className="flex-1 overflow-y-auto">
        <SkeletonHeroBand
          eyebrowWidth={95}
          headingWidth={140}
          subtitleWidth={240}
          hasIllustration
        />
        <div className="px-4 pb-20 space-y-5 max-w-lg mx-auto">
          {/* Search bar */}
          <SkeletonSearchBar />

          {/* Category chips + Plus button */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0 flex items-center gap-1.5 overflow-x-hidden">
              <MobileSkeleton width={44} height={32} borderRadius={999} />
              <MobileSkeleton width={96} height={32} borderRadius={999} />
              <MobileSkeleton width={92} height={32} borderRadius={999} />
              <MobileSkeleton width={52} height={32} borderRadius={999} />
            </div>
            <MobileSkeleton width={38} height={38} borderRadius={12} className="shrink-0" />
          </div>

          {/* Featured Group Card */}
          <div className="p-4 bg-linear-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl text-white shadow-sm border border-emerald-700/60 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <MobileSkeleton width={60} height={18} borderRadius={999} className="bg-emerald-800/80" />
                <MobileSkeleton width={80} height={13} borderRadius={4} className="bg-emerald-800/80" />
              </div>
              <MobileSkeleton width={32} height={32} circle className="bg-emerald-800/80" />
            </div>
            <div className="space-y-1">
              <MobileSkeleton width="85%" height={18} borderRadius={4} className="bg-emerald-800/80" />
              <MobileSkeleton width="95%" height={13} borderRadius={4} className="bg-emerald-800/80" />
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <MobileSkeleton width={60} height={18} borderRadius={6} className="bg-emerald-800/80" />
              <MobileSkeleton width={70} height={18} borderRadius={6} className="bg-emerald-800/80" />
              <MobileSkeleton width={75} height={18} borderRadius={6} className="bg-emerald-800/80" />
            </div>
            <div className="pt-2 border-t border-emerald-700/50 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  <MobileSkeleton width={24} height={24} circle className="bg-emerald-800/80 ring-2 ring-emerald-950" />
                  <MobileSkeleton width={24} height={24} circle className="bg-emerald-800/80 ring-2 ring-emerald-950" />
                </div>
                <MobileSkeleton width={80} height={12} borderRadius={4} className="bg-emerald-800/80" />
              </div>
              <MobileSkeleton width={85} height={30} borderRadius={12} className="bg-emerald-100" />
            </div>
          </div>

          {/* Trending Topics Section */}
          <div className="space-y-2.5">
            <SkeletonSectionHeader titleWidth={115} hasAction={false} />
            <div className="space-y-2">
              <SkeletonTrendingRow withRank={false} />
              <SkeletonTrendingRow withRank={false} />
              <SkeletonTrendingRow withRank={false} />
            </div>
          </div>

          {/* Recent Discussions Section */}
          <div className="space-y-2.5">
            <SkeletonSectionHeader titleWidth={140} hasAction />
            <div className="space-y-2.5">
              <SkeletonDiscussionCard />
              <SkeletonDiscussionCard />
              <SkeletonDiscussionCard />
            </div>
          </div>

          {/* Mentor Spotlight Card */}
          <SkeletonMentorSpotlight />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 8. Mobile Help Center Screen Skeleton                                       */
/* -------------------------------------------------------------------------- */
export const MobileHelpCenterScreenSkeleton: React.FC = () => {
  return (
    <div
      className="flex-1 flex flex-col min-h-0 w-full bg-slate-50/50"
      aria-busy="true"
      aria-label="Loading help center"
    >
      <SkeletonTopAppBar />
      <div className="flex-1 overflow-y-auto">
        <SkeletonHeroBand
          eyebrowWidth={85}
          headingWidth={120}
          subtitleWidth={220}
          hasIllustration
        />
        <div className="px-4 pb-20 space-y-5 max-w-lg mx-auto">
          <SkeletonSearchBar />

          {/* Popular issues chips */}
          <div className="space-y-2">
            <MobileSkeleton width={85} height={12} borderRadius={4} className="px-1" />
            <div className="flex items-center gap-2 overflow-x-hidden py-1">
              <MobileSkeleton width={50} height={28} borderRadius={999} className="shrink-0" />
              <MobileSkeleton width={80} height={28} borderRadius={999} className="shrink-0" />
              <MobileSkeleton width={85} height={28} borderRadius={999} className="shrink-0" />
              <MobileSkeleton width={75} height={28} borderRadius={999} className="shrink-0" />
            </div>
          </div>

          {/* Single-device promo banner */}
          <div className="p-3.5 bg-linear-to-r from-emerald-50 via-teal-50/70 to-white rounded-2xl border border-emerald-200/80 shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <MobileSkeleton width={36} height={36} borderRadius={12} className="shrink-0" />
              <div className="space-y-1 min-w-0">
                <MobileSkeleton width={160} height={14} borderRadius={4} />
                <MobileSkeleton width={130} height={11} borderRadius={4} />
              </div>
            </div>
            <MobileSkeleton width={16} height={16} borderRadius={4} className="shrink-0" />
          </div>

          {/* Submit ticket CTA button */}
          <MobileSkeleton width="100%" height={46} borderRadius={16} />

          {/* Recent tickets */}
          <div className="space-y-2.5">
            <SkeletonSectionHeader titleWidth={110} hasAction />
            <div className="space-y-2">
              <SkeletonReminderRow />
              <SkeletonReminderRow />
            </div>
          </div>

          {/* Browse Help Categories 2-col Grid */}
          <div className="space-y-2.5">
            <SkeletonSectionHeader titleWidth={160} hasAction={false} />
            <div className="grid grid-cols-2 gap-2.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonHelpCategoryCard key={i} />
              ))}
            </div>
          </div>

          {/* Live Support Desk card */}
          <div className="p-4 bg-linear-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-3xl text-white shadow-sm flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1 space-y-1">
              <MobileSkeleton width={110} height={12} borderRadius={4} className="bg-emerald-500/80" />
              <MobileSkeleton width={170} height={15} borderRadius={4} className="bg-emerald-500/80" />
              <MobileSkeleton width={210} height={12} borderRadius={4} className="bg-emerald-500/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 9. Mobile Assignments Screen Skeleton                                       */
/* -------------------------------------------------------------------------- */
export const MobileAssignmentsScreenSkeleton: React.FC = () => {
  return (
    <div
      className="flex-1 flex flex-col min-h-0 w-full bg-slate-50/50"
      aria-busy="true"
      aria-label="Loading assignments"
    >
      <SkeletonTopAppBar />
      <div className="flex-1 overflow-y-auto">
        <SkeletonHeroBand
          eyebrowWidth={95}
          headingWidth={140}
          subtitleWidth={210}
          hasBanner
          hasIllustration
        />
        <div className="px-4 pt-2 pb-12 space-y-4 max-w-lg mx-auto">
          {/* Status filter tabs */}
          <div className="flex gap-1.5 p-1 bg-slate-100/80 rounded-2xl">
            <MobileSkeleton width={60} height={28} borderRadius={12} />
            <MobileSkeleton width={88} height={28} borderRadius={12} />
            <MobileSkeleton width={80} height={28} borderRadius={12} />
            <MobileSkeleton width={70} height={28} borderRadius={12} />
          </div>

          {/* Progress Ring Summary Card */}
          <SkeletonAssignmentProgressRing />

          {/* Assignments list */}
          <section aria-label="Assignments List" className="space-y-3 pt-1">
            <SkeletonSectionHeader titleWidth={120} hasAction={false} />
            <div className="space-y-3">
              <SkeletonAssignmentCard />
              <SkeletonAssignmentCard />
              <SkeletonAssignmentCard />
              <SkeletonAssignmentCard />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
