import React from "react";
import { CheckCircle2, AlertCircle, Info, XCircle, X } from "lucide-react";
import { ToastMessage } from "../../types";

export interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ),
          info: <Info className="w-4 h-4 text-indigo-400 shrink-0" />,
          warning: <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />,
          error: <XCircle className="w-4 h-4 text-rose-400 shrink-0" />,
        };

        const borders = {
          success: "border-emerald-800/60 bg-emerald-950/90 text-emerald-100",
          info: "border-indigo-800/60 bg-indigo-950/90 text-indigo-100",
          warning: "border-amber-800/60 bg-amber-950/90 text-amber-100",
          error: "border-rose-800/60 bg-rose-950/90 text-rose-100",
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto border rounded-xl p-3.5 shadow-xl backdrop-blur-md flex items-start justify-between gap-3 transition-all animate-in fade-in slide-in-from-bottom-2 ${borders[toast.type]}`}
          >
            <div className="flex items-start gap-2.5">
              {icons[toast.type]}
              <div>
                <h4 className="text-xs font-bold leading-tight">
                  {toast.title}
                </h4>
                {toast.description && (
                  <p className="text-[11px] opacity-80 mt-0.5 leading-snug">
                    {toast.description}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
