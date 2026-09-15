import React, { useState, useEffect } from 'react';
import { MetricObservation, LearningRecord } from '../types';
import { submitOutcome, fetchLearning } from '../services/api';
import { Activity, X, RotateCcw, ArrowUpRight, Loader2 } from 'lucide-react';

interface LearningPanelProps {
  changeId: string;
  onClose: () => void;
}

export const LearningPanel: React.FC<LearningPanelProps> = ({
  changeId,
  onClose
}) => {
  const [metricName, setMetricName] = useState('Free Trial Conversion Rate');
  const [predictedVal, setPredictedVal] = useState(-8.0);
  const [observedVal, setObservedVal] = useState(-5.2);
  const [observations, setObservations] = useState<MetricObservation[]>([
    {
      metric_name: 'Free Trial Conversion Rate',
      predicted_change: -8.0,
      observed_change: -5.2,
      variance: 2.8,
      confidence_score: 0.92,
      timestamp: new Date().toISOString()
    }
  ]);

  const [learningRecords, setLearningRecords] = useState<LearningRecord[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadLearningData();
  }, [changeId]);

  const loadLearningData = async () => {
    try {
      const records = await fetchLearning(changeId);
      if (records && records.length > 0) setLearningRecords(records);
    } catch (err) {
      console.error('Failed to fetch learning records:', err);
    }
  };

  const handleAddObservation = async () => {
    setSubmitting(true);
    try {
      const variance = Number((observedVal - predictedVal).toFixed(2));
      const newObs: MetricObservation = {
        metric_name: metricName,
        predicted_change: predictedVal,
        observed_change: observedVal,
        variance: variance,
        confidence_score: 0.90,
        timestamp: new Date().toISOString()
      };

      await submitOutcome(changeId, [newObs]);
      setObservations([...observations, newObs]);
      await loadLearningData();
    } catch (err) {
      console.error('Failed to submit outcome:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed right-4 top-24 bottom-24 z-50 w-full max-w-xl bg-[#0E1320]/95 border border-[#B8E986]/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-[#121829] pb-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-[#B8E986]" />
            <h3 className="font-mono text-base font-bold text-[#F5F3EE] uppercase tracking-wider">
              Outcomes & Learning Loop
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Observation Telemetry List */}
        <div className="space-y-3 font-mono">
          <span className="text-xs text-slate-400 uppercase font-bold block">Measured Metric Telemetry</span>
          {observations.map((obs, idx) => (
            <div key={idx} className="bg-[#121829] border border-[#262838] rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-100 uppercase">{obs.metric_name}</span>
                <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-1">
                  <span>Predicted: <strong className="text-slate-200">{obs.predicted_change}%</strong></span>
                  <span>Observed: <strong className="text-[#35D6C5]">{obs.observed_change}%</strong></span>
                </div>
              </div>

              <div className="bg-[#B8E986]/10 text-[#B8E986] border border-[#B8E986]/30 px-3 py-1 rounded-lg text-xs font-bold flex items-center space-x-1">
                <ArrowUpRight className="w-4 h-4" />
                <span>Delta: +{obs.variance}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Autonomous Learning Records */}
        {learningRecords.length > 0 && (
          <div className="space-y-2 font-mono">
            <span className="text-xs text-[#B8E986] uppercase font-bold block">Autonomous Organizational Learning</span>
            {learningRecords.map((rec, idx) => (
              <div key={idx} className="bg-[#121829] border border-[#B8E986]/30 rounded-xl p-3 text-xs">
                <span className="text-slate-200 font-bold block">{rec.learned_pattern}</span>
                <p className="text-[11px] text-slate-400 mt-0.5">{rec.model_update_summary}</p>
              </div>
            ))}
          </div>
        )}

        {/* Add Metric Form */}
        <div className="bg-[#121829] border border-[#262838] rounded-xl p-4 space-y-3 font-mono">
          <span className="text-xs text-slate-400 uppercase font-bold block">Record Live Metric Telemetry</span>
          <div>
            <label className="block text-[10px] text-slate-400 mb-1 uppercase">Metric Name</label>
            <input
              type="text"
              value={metricName}
              onChange={(e) => setMetricName(e.target.value)}
              className="w-full bg-[#080B12] border border-[#262838] rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#B8E986]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 mb-1 uppercase">Predicted %</label>
              <input
                type="number"
                step="0.1"
                value={predictedVal}
                onChange={(e) => setPredictedVal(parseFloat(e.target.value))}
                className="w-full bg-[#080B12] border border-[#262838] rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#B8E986]"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1 uppercase">Observed %</label>
              <input
                type="number"
                step="0.1"
                value={observedVal}
                onChange={(e) => setObservedVal(parseFloat(e.target.value))}
                className="w-full bg-[#080B12] border border-[#262838] rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#B8E986]"
              />
            </div>
          </div>

          <button
            onClick={handleAddObservation}
            disabled={submitting}
            className="w-full bg-[#B8E986] text-[#080B12] font-mono font-bold text-xs py-2 rounded-lg hover:bg-[#B8E986]/90 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <RotateCcw className="w-4 h-4" />
                <span>CALIBRATE GRAPH WEIGHTS</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-[#121829] flex justify-end">
        <button onClick={onClose} className="bg-[#121829] hover:bg-[#1A2235] text-slate-200 border border-[#262838] px-4 py-2 rounded-xl text-xs font-mono">
          CLOSE LEARNING PANEL
        </button>
      </div>
    </div>
  );
};
