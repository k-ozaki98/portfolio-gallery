export default function SearchBar({ value, onChange, onFilterChange }) {

  const industries = [
    "デザイナー",
    "フロントエンドエンジニア",
    "バックエンドエンジニア",
    "動画編集者 / モーションデザイナー",
    "フォトグラファー",
    "イラストレーター",
    "その他",
  ];

  const experienceOptions = ["1年未満", "1-3年", "3-5年", "5-10年", "10年以上"];

  const colors = [
    "白",
    "黒",
    "グレー",
    "赤",
    "オレンジ",
    "茶",
    "黄",
    "緑",
    "青",
    "紫",
    "ピンク",
    "カラフル",
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="space-y-4">
        {/* キーワード検索 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            キーワード検索
          </label>
          <input
            type="text"
            placeholder="タイトルや説明文で検索"
            className="w-full p-2 border rounded"
            onChange={(e) => onFilterChange("keyword", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 業界フィルター */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              業界
            </label>
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => onFilterChange("industry", e.target.value)}
              defaultValue=""
            >
              <option value="">すべて</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          {/* 経験年数フィルター */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              経験年数
            </label>
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => onFilterChange("experience", e.target.value)}
              defaultValue=""
            >
              <option value="">すべて</option>
              {experienceOptions.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
          </div>

          {/* カラーフィルター */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メインカラー
            </label>
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => onFilterChange("color", e.target.value)}
              defaultValue=""
            >
              <option value="">すべて</option>
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}