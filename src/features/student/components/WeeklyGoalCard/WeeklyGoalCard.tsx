import { useState } from "react";
import { SlidersHorizontal, X, Clock } from "lucide-react";
import fireAsset from "../../../../Assets/fire.webp";
import { useToast } from "../../../../hooks/useToast";
import { ToastNotification } from "../../../../components/ui/ToastNotification";
import { ProgressRing } from "../../../../components/ui/ProgressRing";
import { WeeklyGoalPicker, WEEKLY_GOAL } from "../../../../components/ui/WeeklyGoalPicker";
import type { WeeklyGoalCardProps } from "./weekly-goal-card.types";
import "./WeeklyGoalCard.css";

const WEEK_DAYS_INFO = ["S", "M", "T", "W", "T", "F", "S"] as const;

interface WeeklyGoalRingProps {
  percentage: number | null;
  isCompletedOrExceeded: boolean;
}

function WeeklyGoalRing({ percentage, isCompletedOrExceeded }: WeeklyGoalRingProps) {
  return (
    <div
      className={`weekly-goal-ring relative size-39.5 shrink-0 ${
        isCompletedOrExceeded ? "weekly-goal-ring--pulse" : ""
      }`}
      aria-hidden="true"
    >
      <ProgressRing
        size={120}
        radius={50}
        percentage={percentage ?? 0}
        strokeWidth={8}
        className="size-full rotate-[-82deg]"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[30px] font-semibold leading-none text-(--color-text-primary)">
          {percentage === null ? "—" : `${percentage}%`}
        </span>
        <span className="mt-2 text-[13px] font-normal leading-none text-(--color-text-secondary)">
          {percentage === null ? "activity unavailable" : isCompletedOrExceeded ? "Goal Reached! 🎉" : "of weekly goal"}
        </span>
      </div>
    </div>
  );
}

export function WeeklyGoalCard({
  completedHours: initialCompletedHours,
  targetHours: initialTargetHours = WEEKLY_GOAL.defaultHours,
  completedDays,
  goalSet: initialGoalSet = false,
  onGoalSet,
}: WeeklyGoalCardProps) {
  const [targetHours, setTargetHours] = useState(initialTargetHours);
  const [goalSet, setGoalSet] = useState(initialGoalSet);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toastMessage, showToast } = useToast();

  const safeCompletedHours = initialCompletedHours === undefined ? null : Math.max(0, initialCompletedHours);
  const safeTargetHours = Math.max(1, targetHours);
  const percentage = safeCompletedHours === null ? null : Math.round((safeCompletedHours / safeTargetHours) * 100);
  const isGoalMet = percentage !== null && percentage >= 100;
  const progressDescription = safeCompletedHours === null ? `Weekly goal: activity unavailable, target ${safeTargetHours} hours` : `Weekly goal: ${safeCompletedHours} of ${safeTargetHours} hours completed, ${percentage} percent`;

  const handleFirstGoalSet = (hours: number) => {
    setTargetHours(hours);
    setGoalSet(true);
    onGoalSet?.(hours);
    showToast(`Weekly goal set to ${hours} hours/week! 🎯`);
  };

  return (
    <article
      className="weekly-goal-card relative flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-(--color-border-subtle) bg-(--color-surface)"
      aria-label={goalSet ? progressDescription : "Set your weekly study goal"}
    >
      <ToastNotification message={toastMessage} />

      <header className="weekly-goal-header flex h-8 shrink-0 items-center justify-between">
        <h2 className="text-base font-semibold leading-[1.2] text-(--color-text-primary)">
          Weekly Goal
        </h2>
        {goalSet && (
          <button
            type="button"
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="weekly-goal-options grid size-8.5 place-items-center rounded-(--border-radius-media) border border-(--color-border-subtle) bg-(--color-surface) text-(--color-text-primary) hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-focus-ring) focus-visible:ring-offset-2 cursor-pointer"
            aria-label="Edit weekly goal"
          >
            <SlidersHorizontal size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        )}
      </header>

      {/* ── First-time setup state ── */}
      {!goalSet ? (
        <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center">
          <WeeklyGoalPicker
            initialHours={targetHours}
            onConfirm={handleFirstGoalSet}
          />
        </div>

      ) : (
        <>
          <div className="weekly-goal-body flex min-h-0 flex-1 flex-col items-center pt-3">
            <WeeklyGoalRing
              percentage={percentage}
              isCompletedOrExceeded={isGoalMet}
            />
            <p className="weekly-goal-hours mt-2.5 text-[14px] font-semibold leading-5 text-(--color-text-primary)">
              {safeCompletedHours === null ? "—" : safeCompletedHours} / {safeTargetHours} hours
            </p>
            <p className="weekly-goal-message mt-1 text-[13px] font-normal leading-4.5 text-(--color-text-secondary)">
              {safeCompletedHours === null ? "Activity unavailable" : isGoalMet ? "Goal crushed!" : "Keep it up!"}
              <img className="weekly-goal-fire" src={fireAsset} alt="" aria-hidden="true" />
            </p>
          </div>

          <div className="weekly-goal-days mt-3 grid w-full shrink-0 grid-cols-7" aria-label={completedDays ? "Weekly activity" : "Weekly activity unavailable"}>
            {WEEK_DAYS_INFO.map((day, index) => (
              <div key={`${day}-${index}`} className="flex flex-col items-center" aria-hidden="true">
                <span className={`size-2.75 rounded-full ${completedDays?.[index] ? "bg-(--color-brand)" : "border-[1.5px] border-[#94a3b8] bg-(--color-surface)"}`} />
                <span className="mt-1 text-12px font-semibold leading-4 text-[#374151]">{day}</span>
              </div>
            ))}
          </div>
          {completedDays ? null : <p className="sr-only" role="status">Daily study activity is unavailable.</p>}
        </>
      )}

      {/* Edit Goal Modal (only shown after goal is set) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-label="Set Weekly Goal Modal"
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="size-5 text-(--color-brand,#20a862)" />
                <h3 className="text-base font-bold text-slate-900">Set Weekly Goal</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="pt-4">
              <WeeklyGoalPicker
                initialHours={targetHours}
                confirmLabel="Save goal"
                onConfirm={(hours) => {
                  setTargetHours(hours);
                  setIsModalOpen(false);
                  showToast(`Weekly goal updated to ${hours} hours/week!`);
                }}
                onCancel={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </article>
  );
}