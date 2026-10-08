import React, { useState, useEffect } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data';
import type { VendorSubmission } from '../types';

interface SubmitPageProps {
  initialType?: string;
  onNavigate: (path: string) => void;
}

const DRAFTS_KEY = 'toolscout:vendor-submissions';

export const SubmitPage: React.FC<SubmitPageProps> = ({ initialType = 'editorial', onNavigate: _onNavigate }) => {
  const { user } = useAuth();
  const [submissionType, setSubmissionType] = useState<'standard' | 'sponsor'>(
    initialType === 'sponsor' ? 'sponsor' : 'standard'
  );
  const [toolName, setToolName] = useState('');
  const [vendorUrl, setVendorUrl] = useState('');
  const [pricingUrl, setPricingUrl] = useState('');
  const [category, setCategory] = useState(categories[0].id);
  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [summary, setSummary] = useState('');
  const [pricingModel, setPricingModel] = useState('Free tier + paid plans');
  const [notes, setNotes] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedDrafts, setSavedDrafts] = useState<VendorSubmission[]>([]);

  useEffect(() => {
    if (user?.email && !contactEmail) {
      setContactEmail(user.email);
    }
  }, [user, contactEmail]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(DRAFTS_KEY);
      if (stored) {
        setSavedDrafts(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolName.trim() || !vendorUrl.trim() || !contactEmail.trim() || !pricingUrl.trim()) {
      setStatusMessage('Please complete all required fields before saving.');
      setIsError(true);
      return;
    }

    setIsSubmitting(true);
    const now = new Date().toISOString();
    const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const newDraft: VendorSubmission = {
      toolName: toolName.trim(),
      vendorUrl: vendorUrl.trim(),
      pricingUrl: pricingUrl.trim(),
      category,
      submissionType,
      contactEmail: contactEmail.trim(),
      summary: summary.trim(),
      pricingModel,
      notes: notes.trim(),
      savedAt: now,
    };

    // 1. Try to sync to Firebase Firestore
    try {
      const submissionDocRef = doc(collection(db, 'submissions'), submissionId);
      await setDoc(submissionDocRef, {
        toolName: newDraft.toolName,
        vendorUrl: newDraft.vendorUrl,
        pricingUrl: newDraft.pricingUrl,
        category: newDraft.category,
        submissionType: newDraft.submissionType,
        pricingModel: newDraft.pricingModel,
        contactEmail: newDraft.contactEmail,
        summary: newDraft.summary,
        notes: newDraft.notes,
        createdAt: now,
        userId: user?.uid || null,
      });
      console.log('Submission synced to Firebase Firestore:', submissionId);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `submissions/${submissionId}`);
    }

    // 2. Persist locally in browser
    try {
      const updated = [...savedDrafts, newDraft];
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(updated));
      setSavedDrafts(updated);
      setIsError(false);
      setStatusMessage(
        'Draft saved in this browser. It has not been sent to the ToolScout team; connect a submission inbox before launch.'
      );
      // Reset form
      setToolName('');
      setVendorUrl('');
      setPricingUrl('');
      setSummary('');
      setNotes('');
    } catch {
      setIsError(true);
      setStatusMessage('This browser could not save the draft. Your information was not sent; please copy it before leaving.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="main">
      <section className="category-hero">
        <div className="wrap">
          <div className="eyebrow">Help improve the field guide</div>
          <h1>Put a tool on our radar.</h1>
          <p className="lede">
            Founders and vendors can propose a listing—or ask about a clearly labeled future placement. Submissions are not endorsements or guarantees of inclusion.
          </p>
        </div>
      </section>

      <section className="wrap form-layout">
        <aside className="form-aside">
          <span className="mono">VENDOR NOTES</span>
          <h2>What makes a useful listing?</h2>
          <p>
            Clear product information, a working official URL, an honest pricing page, and a specific audience help us review a proposal faster.
          </p>

          <h3 style={{ marginTop: '24px', fontSize: '18px' }}>How review works</h3>
          <p>
            We curate independent profiles based on hands-on workflow fit. Submitting does not guarantee inclusion or ranking.
          </p>

          <h3 style={{ marginTop: '24px', fontSize: '18px' }}>Listing standards</h3>
          <p>
            Tools must provide genuine capabilities, functional terms of service, and transparent pricing or free trial information.
          </p>

          <div style={{ marginTop: '28px', padding: '14px', background: 'var(--card)', borderRadius: '10px' }}>
            <span className="mono" style={{ fontSize: '11px', display: 'block', color: 'var(--muted)', marginBottom: '4px' }}>
              DATABASE CONNECTED
            </span>
            <span style={{ fontSize: '13px' }}>Firebase Project: <strong>tool-scout-ae8d0</strong></span>
          </div>
        </aside>

        <div className="form-card">
          <form onSubmit={handleSubmit} data-vendor-form>
            <div className="form-grid" style={{ display: 'grid', gap: '18px' }}>
              <div>
                <label className="mono" style={{ fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                  SUBMISSION TYPE
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="submissionType"
                      value="standard"
                      checked={submissionType === 'standard'}
                      onChange={() => setSubmissionType('standard')}
                    />
                    <span>Editorial directory proposal (Free)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="submissionType"
                      value="sponsor"
                      checked={submissionType === 'sponsor'}
                      onChange={() => setSubmissionType('sponsor')}
                    />
                    <span>Sponsored placement inquiry</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="mono" style={{ fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                  TOOL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                  placeholder="e.g. Acme Studio"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--white)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="mono" style={{ fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                    PRIMARY URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={vendorUrl}
                    onChange={(e) => setVendorUrl(e.target.value)}
                    placeholder="https://example.com"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--white)' }}
                  />
                </div>
                <div>
                  <label className="mono" style={{ fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                    PRICING PAGE URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={pricingUrl}
                    onChange={(e) => setPricingUrl(e.target.value)}
                    placeholder="https://example.com/pricing"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--white)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="mono" style={{ fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                    PRIMARY CATEGORY *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--white)' }}
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mono" style={{ fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                    PRICING STRUCTURE
                  </label>
                  <input
                    type="text"
                    value={pricingModel}
                    onChange={(e) => setPricingModel(e.target.value)}
                    placeholder="e.g. Free tier + paid plans"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--white)' }}
                  />
                </div>
              </div>

              <div>
                <label className="mono" style={{ fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                  VENDOR CONTACT EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="contact@company.com"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--white)' }}
                />
              </div>

              <div>
                <label className="mono" style={{ fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                  SHORT SUMMARY (1-2 SENTENCES)
                </label>
                <textarea
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="What does the tool help someone accomplish?"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--white)' }}
                />
              </div>

              <div>
                <label className="mono" style={{ fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                  ADDITIONAL CONTEXT &amp; DIFFERENTIATORS
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Key differentiators, team plans, or integration features"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--white)' }}
                />
              </div>

              <div style={{ marginTop: '8px' }}>
                <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving proposal...' : 'Save proposal draft'} <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
              </div>

              {statusMessage && (
                <div
                  className={`form-status ${isError ? 'error' : ''}`}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: isError ? '#ffe8e6' : 'var(--card)',
                    border: `1px solid ${isError ? '#f87171' : 'var(--line)'}`,
                    fontSize: '14px',
                  }}
                >
                  {statusMessage}
                </div>
              )}
            </div>
          </form>

          {savedDrafts.length > 0 && (
            <div style={{ marginTop: '36px', borderTop: '1px solid var(--line)', paddingTop: '24px' }}>
              <h3 style={{ fontSize: '16px', margin: '0 0 12px' }} className="mono">
                LOCAL DRAFTS ({savedDrafts.length})
              </h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                {savedDrafts.map((draft, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 14px',
                      background: 'var(--paper)',
                      borderRadius: '8px',
                      fontSize: '13px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <strong>{draft.toolName}</strong> ({draft.category})
                      <div style={{ color: 'var(--muted)', fontSize: '11px' }}>
                        Saved: {new Date(draft.savedAt).toLocaleDateString()} · Type: {draft.submissionType}
                      </div>
                    </div>
                    <span className="pill pill-soft">Draft recorded</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
