import { X } from "lucide-react";
import { WeeklyGoalPicker } from "../../WeeklyGoalPicker";

interface EditStudyGoalModalProps {
  targetGoalInput: number;
  onClose: () => void;
  onSaveGoal: (hours: number) => void;
}

export function EditStudyGoalModal({
  targetGoalInput,
  onClose,
  onSaveGoal,
}: EditStudyGoalModalProps) {
  return (
    <div className="calendar-modal-backdrop" onClick={onClose}>
      <div
        className="calendar-modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="edit-goal-title"
      >
        <div className="calendar-modal__header">
          <h2 id="edit-goal-title" className="calendar-modal__title">
            Edit Weekly Study Goal
          </h2>
          <button
            type="button"
            className="calendar-modal__close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="pt-2">
          <WeeklyGoalPicker
            initialHours={targetGoalInput}
            confirmLabel="Update Goal"
            onConfirm={onSaveGoal}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
