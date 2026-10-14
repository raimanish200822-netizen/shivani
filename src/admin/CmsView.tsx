import React, { useState } from 'react';
import { Layout, Save, Check, FileText, Clock } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const CmsView: React.FC = () => {
  const { websiteContent, updateWebsiteContent } = useAdmin();
  const [form, setForm] = useState({
    ...websiteContent,
    aboutTitle: websiteContent.aboutTitle || 'About Shivani Graphics - Delhi NCRs Premier Commercial Printing Press',
    aboutDescription: websiteContent.aboutDescription || 'Established with a commitment to lightning-fast printing, superior 350 GSM card stock, and state-of-the-art Konica Minolta digital printing press in Mahavir Enclave, Delhi.',
    aboutMission: websiteContent.aboutMission || 'To provide 5-minute visiting cards, bulk flex banners, and 3D acrylic LED boards with unmatched precision and wholesale pricing.',
    businessHours: (websiteContent as any).businessHours || 'Monday - Saturday: 9:00 AM - 8:00 PM | Sunday: 10:00 AM - 4:00 PM (Express Urgent Printing Available 24/7)'
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateWebsiteContent(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900">Website Content, CMS & About Us Editor</h2>
          <p className="text-xs text-slate-500">Edit homepage headings, About Us narrative, business hours, and contact details in real-time Firestore.</p>
        </div>
        {saved && (
          <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-black rounded-xl flex items-center gap-1 shadow-xs animate-bounce">
            <Check className="w-4 h-4" /> Saved & Published Live!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5 text-xs">
        <div>
          <label className="font-bold text-slate-700 block mb-1">Business Name</label>
          <input
            type="text"
            value={form.businessName}
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Hero Section Heading</label>
          <input
            type="text"
            value={form.heroHeading}
            onChange={(e) => setForm({ ...form, heroHeading: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Hero Section Description / Subtitle</label>
          <textarea
            rows={3}
            value={form.heroSubtitle}
            onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
          />
        </div>

        {/* About Us Rich Text & Narrative Editor */}
        <div className="pt-4 border-t border-slate-200 space-y-4 bg-purple-50/50 p-4 rounded-2xl border-purple-100">
          <div className="flex items-center gap-2 text-[#50007c] font-black text-sm">
            <FileText className="w-4 h-4" />
            <h3>About Us Section & Narrative Editor (Firestore)</h3>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">About Us Main Title</label>
            <input
              type="text"
              value={form.aboutTitle || ''}
              onChange={(e) => setForm({ ...form, aboutTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium bg-white"
              placeholder="About Shivani Graphics..."
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">About Us Detailed Description (Rich Text Editor)</label>
            <textarea
              rows={4}
              value={form.aboutDescription || ''}
              onChange={(e) => setForm({ ...form, aboutDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium bg-white"
              placeholder="Established with a commitment..."
            />
            <p className="text-[10px] text-slate-500 mt-1">Updates the core story paragraph displayed on the public About Us page in real-time.</p>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Mission & Quality Commitment</label>
            <textarea
              rows={2}
              value={form.aboutMission || ''}
              onChange={(e) => setForm({ ...form, aboutMission: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium bg-white"
              placeholder="Our mission..."
            />
          </div>
        </div>

        {/* Business Hours Editor */}
        <div className="pt-4 border-t border-slate-200 space-y-3 bg-amber-50/50 p-4 rounded-2xl border-amber-100">
          <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
            <Clock className="w-4 h-4" />
            <h3>Business Operating Hours Editor</h3>
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Operating Hours Schedule</label>
            <input
              type="text"
              value={form.businessHours || ''}
              onChange={(e) => setForm({ ...form, businessHours: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium bg-white"
              placeholder="e.g. Monday - Saturday: 9:00 AM - 8:00 PM"
            />
            <p className="text-[10px] text-slate-500 mt-1">Displayed in footer and contact sections across the website.</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 space-y-4">
          <h3 className="font-black text-sm text-[#50007c]">SEO & Search Engine Meta Tags Management</h3>
          <div>
            <label className="font-bold text-slate-700 block mb-1">SEO Page Title (Browser Tab Title)</label>
            <input
              type="text"
              value={form.seoTitle || ''}
              onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
              placeholder="e.g. Shivani Graphics · Custom Print & Signage | Delhi NCR"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Meta Description (Google Search Snippet)</label>
            <textarea
              rows={2}
              value={form.seoDescription || ''}
              onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
              placeholder="Brief summary for Google search results..."
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Meta Keywords (Comma separated)</label>
            <input
              type="text"
              value={form.seoKeywords || ''}
              onChange={(e) => setForm({ ...form, seoKeywords: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
              placeholder="printing press, visiting cards, flex banners, delhi ncr"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 space-y-4">
          <h3 className="font-black text-sm text-[#50007c]">About Us Page & Store Facility Image Management</h3>
          <div>
            <label className="font-bold text-slate-700 block mb-1">About Us / Facility Banner Image URL</label>
            <input
              type="text"
              value={form.aboutImage || ''}
              onChange={(e) => setForm({ ...form, aboutImage: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium font-mono text-xs"
              placeholder="https://images.unsplash.com/photo-..."
            />
            <p className="text-[10px] text-slate-400 mt-1">Paste any high-resolution image URL to instantly update the large facility banner on the About Us page.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Primary Phone Number</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">WhatsApp Number (e.g. 919266944315)</label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Support Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Store Address (Mahavir Enclave, Delhi NCR)</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#50007c] hover:bg-purple-900 text-white font-black text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save & Publish Live Website
          </button>
        </div>
      </form>
    </div>
  );
};
