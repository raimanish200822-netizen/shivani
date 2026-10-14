import React, { useState, useEffect } from 'react';
import { Instagram, Plus, Trash2, Upload, ExternalLink, Film, CheckCircle, Loader2 } from 'lucide-react';
import { db, storage } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const InstagramReelsAdminView: React.FC = () => {
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [views, setViews] = useState('25K');
  const [likes, setLikes] = useState('2.1K');
  const [url, setUrl] = useState('https://www.instagram.com/reel/DdUG5jOz9CB/?utm_source=ig_web_copy_link');
  const [imgUrl, setImgUrl] = useState('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'instagram_reels'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReels(list);
      setLoading(false);
    }, (err) => {
      console.error('Error fetching reels:', err);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `instagram_reels/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      setImgUrl(downloadUrl);
      setSuccessMsg('Media uploaded successfully to Firebase Storage!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload file to Firebase Storage.');
    } finally {
      setUploading(false);
    }
  };

  const handleAddReel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a title for the reel.');
      return;
    }

    try {
      await addDoc(collection(db, 'instagram_reels'), {
        title: title.trim(),
        views: views.trim() || '20K',
        likes: likes.trim() || '1.5K',
        img: imgUrl,
        url: url.trim() || 'https://www.instagram.com/shivanigraphics_?utm_source=ig_web_button_share_sheet&vrfl=ZDNlZDc0MzIxNw==',
        createdAt: serverTimestamp()
      });
      setTitle('');
      setSuccessMsg('Instagram Reel added successfully to Firebase Firestore!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Error adding reel:', err);
      alert('Failed to add reel to database.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this reel?')) {
      try {
        await deleteDoc(doc(db, 'instagram_reels', id));
      } catch (err) {
        console.error('Error deleting reel:', err);
        alert('Failed to delete reel.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-950 via-pink-950 to-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Instagram className="w-6 h-6 text-pink-400" />
            <h2 className="text-lg font-black">Instagram Reels & Video Management</h2>
          </div>
          <p className="text-xs text-pink-200">
            Upload videos/images to Firebase Storage and manage featured Instagram Reels for the Shivani Graphics homepage (`@shivanigraphics_`).
          </p>
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-2xl border border-white/20 text-xs font-bold">
          Total Active Reels: {reels.length}
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Add New Reel Form */}
      <form onSubmit={handleAddReel} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <h3 className="font-black text-sm text-[#50007c] flex items-center gap-2">
          <Film className="w-4 h-4" /> Add New Instagram Reel / Video
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Reel Title / Description *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Shivani Graphics Featured Reel (#DdUG5jOz9CB)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
              required
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Instagram Reel URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.instagram.com/reel/..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Views Count</label>
            <input
              type="text"
              value={views}
              onChange={(e) => setViews(e.target.value)}
              placeholder="e.g. 48.9K"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Likes Count</label>
            <input
              type="text"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
              placeholder="e.g. 4.2K"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Thumbnail Image / Video Cover URL</label>
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Upload Media to Firebase Storage</label>
            <div className="flex items-center gap-2">
              <label className="px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-[#50007c] font-black rounded-xl cursor-pointer border border-purple-200 flex items-center gap-1.5 transition-colors">
                <Upload className="w-4 h-4" />
                <span>{uploading ? 'Uploading...' : 'Choose File'}</span>
                <input type="file" accept="image/*,video/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
              </label>
              {uploading && <Loader2 className="w-4 h-4 animate-spin text-purple-600" />}
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-purple-700 to-pink-600 hover:opacity-95 text-white font-black text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Reel to Database
          </button>
        </div>
      </form>

      {/* Reels List Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm p-6 space-y-4">
        <h3 className="font-black text-sm text-slate-900">Current Instagram Reels on Homepage ({reels.length})</h3>
        
        {loading ? (
          <div className="py-12 text-center text-slate-400">Loading reels from Firebase...</div>
        ) : reels.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <p className="text-sm font-bold text-slate-700">No reels added in database yet.</p>
            <p className="text-xs text-slate-400">Default fallback reels (including #DdUG5jOz9CB) are currently showing on the homepage.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reels.map((reel) => (
              <div key={reel.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
                <img src={reel.img} alt={reel.title} className="w-16 h-24 object-cover rounded-xl shrink-0" />
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="font-extrabold text-xs text-slate-900 truncate">{reel.title}</h4>
                  <p className="text-[11px] text-slate-500">▶ {reel.views} · ❤️ {reel.likes}</p>
                  <a
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-purple-600 hover:underline inline-flex items-center gap-1 font-bold"
                  >
                    <span>View Reel</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <button
                  onClick={() => handleDelete(reel.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-xl cursor-pointer"
                  title="Delete Reel"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
