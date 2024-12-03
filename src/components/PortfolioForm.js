import { useState } from "react";

export default function PortfolioForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    tags: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
        <h2 className="text-2xl font-bold mb-4">新規ポートフォリオ投稿</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="タイトル"
              className="w-full p-2 border rounded"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <input
              type="url"
              placeholder="URL"
              className="w-full p-2 border rounded"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="タグ（カンマ区切り）"
              className="w-full p-2 border rounded"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
            <textarea
              placeholder="説明"
              className="w-full p-2 border rounded h-32"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              投稿する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}