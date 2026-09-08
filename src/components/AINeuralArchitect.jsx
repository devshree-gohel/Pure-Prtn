import React, { useState, useMemo } from 'react';
import { EDITIONS } from '../lib/constants';
import { soundEngine } from '../lib/audioManager';
import { Cpu, Dna, Sparkles, Activity, CheckCircle, ArrowRight, Binary, Zap } from 'lucide-react';

export default function AINeuralArchitect({ activeEdition, setActiveEdition }) {
  const [trainingMode, setTrainingMode] = useState('hypertrophy');
  const [recoveryWindow, setRecoveryWindow] = useState('immediate');
  const [biomarker, setBiomarker] = useState('mtor');
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Compute real-time simulated AI prediction tensors based on user input
  const aiPredictions = useMemo(() => {
    let recommendedCategory = EDITIONS[0];
    let bioAvailability = 99.4;
    let mtorScore = 98.6;
    let clearanceTime = 14;
    let peptideChain = '1.2 kDa Cleaved Di-Peptides';
    let leucineDose = '3.2g Free-Form';
    let tensorId = 'NEURAL-TENSOR // V4.8.2';

    if (trainingMode === 'endurance' || biomarker === 'joint') {
      recommendedCategory = EDITIONS[2]; // Clear Collagen & EAA
      bioAvailability = 98.8;
      mtorScore = 92.4;
      clearanceTime = 16;
      peptideChain = '2.1 kDa Marine Hydrolysate';
      leucineDose = '3.0g Full Spectrum EAA';
      tensorId = 'COLLAGEN-TENSOR // V2.1.0';
    } else if (biomarker === 'digestive' || trainingMode === 'hybrid') {
      recommendedCategory = EDITIONS[1]; // Plant Peptides
      bioAvailability = 97.9;
      mtorScore = 94.1;
      clearanceTime = 20;
      peptideChain = '1.8 kDa Fermented Seed Matrix';
      leucineDose = '2.8g Bio-Fermented';
      tensorId = 'PLANT-ADAPT // V3.4.1';
    }

    return {
      recommendedCategory,
      bioAvailability,
      mtorScore,
      clearanceTime,
      peptideChain,
      leucineDose,
      tensorId,
    };
  }, [trainingMode, recoveryWindow, biomarker]);

  const handleApplyAI = () => {
    soundEngine.playClickTone();
    setIsSynthesizing(true);
    setTimeout(() => {
      setActiveEdition(aiPredictions.recommendedCategory);
      setIsSynthesizing(false);
      soundEngine.playActivateTone();
      // Smooth scroll to showcase
      const showcaseElem = document.getElementById('showcase');
      if (showcaseElem) {
        showcaseElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
  };

  return (
    <section id="ai-engine" className="w-full bg-[#050505] text-[#F5F5F0] py-32 px-6 md:px-12 border-t border-[#1a1a1a] relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#222]">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#B7FF00] animate-pulse"></span>
              <span className="font-mono text-xs text-[#B7FF00] tracking-widest uppercase">
                // MACHINE LEARNING PEPTIDE ARCHITECT
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight">
              NEURAL BIO-FORMULATOR
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-[#858585] flex items-center space-x-2">
            <Cpu size={16} className="text-[#B7FF00]" />
            <span>ON-DEVICE PEPTIDE SEQUENCE INFERENCE</span>
          </div>
        </div>

        {/* AI Input Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Biological Input Parameters */}
          <div className="lg:col-span-6 space-y-8 bg-[#090909] border border-[#1f1f1f] p-8 rounded-sm">
            {/* 1. Training Stimulus */}
            <div>
              <span className="font-mono text-xs text-[#858585] uppercase tracking-wider block mb-3 flex items-center space-x-2">
                <Activity size={14} className="text-[#B7FF00]" />
                <span>01. TRAINING EXERTION PROFILE:</span>
              </span>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                {[
                  { id: 'hypertrophy', label: 'HYPERTROPHY', sub: 'Max mTOR' },
                  { id: 'endurance', label: 'ENDURANCE', sub: 'Mitochondrial' },
                  { id: 'hybrid', label: 'HYBRID ATHLETE', sub: 'Mixed Load' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundEngine.playClickTone();
                      setTrainingMode(item.id);
                    }}
                    className={`p-3 rounded border text-left transition-all cursor-pointer ${
                      trainingMode === item.id
                        ? 'bg-[#B7FF00] text-[#050505] border-[#B7FF00] font-bold shadow-[0_0_15px_rgba(183,255,0,0.2)]'
                        : 'bg-[#111] text-[#858585] border-[#222] hover:border-[#444] hover:text-[#F5F5F0]'
                    }`}
                  >
                    <span className="block">{item.label}</span>
                    <span className="text-[9px] opacity-75">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Absorption Window */}
            <div>
              <span className="font-mono text-xs text-[#858585] uppercase tracking-wider block mb-3 flex items-center space-x-2">
                <Zap size={14} className="text-[#B7FF00]" />
                <span>02. GASTRIC ABSORPTION WINDOW:</span>
              </span>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                {[
                  { id: 'immediate', label: '15-MIN CRUSH', sub: 'Post-Workout' },
                  { id: 'sustained', label: '3-4 HR SUSTAIN', sub: 'Anti-Catabolic' },
                  { id: 'nocturnal', label: 'OVERNIGHT', sub: 'Slow Cleave' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundEngine.playClickTone();
                      setRecoveryWindow(item.id);
                    }}
                    className={`p-3 rounded border text-left transition-all cursor-pointer ${
                      recoveryWindow === item.id
                        ? 'bg-[#B7FF00] text-[#050505] border-[#B7FF00] font-bold shadow-[0_0_15px_rgba(183,255,0,0.2)]'
                        : 'bg-[#111] text-[#858585] border-[#222] hover:border-[#444] hover:text-[#F5F5F0]'
                    }`}
                  >
                    <span className="block">{item.label}</span>
                    <span className="text-[9px] opacity-75">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Biomarker Priority */}
            <div>
              <span className="font-mono text-xs text-[#858585] uppercase tracking-wider block mb-3 flex items-center space-x-2">
                <Dna size={14} className="text-[#B7FF00]" />
                <span>03. PRIMARY BIOMARKER GOAL:</span>
              </span>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                {[
                  { id: 'mtor', label: 'mTOR PEAK', sub: 'Muscle Mass' },
                  { id: 'joint', label: 'JOINT & EAA', sub: 'Cellular Elasticity' },
                  { id: 'digestive', label: 'ZERO BLOAT', sub: 'Adaptogenic' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundEngine.playClickTone();
                      setBiomarker(item.id);
                    }}
                    className={`p-3 rounded border text-left transition-all cursor-pointer ${
                      biomarker === item.id
                        ? 'bg-[#B7FF00] text-[#050505] border-[#B7FF00] font-bold shadow-[0_0_15px_rgba(183,255,0,0.2)]'
                        : 'bg-[#111] text-[#858585] border-[#222] hover:border-[#444] hover:text-[#F5F5F0]'
                    }`}
                  >
                    <span className="block">{item.label}</span>
                    <span className="text-[9px] opacity-75">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Real-Time Neural Inference Output Card */}
          <div className="lg:col-span-6 bg-[#090909] border border-[#1f1f1f] p-8 rounded-sm relative overflow-hidden flex flex-col justify-between">
            {/* Ambient Shader Glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none"
              style={{ backgroundColor: aiPredictions.recommendedCategory.color }}
            ></div>

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#1f1f1f]">
                <div className="flex items-center space-x-2 font-mono text-xs text-[#858585]">
                  <Binary size={16} className="text-[#B7FF00]" />
                  <span>{aiPredictions.tensorId}</span>
                </div>
                <span className="font-mono text-[10px] bg-[#B7FF00]/10 text-[#B7FF00] px-2 py-1 rounded border border-[#B7FF00]/30 font-bold">
                  AI PREDICTED MATCH
                </span>
              </div>

              {/* Recommended Category Headline */}
              <div className="my-6">
                <span className="font-mono text-xs text-[#858585] block mb-1">
                  OPTIMAL RECOMMENDED FORMULA:
                </span>
                <h3 className="font-display text-3xl md:text-4xl text-[#F5F5F0] tracking-tight">
                  {aiPredictions.recommendedCategory.name}
                </h3>
                <p className="font-mono text-xs text-[#B7FF00] font-semibold mt-1">
                  {aiPredictions.recommendedCategory.protein} • {aiPredictions.recommendedCategory.flavor}
                </p>
              </div>

              {/* AI Tensor Prediction Metrics */}
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#858585]">PREDICTED BIOAVAILABILITY INDEX</span>
                    <span className="text-[#B7FF00] font-bold">{aiPredictions.bioAvailability}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#B7FF00] transition-all duration-500"
                      style={{ width: `${aiPredictions.bioAvailability}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#858585]">mTOR SYNTHESIS PATHWAY ACTIVATION</span>
                    <span className="text-[#B7FF00] font-bold">{aiPredictions.mtorScore}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#B7FF00] transition-all duration-500"
                      style={{ width: `${aiPredictions.mtorScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#1a1a1a] text-[11px]">
                  <div>
                    <span className="text-[#858585] block">GASTRIC CLEARANCE:</span>
                    <span className="text-[#F5F5F0] font-bold">{aiPredictions.clearanceTime} MINUTES</span>
                  </div>
                  <div>
                    <span className="text-[#858585] block">PEPTIDE MOLECULAR WT:</span>
                    <span className="text-[#F5F5F0] font-bold">{aiPredictions.peptideChain}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button: Apply to 3D Bottle */}
            <div className="mt-8 pt-6 border-t border-[#1a1a1a]">
              <button
                onClick={handleApplyAI}
                disabled={isSynthesizing}
                className="w-full bg-[#B7FF00] hover:bg-[#a6e600] text-[#050505] font-display text-lg tracking-wider py-4 rounded transition-transform hover:scale-[1.01] flex items-center justify-center space-x-2 font-bold cursor-pointer shadow-[0_0_25px_rgba(183,255,0,0.25)]"
              >
                {isSynthesizing ? (
                  <span className="animate-pulse">SYNTHESIZING NEURAL SHADER...</span>
                ) : (
                  <>
                    <span>APPLY AI SEQUENCE TO 3D VESSEL</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
