import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';

const SectionPlaceholder = ({ name }: { name: string }) => (
  <div className="p-10 text-xl font-semibold text-gray-800 dark:text-gray-200">{name}</div>
);

function App() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/dashboard" element={<SectionPlaceholder name="Account Home" />} />
          <Route path="/discover" element={<SectionPlaceholder name="Discover" />} />
          <Route path="/domains/manage" element={<SectionPlaceholder name="Manage Domains" />} />
          <Route path="/domains/transfer" element={<SectionPlaceholder name="Transfer Domains" />} />
          <Route path="/domains/register" element={<SectionPlaceholder name="Register Domains" />} />

          <Route path="/analytics/web" element={<SectionPlaceholder name="Web Analytics" />} />
          <Route path="/analytics/carbon" element={<SectionPlaceholder name="Carbon Impact Reports" />} />
          <Route path="/analytics/magic" element={<SectionPlaceholder name="Magic Monitoring" />} />

          <Route path="/security/infrastructure" element={<SectionPlaceholder name="Infrastructure Security Info" />} />
          <Route path="/security/investigate" element={<SectionPlaceholder name="Investigate" />} />
          <Route path="/security/blocked" element={<SectionPlaceholder name="Blocked Content" />} />
          <Route path="/security/waf" element={<SectionPlaceholder name="WAF" />} />
          <Route path="/security/turnstile" element={<SectionPlaceholder name="Turnstile" />} />

          <Route path="/ip/address-book" element={<SectionPlaceholder name="Address Book" />} />
          <Route path="/ip/zero-trust" element={<SectionPlaceholder name="Zero Trust" />} />

          <Route path="/email/overview" element={<SectionPlaceholder name="Email Security Overview" />} />
          <Route path="/email/retro" element={<SectionPlaceholder name="Retro Scan" />} />
          <Route path="/email/secret-store" element={<SectionPlaceholder name="Secret Store" />} />

          <Route path="/worker-platform" element={<SectionPlaceholder name="Worker Platform" />} />

          <Route path="/database/kv" element={<SectionPlaceholder name="KV" />} />
          <Route path="/database/aetherdb" element={<SectionPlaceholder name="AetherDB" />} />
          <Route path="/database/queues" element={<SectionPlaceholder name="Queues" />} />

          <Route path="/account/members" element={<SectionPlaceholder name="Members" />} />
          <Route path="/account/api-tokens" element={<SectionPlaceholder name="API Tokens" />} />
          <Route path="/account/audit-log" element={<SectionPlaceholder name="Audit Log" />} />
          <Route path="/account/billing" element={<SectionPlaceholder name="Billing" />} />
          <Route path="/account/configurations" element={<SectionPlaceholder name="Configurations" />} />

          <Route path="auth/login" element={<SectionPlaceholder name="Login" />} />
          <Route path="auth/signup" element={<SectionPlaceholder name="Sign Up" />} />
          <Route path="auth/forgot-password" element={<SectionPlaceholder name="Forgot Password" />} />
          <Route path="auth/reset-password" element={<SectionPlaceholder name="Reset Password" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;