import { useState } from "react";

export default function PortfolioForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    industry: '',
    experience: '', // 業界年数
    color: '',
    description: ''
  });

  const industries = [
    "デザイナー",
    "フロントエンドエンジニア",
    "バックエンドエンジニア",
    "動画編集者 / モーションデザイナー",
    "フォトグラファー",
    "イラストレーター",
    "その他"
  ];

  const experienceOptions = [
    "1年未満",
    "1-3年",
    "3-5年",
    "5-10年",
    "10年以上"
  ]

  const colors = [
    "白", "黒", "グレー", "赤", "オレンジ", "茶", "黄", "緑", "青", "紫", "ピンク", "カラフル"
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
        <h2 className="text-2xl font-bold mb-4">新規サイト投稿</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                サイト名
              </label>
              <input
                type="text"
                placeholder="サイト名を入力"
                className="w-full p-2 border rounded"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                className="w-full p-2 border rounded"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                業界
              </label>
              <select
                className="w-full p-2 border rounded"
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
                required
              >
                <option value="">選択してください</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                経験年数
              </label>
              <select
                className="w-full p-2 border rounded"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                required
              >
                <option value="">選択してください</option>
                {experienceOptions.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メインカラー
              </label>
              <select
                className="w-full p-2 border rounded"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                required
              >
                <option value="">選択してください</option>
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                説明
              </label>
              <textarea
                placeholder="サイトの特徴や工夫した点など"
                className="w-full p-2 border rounded h-32"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>
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