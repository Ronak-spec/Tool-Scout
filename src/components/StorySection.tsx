import React, { useState, useEffect, useRef } from 'react';

interface StorySectionProps {
  onNavigate: (path: string) => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState<'discover' | 'compare' | 'verify'>('discover');
  const [activeChoice, setActiveChoice] = useState<number>(1);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  const stepKeys: Array<'discover' | 'compare' | 'verify'> = ['discover', 'compare', 'verify'];
  const stepIndex = stepKeys.indexOf(activeStep);
  const stepNumberStr = String(stepIndex + 1).padStart(2, '0');

  useEffect(() => {
    const handleScroll = () => {
      if (!stepsContainerRef.current) return;
      const stepElements = stepsContainerRef.current.querySelectorAll<HTMLElement>('[data-story-step]');
      const midpoint = window.innerHeight * 0.5;

      let nearest = stepElements[0];
      let nearestDistance = Infinity;

      stepElements.forEach(step => {
        const rect = step.getBoundingClientRect();
        const dist = Math.abs((rect.top + rect.bottom) * 0.5 - midpoint);
        if (dist < nearestDistance) {
          nearest = step;
          nearestDistance = dist;
        }
      });

      if (nearest) {
        const stepName = nearest.dataset.storyStep as 'discover' | 'compare' | 'verify';
        if (stepName && stepKeys.includes(stepName)) {
          setActiveStep(stepName);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChoiceClick = (choiceNum: number, targetPath: string) => {
    setActiveChoice(choiceNum);
    onNavigate(targetPath);
  };

  return (
    <section className="story-section" aria-labelledby="story-headline">
      <div className="wrap story-intro">
        <span className="eyebrow">The ToolScout way</span>
        <h2 id="story-headline">
          From scrolling<br />
          to a <span className="serif">clear next step.</span>
        </h2>
        <p className="lede">
          Follow one simple path from a task you have to a tool worth checking.
        </p>
      </div>

      <div className="wrap story-layout" data-story>
        <div className="story-steps" ref={stepsContainerRef}>
          <article
            className="story-step"
            data-story-step="discover"
            aria-current={activeStep === 'discover' ? 'step' : undefined}
            onClick={() => setActiveStep('discover')}
            style={{ cursor: 'pointer' }}
          >
            <div className="story-step-meta">
              <span>01 / DISCOVER</span>
              <span>BEGIN WITH THE WORK</span>
            </div>
            <h3>Start with the work.</h3>
            <p>Choose what you are trying to do. Browse by task, not by whatever is trending this week.</p>
            <span className="story-scroll-hint">
              Keep scrolling <span aria-hidden="true">↓</span>
            </span>
          </article>

          <article
            className="story-step"
            data-story-step="compare"
            aria-current={activeStep === 'compare' ? 'step' : undefined}
            onClick={() => setActiveStep('compare')}
            style={{ cursor: 'pointer' }}
          >
            <div className="story-step-meta">
              <span>02 / COMPARE</span>
              <span>MAKE THE TRADE-OFFS CLEAR</span>
            </div>
            <h3>See what actually differs.</h3>
            <p>Compare fit, pricing model, and platform side by side—without made-up scores or paid rankings.</p>
            <span className="story-scroll-hint">
              Keep scrolling <span aria-hidden="true">↓</span>
            </span>
          </article>

          <article
            className="story-step"
            data-story-step="verify"
            aria-current={activeStep === 'verify' ? 'step' : undefined}
            onClick={() => setActiveStep('verify')}
            style={{ cursor: 'pointer' }}
          >
            <div className="story-step-meta">
              <span>03 / VERIFY</span>
              <span>FINISH WITH THE SOURCE</span>
            </div>
            <h3>Check details with the maker.</h3>
            <p>Open the official product page for current pricing, limits, and terms before you decide.</p>
            <span className="story-scroll-hint">
              That is the whole idea <span aria-hidden="true">↗</span>
            </span>
          </article>
        </div>

        <div className="story-pin">
          <div
            className="story-stage"
            data-story-stage
            data-active-step={activeStep}
            aria-label="Illustrative ToolScout interface that changes with each step"
          >
            <div className="story-stage-chrome">
              <span className="story-stage-brand">
                <span className="story-stage-dot"></span> TOOLSCOUT <span className="story-stage-divider">/</span> FIELD GUIDE
              </span>
              <span className="story-stage-count">
                <span>{stepNumberStr}</span>
                <span className="story-stage-total"> / 03</span>
              </span>
            </div>

            <div className="story-stage-window">
              {/* Scene 1: Discover */}
              <div className="story-scene" data-story-scene="discover">
                <span className="story-scene-label">A BETTER STARTING POINT</span>
                <h3>What are you here to do?</h3>
                <p>Pick a task. Start with a short list.</p>
                <div className="story-choice-grid">
                  <div
                    className={`story-choice ${activeChoice === 1 ? 'story-choice--active' : ''}`}
                    onClick={() => handleChoiceClick(1, '/use-case/writing/')}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="story-choice-icon">01</span>
                    <span>Research &amp; write</span>
                    <span className="story-choice-arrow">↗</span>
                  </div>
                  <div
                    className={`story-choice ${activeChoice === 2 ? 'story-choice--active' : ''}`}
                    onClick={() => handleChoiceClick(2, '/category/visual-design/')}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="story-choice-icon">02</span>
                    <span>Design &amp; create</span>
                    <span className="story-choice-arrow">↗</span>
                  </div>
                  <div
                    className={`story-choice ${activeChoice === 3 ? 'story-choice--active' : ''}`}
                    onClick={() => handleChoiceClick(3, '/category/productivity/')}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="story-choice-icon">03</span>
                    <span>Plan &amp; organise</span>
                    <span className="story-choice-arrow">↗</span>
                  </div>
                </div>
              </div>

              {/* Scene 2: Compare */}
              <div className="story-scene" data-story-scene="compare">
                <span className="story-scene-label">A CLEARER SIDE-BY-SIDE</span>
                <h3>Compare what matters.</h3>
                <p>No mystery scoring. Just useful questions.</p>
                <div className="story-compare-board">
                  <div className="story-compare-head">
                    <span>DECISION DETAIL</span>
                    <span>LOOK FOR</span>
                  </div>
                  <div className="story-compare-row">
                    <span>Best fit</span>
                    <strong>Matches your task</strong>
                  </div>
                  <div className="story-compare-row">
                    <span>Pricing model</span>
                    <strong>What is included</strong>
                  </div>
                  <div className="story-compare-row">
                    <span>Platform</span>
                    <strong>Where it works</strong>
                  </div>
                  <div className="story-compare-foot">
                    <span>COMPARE UP TO THREE</span>
                    <span>03 / 03</span>
                  </div>
                </div>
              </div>

              {/* Scene 3: Verify */}
              <div className="story-scene" data-story-scene="verify">
                <span className="story-scene-label">THE FINAL CHECK</span>
                <h3>Go straight to the maker.</h3>
                <p>Confirm the live details before choosing.</p>
                <div className="story-maker-card">
                  <span className="story-maker-icon" aria-hidden="true">
                    ↗
                  </span>
                  <span className="story-maker-copy">
                    <strong>Official product page</strong>
                    <small>Current pricing, limits &amp; terms</small>
                  </span>
                  <span className="story-direct-tag">DIRECT LINK</span>
                </div>
                <span className="story-footnote">AN EDITORIAL STARTING POINT. YOUR CALL.</span>
              </div>
            </div>

            <div className="story-stage-footer">
              <span>01 — 03</span>
              <span>A FIELD GUIDE, NOT A RANKING</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
