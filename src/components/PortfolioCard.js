// src/components/PortfolioCard.js
export default function PortfolioCard({ portfolio }) {
  // ogp_dataの安全な解析
  const getOgpData = () => {
    try {
      // すでにオブジェクトの場合はそのまま返す
      if (typeof portfolio.ogp_data === 'object' && portfolio.ogp_data !== null) {
        return portfolio.ogp_data;
      }
      // 文字列の場合はパースする
      return JSON.parse(portfolio.ogp_data || '{}');
    } catch (error) {
      console.error('Error parsing OGP data:', error);
      return {};
    }
  };

  // tagsの安全な解析
  const getTags = () => {
    try {
      // すでに配列の場合はそのまま返す
      if (Array.isArray(portfolio.tags)) {
        return portfolio.tags;
      }
      // 文字列の場合はパースする
      return JSON.parse(portfolio.tags || '[]');
    } catch (error) {
      console.error('Error parsing tags:', error);
      return [];
    }
  };

  const ogpData = getOgpData();
  const tags = getTags();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* プレビュー画像エリア */}
      <div className="w-full h-48 overflow-hidden">
        {ogpData?.image ? (
          <img
            src={ogpData.image}
            alt={portfolio.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No preview available</span>
          </div>
        )}
      </div>

      {/* コンテンツエリア */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">
          {portfolio.title}
        </h3>
        
        {/* OGPのサイト名があれば表示 */}
        {ogpData?.site_name && (
          <p className="text-sm text-gray-500 mb-2">
            {ogpData.site_name}
          </p>
        )}

        <p className="text-gray-600 mb-4">
          {portfolio.description || ogpData?.description || '説明なし'}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {new Date(portfolio.created_at).toLocaleDateString()}
            </span>
          </div>
          <a
            href={portfolio.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            サイトを見る
          </a>
        </div>
      </div>
    </div>
  );
}