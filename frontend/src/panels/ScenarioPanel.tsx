import React, { useState } from 'react';
import { GitBranch, X } from 'lucide-react';

interface ScenarioPanelProps {
  changeId?: string;
  onClose: () => void;
}

export const ScenarioPanel: React.FC<ScenarioPanelProps> = ({
  onClose
}) => {
  const [selectedScenario, setSelectedScenario] = useState<'CONSERVATIVE' | 'EXPECTED' | 'ADVERSE'>('EXPECTED');

  const scenarios = [
    {
      id: 'CONSERVATIVE',
      name: 'CONSERVATIVE TRACK',
      probability: '35%',
      impact: 'Trial conversion declines slightly by -2.5%; support volume increases by +10%.',
      activationDelta: '-2.5%',
      revenueDelta: '+4.2%',
      supportDelta: '+10%',
      guardrail: 'Enable in-app self-serve onboarding guides.'
    },
    {
      id: 'EXPECTED',
      name: 'EXPECTED TRACK',
      probability: '50%',
      impact: 'Trial conversion declines by -5.2%; activation velocity improves by +18%.',
      activationDelta: '-5.2%',
      revenueDelta: '+8.5%',
      supportDelta: '+18%',
      guardrail: 'Deploy automated 3-day activation email sequence.'
    },
    {
      id: 'ADVERSE',
      name: 'ADVERSE TRACK',
      probability: '15%',
      impact: 'Trial conversion drops steeply by -12.0%; severe activation friction observed.',
      activationDelta: '-12.0%',
      revenueDelta: '-3.1%',
      supportDelta: '+35%',
      guardrail: 'Immediate rollback threshold at >10% conversion drop within 72 hours.'
    }
  ];

  return (
    <div className="fixed right-4 top-24 bottom-24 z-50 w-full max-w-xl bg-[#0E1320]/95 border border-[#73B7FF]/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-[#121829] pb-4">
          <div className="flex items-center space-x-2">
            <GitBranch className="w-5 h-5 text-[#73B7FF]" />
            <h3 className="font-mono text-base font-bold text-[#F5F3EE] uppercase tracking-wider">
              Scenario Lab & Comparison Surface
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Track Selector Tabs */}
        <div className="grid grid-cols-3 gap-2">
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setSelectedScenario(sc.id as any)}
              className={`p-3 rounded-xl border text-center font-mono transition-all ${
                selectedScenario === sc.id
                  ? 'bg-[#73B7FF]/20 border-[#73B7FF] text-[#73B7FF] font-bold'
                  : 'bg-[#121829] border-[#262838] text-slate-400 hover:border-slate-600'
              }`}
            >
              <span className="text-[10px] block uppercase text-slate-400">PROBABILITY: {sc.probability}</span>
              <span className="text-xs mt-1 block uppercase font-bold">{sc.id}</span>
            </button>
          ))}
        </div>

        {/* Selected Scenario Details */}
        {scenarios.filter(s => s.id === selectedScenario).map(sc => (
          <div key={sc.id} className="bg-[#121829] border border-[#262838] rounded-xl p-5 space-y-4 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-100">{sc.name}</span>
              <span className="text-xs text-[#73B7FF] bg-[#73B7FF]/10 px-2.5 py-1 rounded border border-[#73B7FF]/30">
                Probability: {sc.probability}
              </span>
            </div>

            <p className="text-xs text-slate-300 font-sans">
              {sc.impact}
            </p>

            <div className="grid grid-cols-3 gap-3 bg-[#080B12] p-3 rounded-lg border border-[#262838] text-center">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Activation Delta</span>
                <span className="text-xs font-bold text-[#FF6B5E] mt-0.5 block">{sc.activationDelta}</span>
              </div>
              <div className="border-l border-[#262838]">
                <span className="text-[10px] text-slate-400 block uppercase">ARR Exposure</span>
                <span className="text-xs font-bold text-[#35D6C5] mt-0.5 block">{sc.revenueDelta}</span>
              </div>
              <div className="border-l border-[#262838]">
                <span className="text-[10px] text-slate-400 block uppercase">Support Load</span>
                <span className="text-xs font-bold text-[#F4C95D] mt-0.5 block">{sc.supportDelta}</span>
              </div>
            </div>

            <div className="bg-[#B8E986]/10 border border-[#B8E986]/30 p-3 rounded-lg text-xs">
              <span className="text-[10px] text-[#B8E986] uppercase font-bold block">RECOMMENDED SCENARIO GUARDRAIL</span>
              <span className="text-slate-200 mt-1 block font-medium">{sc.guardrail}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-[#121829] flex justify-end">
        <button onClick={onClose} className="bg-[#121829] hover:bg-[#1A2235] text-slate-200 border border-[#262838] px-4 py-2 rounded-xl text-xs font-mono">
          CLOSE SCENARIO LAB
        </button>
      </div>
    </div>
  );
};
